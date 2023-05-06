import ImageAttachment from './ImageAttachment';
import PdfAttachment from './PdfAttachment';
import VideoAttachment from './VideoAttachment';
import './PostAttachment.scss';
import { useTranslation } from 'react-i18next';

const PostAttachments = ({
  attachments,
}: {
  attachments: { type: string; url: string; fileName: string }[];
}) => {
  const { t } = useTranslation();

  return (
    <section className="post-attachment">
      <h2 className="post-attachment__title heading-primary">
        {t('label.attachments')}
      </h2>
      {attachments.map(attachment => {
        switch (attachment.type) {
          case 'image':
            return (
              <ImageAttachment
                key={attachment.fileName}
                name={attachment.fileName}
                url={attachment.url}
              />
            );
          case 'pdf':
            return (
              <PdfAttachment
                key={attachment.fileName}
                name={attachment.fileName}
                url={attachment.url}
              />
            );
          case 'video':
            return (
              <VideoAttachment
                key={attachment.fileName}
                name={attachment.fileName}
                url={attachment.url}
              />
            );
          default:
            return null;
        }
      })}
    </section>
  );
};

export default PostAttachments;
