import { axiosInstance } from 'utils/api/axios';
import { USER, IS_AUTH } from './endpoints';

class Services {
  static async getUserData() {
    const res = await axiosInstance.get(IS_AUTH);
    return res.data;
  }
  static async updateUserPhoto(payload: { photo?: File } | FormData) {
    const res = await axiosInstance.patch(USER, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
}

export default Services;
