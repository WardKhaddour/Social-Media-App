import {
  POSTS,
  FOLLOWING_POSTS,
  MOST_POPULAR_USERS,
  CATEGORIES,
} from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getAllPosts() {
    const res = await axiosInstance.get(POSTS);
    return res.data;
  }

  static async getPostsByFollowing() {
    const res = await axiosInstance.get(FOLLOWING_POSTS);
    return res.data;
  }

  static async getMostPopularUsers() {
    const res = await axiosInstance.get(MOST_POPULAR_USERS);
    return res.data;
  }

  static async getCategories() {
    const res = await axiosInstance.get(CATEGORIES);
    return res.data;
  }
}

export default Services;
