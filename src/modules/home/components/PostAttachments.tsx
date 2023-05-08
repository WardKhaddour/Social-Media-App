import './PostAttachment.scss';
import { useTranslation } from 'react-i18next';
import Attachment from './Attachment';

const PostAttachments = ({
  attachments,
  postId,
  authorId,
}: {
  attachments: { type: string; url: string; fileName: string }[];
  postId: string;
  authorId: string;
}) => {
  const { t } = useTranslation();

  return (
    <section className="post-attachment">
      <h2 className="post-attachment__title heading-primary">
        {t('label.attachments')}
      </h2>
      {attachments.map(attachment => {
        return (
          <Attachment
            key={attachment.fileName}
            {...attachment}
            authorId={authorId}
            postId={postId}
          />
        );
      })}
    </section>
  );
};

export default PostAttachments;
