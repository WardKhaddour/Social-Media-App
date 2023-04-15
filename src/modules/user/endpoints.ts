export const LOGOUT = '/user/logout';
export const USER = '/user';
export const UPDATE_PASSWORD = '/user/update-password';
export const CONFIRM_EMAIL = (token: string) => `/user/confirm-email/${token}`;
export const RESEND_CONFIRM_TOKEN = '/user/resend-confirm-token';
