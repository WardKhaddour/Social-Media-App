import { axiosInstance } from 'utils/api/axios';
import { LOGOUT, USER } from './endpoints';

class Services {
  static async getUserData() {
    const res = await axiosInstance.get(USER);
    return res.data;
  }
  static async logout() {
    const res = await axiosInstance.post(LOGOUT);
    return res.data;
  }
}

export default Services;
