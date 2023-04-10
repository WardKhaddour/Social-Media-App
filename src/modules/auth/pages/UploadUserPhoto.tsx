import LoadingSpinner from 'components/LoadingSpinner';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import AuthPagesText from '../components/AuthPagesText';
import { FormEvent, useRef } from 'react';
import UploadPhoto from 'components/UploadPhoto';

import PrimaryButton from 'components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'store/user/actions';
import './UploadUserPhoto.scss';
import { userActions } from 'store/user';
import { useTranslation } from 'react-i18next';

const UploadUserPhoto = () => {
  const { t } = useTranslation('translation', { useSuspense: true });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { isLoading } = useSelector((state: RootState) => state.user);

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageInputRef.current?.files) {
      return navigate('/');
    }
    const photo = imageInputRef.current?.files[0];
    const formData = new FormData();
    formData.append('photo', photo);
    const success = await dispatch(updateUserData(formData));
    if (success) {
      navigate('/');
    }
  };

  const skipPhotoUploadHandler = () => {
    dispatch(userActions.setUserData({ ...user, isAuthenticated: true }));
    navigate('/');
  };

  return (
    <div className="upload-user-photo">
      <LoadingSpinner loading={isLoading} />
      <AuthPagesText
        title={t('msg.uploadPhoto')}
        text={t('msg.uploadPhotoMsg')}
      />
      <form className="auth-content__form" onSubmit={formSubmitHandler}>
        <UploadPhoto ref={imageInputRef} />
        <PrimaryButton text={t('action.save')} type="submit" />

        <div className="form-control">
          <button
            className="link auth-content__link"
            onClick={skipPhotoUploadHandler}
            type="button"
          >
            {t('action.skip')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadUserPhoto;
