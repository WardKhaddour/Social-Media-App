import { ALL_USERS } from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getAllUsers(searchParams?: object) {
    const res = await axiosInstance.get(ALL_USERS, {
      params: searchParams,
    });
    return res.data;
  }
}

export default Services;
