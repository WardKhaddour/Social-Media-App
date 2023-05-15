import {
  POSTS,
  FOLLOWING_POSTS,
  MOST_POPULAR_POSTS,
  POSTS_BY_CATEGORY,
} from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async addPost(data: FormData) {
    const res = await axiosInstance.post(POSTS, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
  static async getAllPosts(searchParams?: object) {
    const res = await axiosInstance.get(POSTS, {
      params: searchParams,
    });
    return res.data;
  }

  static async getMostPopularPosts(searchParams?: object) {
    const res = await axiosInstance.get(MOST_POPULAR_POSTS, {
      params: searchParams,
    });
    return res.data;
  }
  static async getPostsByFollowing(searchParams?: object) {
    const res = await axiosInstance.get(FOLLOWING_POSTS, {
      params: searchParams,
    });
    return res.data;
  }

  static async getPostsByCategory(category: string, searchParams?: object) {
    const res = await axiosInstance.get(POSTS_BY_CATEGORY(category), {
      params: searchParams,
    });
    return res.data;
  }
}

export default Services;
