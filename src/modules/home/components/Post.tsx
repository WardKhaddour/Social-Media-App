import calcTimestamp from 'utils/date/calcTimestamp';
import './Post.scss';
interface PostProps {
  author: string;
  title: string;
  content: string;
  attachment?: string;
  publishedAt: Date;
}

const Post = (props: PostProps) => {
  const publishedDate = calcTimestamp(props.publishedAt);

  return (
    <div className="post__card">
      <div className="post__card--header">
        <h2 className="post__card--author">{props.author}</h2>
        <h6 className="post__card--date">{publishedDate}</h6>
      </div>
      <div className="post__card--body">
        <h3 className="post__card--title">{props.title}</h3>
        <p className="post__card--content">{props.content}</p>
      </div>
      <div className="post__card--footer">
        <span className="post__card--category">Programming</span>
        <div className="post__card--actions">
          <button type="button">Save</button>
          <button type="button">Mute</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
