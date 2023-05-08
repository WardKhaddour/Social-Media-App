import {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

export interface IAttachFiles {
  getAttachedFiles(): File[];
  clearAttachedFiles(): void;
}

interface IProps {
  primaryActionText?: string;
  secondaryActionText?: string;
  filesLimit?: number;
}

const AttachFiles = forwardRef<IAttachFiles, IProps>((props, ref) => {
  const { t } = useTranslation();
  const { primaryActionText = 'Attach Files', secondaryActionText = 'Remove' } =
    props;
  const [files, setFiles] = useState<File[]>([]);
  const attachmentsRef = useRef<HTMLInputElement>(null);

  const cannotAttach =
    !props.filesLimit ||
    (props.filesLimit > 0 && files.length >= (props.filesLimit || 0));

  useImperativeHandle(ref, () => ({
    getAttachedFiles() {
      return files;
    },
    clearAttachedFiles() {
      setFiles([]);
    },
  }));

  const handleAttachFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (cannotAttach) {
      return;
    }
    const fileList = event.target.files;
    if (fileList) {
      const newFiles: File[] = [];
      const filesLength = props.filesLimit || fileList.length;
      for (let i = 0; i < filesLength; i++) {
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
      {cannotAttach && (
        <p className="edit-post__form--attachments-limit">
          {t('msg.attachmentLimit')}
        </p>
      )}

      <div className="form-control">
        <button
          type="button"
          disabled
          className={`btn btn-secondary ${cannotAttach ? 'btn-disabled' : ''}`}
        >
          <label
            htmlFor="attachments"
            className={` ${cannotAttach ? 'btn-disabled' : ''}`}
          >
            {primaryActionText}
          </label>
        </button>
        <input
          disabled={cannotAttach}
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
