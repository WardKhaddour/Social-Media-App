export interface POST {
  _id: string;
  title: string;
  author: { name: string; _id: string };
  content: string;
  publishedAt: string;
  category: { _id: string; name: string }[];
  attachments?: { type: string; url: string; fileName: string }[];
  likesNum: number;
  commentsNum: number;
  isLiked?: boolean;
  isSaved?: boolean;
}
