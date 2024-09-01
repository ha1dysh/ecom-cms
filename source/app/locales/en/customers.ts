import { editAddress } from "~/.server/admin/actions/customers/addresses/edit/edit-address";

export default {
  title: "Customers",
  createButton: "Create customer",

  table: {
    customerName: "Customer name",
    email: "Email",
    createdAt: "Created at",
    updatedAt: "Updated at",
    deleteAt: "Delete at",
    oldestToNewest: "Oldest to newest",
    newestToOldest: "Newest to oldest",
    searchCustomers: "Search customers",
    softDeleteStatusFilter: "Soft delete status",
    active: "Active",
    inactive: "Inactive",
  },

  single: {
    deleteButton: "Delete customer",
    primaryInfo: "Primary info",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    addressTitle: "Address info",
    editButton: 'Edit',
    contactInformation: 'Contact information',
    address: 'Address',
  },

  new: {
    title: 'Create new customer',
    saveButton: 'Create',
    security: 'Security',
    password: 'Password',
    confirmPassword: 'Confirm password',
  },

  delete: {
    title: 'Delete customer',
    paragraph: 'Are you sure you want to delete',
    deleteButton: 'Delete',
    cancelButton: 'Cancel',
  },

  edit: {
    title: 'Edit customer primary info',
    saveButton: 'Save',
    primaryInfo: 'Primary info',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
  },

  newAddress: {
    title: 'Create new address for customer',
    saveButton: 'Save',
    deliveryAddress: 'Delivery address',
    country: 'Country',
    firstName: 'First name',
    lastName: 'Last name',
    company: 'Company',
    address: 'Address',
    apartment: 'Apartment, suite, etc.',
    city: 'City',
    postalCode: 'Postal code',
    phone: 'Phone',
  },

  editAddress: {
    title: 'Edit address for customer',
    deleteButton: 'Delete address',
    saveButton: 'Save',
  },
}
