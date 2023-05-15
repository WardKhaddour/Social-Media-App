import { SAVED_POSTS } from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getSavedPosts() {
    const res = await axiosInstance.get(SAVED_POSTS);
    return res.data;
  }
}

export default Services;
