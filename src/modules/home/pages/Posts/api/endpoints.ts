export const POSTS = '/post';
export const FOLLOWING_POSTS = '/post/following';
export const POST = (postId: string) => `/post/${postId}`;
export const MOST_POPULAR_POSTS = '/post/most-popular';
export const POSTS_BY_CATEGORY = (category: string) =>
  `/post/category/${category}`;
