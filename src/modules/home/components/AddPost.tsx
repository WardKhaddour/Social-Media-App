import ReactDOM from 'react-dom';
import Backdrop from 'components/Backdrop';
import PrimaryButton from 'components/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { FormEvent, MouseEvent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './AddPost.scss';
import FormInput from 'components/FormInput';
import Select, { ISelectionRef } from './Select';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import AttachFiles, { IAttachFiles } from './AttachFiles';
import { addNewPost } from '../store/actions';

interface PostInputs {
  title: string;
  content: string;
}

const AddPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const methods = useForm<PostInputs>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const [isFormShown, setIsFormShown] = useState(false);
  const { categories } = useSelector((state: RootState) => state.home);
  const selectionRef = useRef<ISelectionRef>(null);
  const attachmentsRef = useRef<IAttachFiles>(null);

  const showFormHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsFormShown(true);
  };
  const hideFormHandler = () => {
    setIsFormShown(false);
  };

  const preventCloseForm = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleLoadCategories = async () => {};

  const formSubmitHandler = handleSubmit(async data => {
    const categories = selectionRef.current?.getSelections();
    const attachments = attachmentsRef.current?.getAttachedFiles();
    const reqData = { ...data, categories, attachments };
    await dispatch(addNewPost(reqData));
    selectionRef.current?.clearSelections();
    attachmentsRef.current?.clearAttachedFiles();
    methods.reset();
    setIsFormShown(false);
  });

  const backdropClasses = isFormShown ? '' : 'hidden';

  const titleInputClasses = `form-control__input ${
    errors.title?.message ? 'form-control__input--invalid' : ''
  }`;
  const contentInputClasses = `form-control__input ${
    errors.content?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <>
      <form className="home__add-post" onSubmit={showFormHandler}>
        <h3 className="home__add-post--title">{t('label.addPost')}</h3>
        <PrimaryButton text={t('action.add')} type="submit" />
      </form>
      {ReactDOM.createPortal(
        <Backdrop className={backdropClasses} onClick={hideFormHandler}>
          <FormProvider {...methods}>
            <form
              className="add-post__form"
              onClick={preventCloseForm}
              dir="auto"
              onSubmit={formSubmitHandler}
            >
              <h2 className="add-post__form--title">{t('label.addPost')}</h2>
              <FormInput
                id="title"
                label={t('label.title')}
                validations={{
                  required: t('validateMsg.postTitleRequired'),
                }}
                isInvalidMessage={errors.title?.message}
                className={titleInputClasses}
              />
              <FormInput
                id="content"
                label={t('label.content')}
                inputFieldType="textarea"
                validations={{
                  required: t('validateMsg.postContentRequired'),
                }}
                isInvalidMessage={errors.content?.message}
                className={contentInputClasses}
              />
              <Select
                title={t('msg.selectCategories')}
                options={categories}
                ref={selectionRef}
              />
              <button
                onClick={handleLoadCategories}
                className="add-post__form--load-categories"
                type="button"
              >
                {t('action.loadMoreCategories')}
              </button>
              <AttachFiles
                ref={attachmentsRef}
                primaryActionText={t('action.attachFiles')}
                secondaryActionText={t('action.remove')}
              />
              <PrimaryButton text={t('action.add')} type="submit" />
            </form>
          </FormProvider>
        </Backdrop>,
        document.getElementById('backdrop-root')!
      )}
    </>
  );
};

export default AddPost;
