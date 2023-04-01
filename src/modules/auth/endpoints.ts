export const SIGNUP = '/auth/signup';
export const CONFIRM_EMAIL = (token: string) => `/auth/confirm-email/${token}`;
export const RESEND_CONFIRM_TOKEN = '/auth/resend-confirm-token';
export const LOGIN = '/auth/login';
export const FORGOT_PASSWORD = '/auth/forgot-password';
export const UPDATE_PASSWORD = '/auth/update-password';
export const RESET_PASSWORD = (token: string) =>
  `/auth/reset-password/${token}`;
