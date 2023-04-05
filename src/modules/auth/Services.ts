import { axiosInstance } from 'utils/api/axios';
import {
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  CONFIRM_EMAIL,
  RESEND_CONFIRM_TOKEN,
} from './endpoints';

class Services {
  static async login(payload: {
    email: string;
    password: string;
    recaptchaToken: string;
  }) {
    const res = await axiosInstance.post(LOGIN, payload);
    return res.data;
  }

  static async signup(payload: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const res = await axiosInstance.post(SIGNUP, payload);
    return res.data;
  }

  static async forgotPassword(payload: { email: string }) {
    const res = await axiosInstance.post(FORGOT_PASSWORD, payload);
    return res.data;
  }

  static async resetPassword(payload: {
    token: string;
    password: string;
    confirmPassword: string;
  }) {
    const res = await axiosInstance.patch(RESET_PASSWORD(payload.token), {
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    });
    return res.data;
  }

  static async confirmEmail(payload: { token: string }) {
    const res = await axiosInstance.patch(CONFIRM_EMAIL(payload.token));
    return res.data;
  }

  static async resendConfirmEmailToken(payload: { email: string }) {
    const res = await axiosInstance.post(RESEND_CONFIRM_TOKEN, payload);

    return res.data;
  }
}

export default Services;
