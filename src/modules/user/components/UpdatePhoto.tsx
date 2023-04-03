import { AppDispatch } from 'store';
import { FormEvent, useRef } from 'react';
import UploadPhoto from 'components/UploadPhoto';

import PrimaryButton from 'components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'store/user/actions';

const UpdatePhoto = () => {
  const dispatch = useDispatch<AppDispatch>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageInputRef.current?.files) {
      return;
    }
    const photo = imageInputRef.current?.files[0];
    const formData = new FormData();
    formData.append('photo', photo);
    await dispatch(updateUserData(formData));
  };

  return (
    <div className="settings__update-photo">
      <form className="settings__form" onSubmit={formSubmitHandler}>
        <UploadPhoto ref={imageInputRef} />
        <PrimaryButton text="Upload" type="submit" />
      </form>
    </div>
  );
};

export default UpdatePhoto;
