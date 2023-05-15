import {
  COMMENT,
  DELETE_ATTACHMENT,
  LIKE_POST,
  POST,
  POST_COMMENT,
  SAVE_POST,
} from './endpoints';
import { axiosInstance } from 'utils/api/axios';

class Services {
  static async getPost(postId: string) {
    const res = await axiosInstance.get(POST(postId));
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

  static async deletePost(postId: string) {
    const res = await axiosInstance.delete(POST(postId));
    return res.data;
  }
  static async deletePostAttachment(postId: string, attachment: string) {
    const res = await axiosInstance.delete(
      DELETE_ATTACHMENT(postId, attachment)
    );
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

  static async editComment(postId: string, commentId: string, comment: string) {
    const res = await axiosInstance.patch(COMMENT(postId, commentId), {
      content: comment,
    });
    return res.data;
  }

  static async deleteComment(postId: string, commentId: string) {
    const res = await axiosInstance.delete(COMMENT(postId, commentId));
    return res.data;
  }
}

export default Services;
