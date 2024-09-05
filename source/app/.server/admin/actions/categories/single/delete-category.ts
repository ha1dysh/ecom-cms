import { prisma } from "~/.server/shared/services/prisma.service";

export const deleteCategory = async (id: string) => {
  await prisma.category.delete({
    where: { id: Number(id) },
  });
};
