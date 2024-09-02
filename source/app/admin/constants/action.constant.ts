export const FORM_ACTION_FIELD = 'action';

export enum EAdminUserAction {
  updateRole = 'update_role',
  deleteUser = 'delete_user',
}

export enum EAdminCustomerAction {
  editAddress = 'edit_address',
  deleteAddress = 'delete_address',
  deleteCustomer = 'delete_customer',
}

export enum EAdminProductAction {
  updateCategory = 'update_category',
  deleteProduct = 'delete_product',
  createTranslation = 'create_translation',
  deleteTranslation = 'delete_translation',
  updateTranslation = 'update_translation',
  categoryCreateTranslation = 'category_create_translation',
  categoryDeleteTranslation = 'category_delete_translation',
  categoryUpdateTranslation = 'category_update_translation',
}
