import { axiosInstance } from 'utils/api/axios';
import { USER } from './endpoints';

class Services {
  static async getUserData() {
    const res = await axiosInstance.get(USER);
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
