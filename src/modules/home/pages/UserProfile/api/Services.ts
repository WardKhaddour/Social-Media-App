import { FOLLOW_USER, USER_DETAILS } from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getUserDetails(userId: string) {
    const res = await axiosInstance.get(USER_DETAILS(userId));
    return res.data;
  }
  static async followUser(userId: string) {
    const res = await axiosInstance.patch(FOLLOW_USER(userId));
    return res.data;
  }
}

export default Services;
