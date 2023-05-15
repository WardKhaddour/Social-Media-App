export const COMMENT = (postId: string, commentId: string) =>
  `/post/${postId}/comment/${commentId}`;

export const DELETE_ATTACHMENT = (postId: string, attachmentName: string) =>
  `post/${postId}/attachment/${attachmentName}`;

export const LIKE_POST = (postId: string) => `post/${postId}/like`;

export const POST = (postId: string) => `/post/${postId}`;

export const POST_COMMENT = (postId: string) => `post/${postId}/comment`;

export const SAVE_POST = (postId: string) => `/post/saved/${postId}`;
