import calcTimestamp from 'utils/date/calcTimestamp';
import { ICOMMENT } from '../interfaces';

import './CommentItem.scss';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { ReactComponent as IconOptions } from 'assets/icons/options.svg';
import { deleteComment, editComment } from '../store/actions';
import FormInput from 'components/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import PrimaryButton from 'components/PrimaryButton';

const CommentItem = ({ comment }: { comment: ICOMMENT }) => {
  const { t } = useTranslation();
  const { _id: userId } = useSelector((state: RootState) => state.user.user);
  const methods = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [optionsShown, setOptionsShown] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);

  const toggleOptions = () => {
    setOptionsShown(prevState => !prevState);
  };

  const deleteCommentHandler = async () => {
    setOptionsShown(false);
    await dispatch(deleteComment(comment.post, comment._id));
  };

  const editCommentFormSubmitHandler = methods.handleSubmit(async data => {
    if (data.comment === comment.content) {
      return;
    }
    await dispatch(editComment(comment.post, comment._id, data.comment));
    setIsEditComment(false);
  });

  const showEditCommentHandler = () => {
    setIsEditComment(true);
    setOptionsShown(false);
  };

  const cancelEditHandler = () => {
    setIsEditComment(false);
  };

  return (
    <div className="comment" dir="auto">
      {userId === comment.user._id && (
        <div className="comment__options">
          <button
            className="comment__options--btn"
            type="button"
            onClick={toggleOptions}
          >
            <IconOptions className="comment__options--icon" />
          </button>
          {optionsShown && (
            <ul className="comment__options--list">
              <li className="comment__options--list-item">
                <button
                  className="comment__options--list-item__btn"
                  onClick={showEditCommentHandler}
                >
                  {t('action.edit')}
                </button>
              </li>
              <li className="comment__options--list-item">
                <button
                  className="comment__options--list-item__btn"
                  onClick={deleteCommentHandler}
                >
                  {t('action.delete')}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
      <div className="comment__user">
        <span className="comment__user--photo">
          <img
            crossOrigin="anonymous"
            src={comment.user.photo}
            alt={comment.user.name}
          />
        </span>
        <span className="comment__user--name">{comment.user.name}</span>
      </div>
      <div className="comment__date">
        {calcTimestamp(new Date(comment.addedAt))}
      </div>

      <div className="comment__content" dir="auto">
        {isEditComment && (
          <FormProvider {...methods}>
            <form
              className="comment__edit--form"
              onSubmit={editCommentFormSubmitHandler}
            >
              <FormInput id="comment" label="" value={comment.content} />
              <div className="comment__edit--actions">
                <PrimaryButton text={t('action.save')} type="submit" />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={cancelEditHandler}
                >
                  {t('action.cancel')}
                </button>
              </div>
            </form>
          </FormProvider>
        )}
        {!isEditComment && comment.content}
      </div>
    </div>
  );
};

export default CommentItem;
