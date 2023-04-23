import { ChangeEvent, MouseEventHandler, forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import './UploadPhoto.scss';
import { useTranslation } from 'react-i18next';
import PrimaryButton from './PrimaryButton';

const PhotoPreview = ({
  removePhoto,
  selectedPhoto,
  photoAlt,
  didSelectPhoto,
}: {
  removePhoto: MouseEventHandler<HTMLButtonElement>;
  selectedPhoto: string;
  photoAlt: string;
  didSelectPhoto: boolean;
}) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="photo-preview">
      {didSelectPhoto && (
        <button
          onClick={removePhoto}
          className="photo-preview__remove"
          type="button"
        >
          &nbsp;
        </button>
      )}
      <img
        crossOrigin="anonymous"
        className="photo-preview__photo"
        src={didSelectPhoto ? selectedPhoto : user.photo}
        alt={photoAlt}
      />
    </div>
  );
};

type PropsType = {
  withDeleteOptions?: boolean;
  deletePhotoHandler?: Function;
};

const UploadPhoto = forwardRef<HTMLInputElement, PropsType>(
  ({ withDeleteOptions, deletePhotoHandler }, ref) => {
    const { user } = useSelector((state: RootState) => state.user);
    const { t } = useTranslation();

    const userPhoto = user.photo;

    const [selectedPhoto, setSelectedPhoto] = useState(userPhoto);
    const [didSelectPhoto, setDidSelectPhoto] = useState(false);

    const selectPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !files.length) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = function () {
        setSelectedPhoto(reader.result?.toString() || '');
        setDidSelectPhoto(true);
      };
    };

    const removePhoto = () => {
      setSelectedPhoto(user.photo);
      setDidSelectPhoto(false);
    };

    const handleDeletePhoto = async () => {
      if (deletePhotoHandler) {
        await deletePhotoHandler();
        setDidSelectPhoto(false);
      }
    };

    return (
      <>
        <PhotoPreview
          didSelectPhoto={didSelectPhoto}
          photoAlt={t('msg.uploadPhotoAlt')}
          removePhoto={removePhoto}
          selectedPhoto={selectedPhoto}
        />
        <div className="upload-photo__actions">
          <div className="form-control">
            <button type="button" className="btn btn-secondary">
              <label htmlFor="photo">{t('action.choosePhoto')}</label>
            </button>
            <input
              ref={ref}
              onChange={selectPhotoHandler}
              className="form-control__input form-control__input--file"
              id="photo"
              type="file"
              accept="photo/*"
            />
          </div>
          {withDeleteOptions && user.hasPhoto && (
            <div className="form-control" onClick={handleDeletePhoto}>
              <PrimaryButton text="Delete" type="button" />
            </div>
          )}
        </div>
      </>
    );
  }
);

export default UploadPhoto;
