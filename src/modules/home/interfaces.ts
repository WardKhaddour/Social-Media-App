export interface IPOST {
  _id: string;
  title: string;
  author: { name: string; _id: string };
  content: string;
  publishedAt: string;
  category: { _id: string; name: string }[];
  likesNum: number;
  commentsNum: number;
  isLiked?: boolean;
  isSaved?: boolean;
}
export interface IUSERS {
  _id: string;
  name: string;
  bio: string;
  photo: string;
}

export interface ICATEGORIES {
  _id: string;
  name: string;
}

export interface ICOMMENT {
  _id: string;
  content: string;
  addedAt: string;
  post: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
}

export interface IUSERS_DETAILS {
  _id: string;
  name: string;
  email: string;
  photo: string;
  followersNum: number;
  followingNum: number;
  posts: IPOST[];
  bio: string;
  isFollowing?: boolean;
}
