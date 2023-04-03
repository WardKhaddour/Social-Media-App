import { axiosInstance } from 'utils/api/axios';
import { LOGOUT, UPDATE_PASSWORD, USER } from './endpoints';

class Services {
  static async getUserData() {
    const res = await axiosInstance.get(USER);
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