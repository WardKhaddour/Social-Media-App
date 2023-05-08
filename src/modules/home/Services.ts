import {
  POSTS,
  FOLLOWING_POSTS,
  MOST_POPULAR_USERS,
  CATEGORIES,
  POST,
  LIKE_POST,
  SAVE_POST,
  POST_COMMENT,
  USER_DETAILS,
  FOLLOW_USER,
  SAVED_POSTS,
  MOST_POPULAR_POSTS,
  POSTS_BY_CATEGORY,
  ALL_USERS,
  DELETE_ATTACHMENT,
} from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
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

  static async getPost(postId: string) {
    const res = await axiosInstance.get(POST(postId));
    return res.data;
  }

  static async addNewPost(data: FormData) {
    const res = await axiosInstance.post(POSTS, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
  static async editPost(data: FormData, postId: string) {
    const res = await axiosInstance.patch(POST(postId), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
  static async deletePostAttachment(postId: string, attachment: string) {
    const res = await axiosInstance.delete(
      DELETE_ATTACHMENT(postId, attachment)
    );
    return res.data;
  }

  static async getMostPopularUsers() {
    const res = await axiosInstance.get(MOST_POPULAR_USERS);
    return res.data;
  }

  static async getAllUsers(searchParams?: object) {
    const res = await axiosInstance.get(ALL_USERS, {
      params: searchParams,
    });
    return res.data;
  }

  static async getCategories(searchParams?: object) {
    const res = await axiosInstance.get(CATEGORIES, {
      params: searchParams,
    });
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

  static async getSavedPosts() {
    const res = await axiosInstance.get(SAVED_POSTS);
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
