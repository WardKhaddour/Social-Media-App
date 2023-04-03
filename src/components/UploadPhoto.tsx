import { ChangeEvent, forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import './UploadPhoto.scss';

const UploadPhoto = forwardRef<HTMLInputElement>((_, ref) => {
  const userPhoto = useSelector((state: RootState) => state.user.user.photo);
  const [selectedPhoto, setSelectedPhoto] = useState(userPhoto);

  const showClose = selectedPhoto !== userPhoto;

  const selectPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) {
      return;
    }

    const reader = new FileReader();
    const url = reader.readAsDataURL(files[0]);

    reader.onloadend = function () {
      setSelectedPhoto(reader.result?.toString() || '');
    };

    console.log(url);
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
          alt="Your Uploaded File"
        />
      </div>
      <div className="form-control">
        <input
          ref={ref}
          onChange={selectPhotoHandler}
          className="form-control__input"
          id="photo"
          type="file"
          accept="photo/*"
        />
      </div>
    </>
  );
});

export default UploadPhoto;
