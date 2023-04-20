export const POSTS = '/post';
export const FOLLOWING_POSTS = '/posts/following';
export const POST = (postId: string) => `/post/${postId}`;
export const MOST_POPULAR_POSTS = '/post/most-popular';
export const SAVED_POSTS = '/post/saved';
export const SAVE_POST = (postId: string) => `/post/saved/${postId}`;
export const POSTS_BY_CATEGORY = (category: string) =>
  `/post/category/${category}`;
export const CATEGORIES = '/category';
export const CATEGORY = (categoryId: string) => `/category/${categoryId}`;

export const MOST_POPULAR_USERS = '/user/most-popular';

export const LIKE_POST = (postId: string) => `post/${postId}/like`;

export const POST_COMMENT = (postId: string) => `post/${postId}/comment`;
