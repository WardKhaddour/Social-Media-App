import calcTimestamp from 'utils/date/calcTimestamp';

import './Post.scss';
import { Link } from 'react-router-dom';
interface PostProps {
  _id: string;
  author: { name: string; _id: string };
  title: string;
  content: string;
  publishedAt: string;
  category: { _id: string; name: string }[];
  isSaved?: boolean;
}

const Post = (props: PostProps) => {
  const publishedDate = calcTimestamp(new Date(props.publishedAt));

  return (
    <Link to={`/post/${props._id}`} className="post__card" dir="auto">
      <div className="post__card--header">
        <h2 className="post__card--author">{props.author.name}</h2>
        <h6 className="post__card--date">{publishedDate}</h6>
      </div>
      <div className="post__card--body">
        <h3 className="post__card--title">{props.title}</h3>
        <p className="post__card--content">{props.content}</p>
      </div>
      <div className="post__card--footer">
        <div className="post__card--categories">
          {props.category.map(cat => (
            <span key={cat._id} className="post__card--category">
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Post;
