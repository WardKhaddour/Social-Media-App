import calcTimestamp from 'utils/date/calcTimestamp';
import { ICOMMENT } from '../interfaces';

import './CommentItem.scss';
const CommentItem = ({ comment }: { comment: ICOMMENT }) => {
  const handleViewUserProfile = () => {};

  return (
    <div className="comment" dir="auto">
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

      <div className="comment__content" dir="auto">
        {comment.content}
      </div>
    </div>
  );
};

export default CommentItem;
