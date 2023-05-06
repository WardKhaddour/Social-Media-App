const ImageAttachment = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="post-attachment__image">
      <a href={url} target="_blank" rel="noreferrer noopener">
        <img src={url} alt="Post Attachment" crossOrigin="anonymous" />
      </a>
    </div>
  );
};

export default ImageAttachment;
