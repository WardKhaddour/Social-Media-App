import calcTimestamp from 'utils/date/calcTimestamp';
import { ICOMMENT } from '../store/actions';

import './CommentItem.scss';
const CommentItem = ({ comment }: { comment: ICOMMENT }) => {
  const handleViewUserProfile = () => {};

  return (
    <div className="comment">
      <div className="comment__user" onClick={handleViewUserProfile}>
        <span className="comment__user--photo">
          <img
            crossOrigin="anonymous"
            src={comment.user.photo}
            alt={comment.user.name}
          />
        </span>
        <span className="comment__user--name">{comment.user.name}</span>
      </div>
      <div className="comment__date">
        {calcTimestamp(new Date(comment.addedAt))}
      </div>

      <div className="comment__content">{comment.content}</div>
    </div>
  );
};

export default CommentItem;
