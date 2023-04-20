import {
  POSTS,
  FOLLOWING_POSTS,
  MOST_POPULAR_USERS,
  CATEGORIES,
  POST,
  LIKE_POST,
  SAVE_POST,
  POST_COMMENT,
} from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getAllPosts() {
    const res = await axiosInstance.get(POSTS);
    return res.data;
  }

  static async getPost(postId: string) {
    const res = await axiosInstance.get(POST(postId));
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

  static async addLike(postId: string) {
    const res = await axiosInstance.post(LIKE_POST(postId));
    return res.data;
  }
  static async savePost(postId: string) {
    const res = await axiosInstance.post(SAVE_POST(postId));
    return res.data;
  }

  static async getCommentsOnPost(postId: string) {
    const res = await axiosInstance.get(POST_COMMENT(postId));
    return res.data;
  }
  static async addComment(postId: string, comment: string) {
    const res = await axiosInstance.post(POST_COMMENT(postId), {
      content: comment,
    });
    return res.data;
  }
}

export default Services;
