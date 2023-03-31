import { axiosInstance } from 'utils/api/axios';
import { LOGIN } from './endpoints';

class Services {
  static async login(payload: { email: string; password: string }) {
    const res = await axiosInstance.post(LOGIN, payload);
    return res.data;
  }
}

export default Services;
