import { AppDispatch } from 'store';
import { FormEvent, useRef } from 'react';
import UploadPhoto from 'components/UploadPhoto';

import PrimaryButton from 'components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { updateUserPhoto } from 'store/user/actions';
import { useTranslation } from 'react-i18next';

const UpdatePhoto = () => {
  const { t } = useTranslation();
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
    await dispatch(updateUserPhoto(formData));
  };

  return (
    <div className="settings__update-photo">
      <h2 className="heading-primary settings__heading">
        {t('msg.updatePhoto')}
      </h2>
      <form className="settings__form" onSubmit={formSubmitHandler}>
        <UploadPhoto ref={imageInputRef} />
        <PrimaryButton text={t('action.upload')} type="submit" />
      </form>
    </div>
  );
};

export default UpdatePhoto;
