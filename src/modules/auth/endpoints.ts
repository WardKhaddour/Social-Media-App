export const SIGNUP = '/auth/signup';
export const LOGIN = '/auth/login';
export const FORGOT_PASSWORD = '/auth/forgot-password';
export const RESET_PASSWORD = (token: string) =>
  `/auth/reset-password/${token}`;
