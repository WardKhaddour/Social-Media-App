import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import './Attachment.scss';
import { deletePostAttachment } from '../store/actions';

const Attachment = ({
  url,
  fileName,
  postId,
  authorId,
  type,
}: {
  url: string;
  fileName: string;
  postId: string;
  authorId: string;
  type: string;
}) => {
  const { t } = useTranslation();
  const { _id: userId } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();

  let content;

  if (type === 'image')
    content = (
      <div className="post-attachment__image">
        <a href={url} target="_blank" rel="noreferrer noopener">
          <img src={url} alt="Post Attachment" crossOrigin="anonymous" />
        </a>
      </div>
    );
  else if (type === 'video')
    content = (
      <div className="post-attachment__video">
        <video controls src={url} crossOrigin="anonymous" />
      </div>
    );
  else if (type === 'pdf')
    content = (
      <div className="post-attachment__pdf">
        <span className="post-attachment__pdf--name">{fileName}</span>
        <a
          className="post-attachment__pdf--download"
          href={url}
          download={fileName}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('action.download')}
        </a>
      </div>
    );

  const handleDeleteAttachment = (attachmentName: string) => async () => {
    if (!attachmentName) {
      return;
    }
    await dispatch(deletePostAttachment(postId, attachmentName));
  };

  return (
    <div className="post-attachment__content">
      {userId === authorId && (
        <button
          className="post-attachment__delete"
          onClick={handleDeleteAttachment(fileName)}
        >
          {t('action.delete')}
        </button>
      )}
      {content}
    </div>
  );
};

export default Attachment;
