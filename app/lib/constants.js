export const ITEMS_PER_PAGE = 5;
export const LOW_STOCK_THRESHOLD = 20;

// The seeded recruiter account is read-only so the public demo can't be locked out.
export const PROTECTED_USERNAME = "demo_recruiter";

export const PRODUCT_CATEGORIES = [
  { value: "phone", label: "Phone" },
  { value: "computer", label: "Computer" },
  { value: "kitchen", label: "Kitchen" },
  { value: "clothes", label: "Clothes" },
  { value: "electronics", label: "Electronics" },
];

export const ORDER_STATUSES = ["pending", "done", "cancelled"];

export const ERROR_MESSAGES = {
  passwordMismatch: "Passwords do not match.",
  passwordShort: "Password must be at least 8 characters.",
  duplicateUser: "A user with that username or email already exists.",
  duplicateProduct: "A product with that title already exists.",
  invalid: "Some of the values are invalid. Please check the form and try again.",
  protectedUser: "The demo account is read-only and can't be edited or deleted.",
  selfDelete: "You can't delete the account you are logged in with.",
  notFound: "That record no longer exists.",
  failed: "Something went wrong while saving. Please try again.",
};

export const SUCCESS_MESSAGES = {
  updated: "Changes saved.",
};
