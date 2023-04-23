import { axiosInstance } from 'utils/api/axios';
import {
  LOGOUT,
  UPDATE_PASSWORD,
  USER,
  CONFIRM_EMAIL,
  RESEND_CONFIRM_TOKEN,
  DELETE_PHOTO,
} from './endpoints';

class Services {
  static async confirmEmail(payload: { token: string }) {
    const res = await axiosInstance.patch(CONFIRM_EMAIL(payload.token));
    return res.data;
  }
  static async resendConfirmEmailToken(payload: { email: string }) {
    const res = await axiosInstance.post(RESEND_CONFIRM_TOKEN, payload);

    return res.data;
  }

  static async updateUserData(
    payload:
      | {
          name?: string;
          email?: string;
          photo?: File;
        }
      | FormData
  ) {
    const res = await axiosInstance.patch(USER, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }

  static async deleteUserPhoto() {
    const res = await axiosInstance.patch(DELETE_PHOTO);
    return res.data;
  }

  static async updateUserPassword(payload: {
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }) {
    const res = await axiosInstance.patch(UPDATE_PASSWORD, payload);
    return res.data;
  }

  static async deleteUser(payload: { password: string }) {
    const res = await axiosInstance.delete(USER, {
      data: payload,
    });
    return res.data;
  }

  static async logout() {
    const res = await axiosInstance.post(LOGOUT);
    return res.data;
  }
}

export default Services;
