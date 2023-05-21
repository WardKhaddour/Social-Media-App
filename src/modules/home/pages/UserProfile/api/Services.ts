import { FOLLOWING, FOLLOW_USER, USER_DETAILS, FOLLOWERS } from './endpoints';
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
  static async getFollowers(userId: string) {
    const res = await axiosInstance.get(FOLLOWERS(userId));
    return res.data;
  }
  static async getFollowing(userId: string) {
    const res = await axiosInstance.get(FOLLOWING(userId));
    return res.data;
  }
}

export default Services;
