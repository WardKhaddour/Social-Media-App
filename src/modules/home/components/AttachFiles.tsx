import {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface IAttachFiles {
  getAttachedFiles(): File[];
  clearAttachedFiles(): void;
}

interface IProps {
  primaryActionText?: string;
  secondaryActionText?: string;
}

const AttachFiles = forwardRef<IAttachFiles, IProps>((props, ref) => {
  const { primaryActionText = 'Attach Files', secondaryActionText = 'Remove' } =
    props;
  const [files, setFiles] = useState<File[]>([]);
  const attachmentsRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getAttachedFiles() {
      return files;
    },
    clearAttachedFiles() {
      setFiles([]);
    },
  }));

  const handleAttachFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const newFiles: File[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const fileExists = files.some(f => f.name === file.name);
        if (!fileExists) {
          newFiles.push(file);
        }
      }
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    if (
      element.tagName !== 'SPAN' ||
      !element.dataset.name ||
      !attachmentsRef.current?.files
    ) {
      return;
    }

    const newFiles = [...files];
    const index = files.findIndex(file => file.name === element.dataset.name);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    console.log(newFiles);
  };

  return (
    <>
      <div className="form-control">
        <button type="button" className="btn btn-secondary">
          <label htmlFor="attachments">{primaryActionText}</label>
        </button>
        <input
          id="attachments"
          onChange={handleAttachFile}
          className="edit-post__form--attach-file"
          ref={attachmentsRef}
          type="file"
          accept="image/*, .pdf, video/*"
          multiple
        />
      </div>
      {files && (
        <div
          className="edit-post__form--attached-files"
          onClick={handleRemoveFile}
        >
          {Array.from(files).map(file => (
            <p className="edit-post__form--attached-file" key={file.name}>
              <span className="edit-post__form--attached-file__name">
                {file.name}
              </span>
              <span
                data-name={file}
                className="edit-post__form--attached-file__remove"
              >
                {secondaryActionText}
              </span>
            </p>
          ))}
        </div>
      )}
    </>
  );
});

export default AttachFiles;
