import PrimaryButton from 'components/PrimaryButton';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import CommentItem from './CommentItem';
import LoadingSpinner from 'components/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { addComment } from '../store/actions';
import FormInput from 'components/FormInput';

const PostComments = ({ postId }: { postId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<{ comment: string }>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );
  const { isLoading, commentsOnPost: comments } = useSelector(
    (state: RootState) => state.home
  );

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  const addCommentHandler: SubmitHandler<{ comment: string }> = async data => {
    await dispatch(addComment(postId!, data.comment));
    methods.reset({
      comment: '',
    });
  };
  const commentInputClasses = `form-control__input ${
    errors.comment?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <section className="post_comments">
      <h2 className="post__comments--title">Comments</h2>
      {comments &&
        comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      {isAuthenticated && (
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(addCommentHandler)}
            className="post__comments--add-comment"
          >
            <FormInput
              id="comment"
              type="text"
              label="Add New Comment"
              isInvalidMessage={errors.comment?.message}
              className={commentInputClasses}
              validations={{
                required: 'Please type comment',
              }}
            />
            <PrimaryButton type="submit" text="Add" />
          </form>
        </FormProvider>
      )}
    </section>
  );
};

export default PostComments;
