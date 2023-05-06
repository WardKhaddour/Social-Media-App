import { useTranslation } from 'react-i18next';

const PdfAttachment = ({ url, name }: { url: string; name: string }) => {
  const { t } = useTranslation();

  return (
    <div className="post-attachment__pdf">
      <span className="post-attachment__pdf--name">{name}</span>
      <a
        className="post-attachment__pdf--download"
        href={url}
        download={name}
        target="_blank"
        rel="noreferrer noopener"
      >
        {t('action.download')}
      </a>
    </div>
  );
};

export default PdfAttachment;
