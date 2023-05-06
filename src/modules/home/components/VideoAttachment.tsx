const VideoAttachment = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="post-attachment__video">
      <video controls src={url} crossOrigin="anonymous" />
    </div>
  );
};

export default VideoAttachment;
