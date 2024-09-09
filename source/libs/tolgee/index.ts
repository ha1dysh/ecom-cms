import * as path from "node:path";
import * as fsPromises from "node:fs/promises";
import axios from "axios";
import AdmZip from "adm-zip";
import { config } from "./export-config";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.resolve(ROOT_DIR, config.translationsDir);

const checkDistFolder = async () => {
  try {
    await fsPromises.access(DIST_DIR, fsPromises.constants.W_OK);
  } catch (e) {
    await fsPromises.mkdir(DIST_DIR, { recursive: true });
  }
};

const downloadTranslations = async () => {
  const data = JSON.stringify({
    format: "JSON",
    filterState: ["TRANSLATED", "REVIEWED"],
    languages: ["en", "uk"],
    structureDelimiter: "",
    filterNamespace: [
      "categories",
      "common",
      "customers",
      "products",
      "reviews",
      "users",
    ],
    zip: true,
    supportArrays: false,
    messageFormat: "ICU",
  });

  const url = new URL(
    `${config.apiUrl}/v2/projects/${config.projectId}/export`
  );

  const requestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    responseType: "arraybuffer" as const,
    url: url.toString(),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-API-Key": config.apiKey,
    },
    data: data,
  };

  const response = await axios(requestConfig);

  if (response.status > 299) {
    throw new Error(`Failed to download translations: ${response.status}`);
  }

  return response.data;
};

const extractTranslations = async (data: Buffer) => {
  const zip = new AdmZip(data);
  zip.extractAllTo(DIST_DIR, true);
};

const updateLanguages = async () => {
  await checkDistFolder();
  const buffer = await downloadTranslations();
  await extractTranslations(buffer);

  const folders = (await fsPromises.readdir(DIST_DIR, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory() && !["en", "uk"].includes(dirent.name))
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    const folderPath = path.join(DIST_DIR, folder);

    const langFiles = (await fsPromises.readdir(folderPath)).filter((file) =>
      file.endsWith(".json")
    );

    for (const file of langFiles) {
      const lang = file.split(".")[0];
      const langDir = path.join(DIST_DIR, lang);

      try {
        await fsPromises.mkdir(langDir);
      } catch (err) {
        if (err instanceof Error && "code" in err && err.code !== "EEXIST") {
          throw err;
        }
      }

      const newFileName = `${folder}.json`;
      const newFilePath = path.join(langDir, newFileName);

      await fsPromises.copyFile(path.join(folderPath, file), newFilePath);
      await fsPromises.unlink(path.join(folderPath, file));

      const remainingFiles = await fsPromises.readdir(folderPath);
      if (remainingFiles.length === 0) {
        await fsPromises.rmdir(folderPath);
      }
    }
  }
};


function main() {
  let prevRevisionId: null | number = null;

  const url = new URL(`${config.apiUrl}/v2/projects/${config.projectId}/activity?sort=timestamp,desc&size=1`);
  const headers = { Accept: "application/hal+json", "X-API-Key": config.apiKey };

  const requestConfig = {
    responseType: "json" as const,
    url: url.toString(),
    headers,
  };

  setInterval(async () => {
    const res = await axios(requestConfig);
    const revisionId = res.data._embedded.activities[0].revisionId as number

    if (revisionId !== prevRevisionId) {
      await updateLanguages().catch(console.error);
      console.log("Languages updated successfully. Revision ID:", revisionId);
      prevRevisionId = revisionId;
    }

  }, 5000);
}

main();
