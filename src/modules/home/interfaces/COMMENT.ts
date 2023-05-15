export interface COMMENT {
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
