import { ChangeEvent, forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import './UploadPhoto.scss';
import { useTranslation } from 'react-i18next';

const UploadPhoto = forwardRef<HTMLInputElement>((_, ref) => {
  const { t } = useTranslation();

  const userPhoto = useSelector((state: RootState) => state.user.user.photo);
  const [selectedPhoto, setSelectedPhoto] = useState(userPhoto);

  const showClose = selectedPhoto !== userPhoto;

  const selectPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onloadend = function () {
      setSelectedPhoto(reader.result?.toString() || '');
    };
  };

  const removePhoto = () => {
    setSelectedPhoto(userPhoto);
  };

  return (
    <>
      <div className="photo-preview">
        {showClose && (
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
          src={selectedPhoto}
          alt={t('msg.uploadPhotoAlt')}
        />
      </div>
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
    </>
  );
});

export default UploadPhoto;
