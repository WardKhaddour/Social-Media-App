import LoadingSpinner from 'components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import {
  addComment,
  addLike,
  getCommentsOnPost,
  getPost,
  savePost,
} from '../store/actions';
import { useParams } from 'react-router-dom';
import NavItem from '../components/NavItem';

import { ReactComponent as IconLike } from 'assets/icons/like.svg';
import { ReactComponent as IconComment } from 'assets/icons/comment.svg';
import { ReactComponent as IconSave } from 'assets/icons/save.svg';

import './PostDetails.scss';
import CommentItem from '../components/CommentItem';
import FormInput from 'components/FormInput';
import PrimaryButton from 'components/PrimaryButton';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const PostDetails = () => {
  const methods = useForm<{ comment: string }>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const [postsLoading, setPostsLoading] = useState(true);
  const [commentsShown, setCommentsShown] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { postId } = useParams();
  const {
    currentPost: post,
    commentsOnPost: comments,
    isLoading,
  } = useSelector((state: RootState) => state.home);
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user.user
  );

  useEffect(() => {
    if (postId !== post?._id) {
      dispatch(getPost(postId!)).then(() => {
        setPostsLoading(false);
      });
    } else {
      setPostsLoading(false);
    }
  }, [dispatch, postId, post]);

  if (postsLoading) {
    return <LoadingSpinner loading={postsLoading} />;
  }

  const handleAddLike = async () => {
    await dispatch(addLike(postId!));
  };
  const toggleComments = async () => {
    setCommentsShown(prevState => !prevState);

    if (!comments || comments.length === 0)
      await dispatch(getCommentsOnPost(postId!));
  };

  const addCommentHandler: SubmitHandler<{ comment: string }> = async data => {
    await dispatch(addComment(postId!, data.comment));
    methods.reset({
      comment: '',
    });
  };

  const handleSavePost = async () => {
    await dispatch(savePost(postId!));
  };

  const commentInputClasses = `form-control__input ${
    errors.comment?.message ? 'form-control__input--invalid' : ''
  }`;

  return (
    <div className="post">
      <h2 className="post__title">{post?.title}</h2>
      <h3 className="post__author">
        <span>By&nbsp;</span>
        <span>{post?.author.name}</span>
      </h3>
      <section className="post__date">
        <span>At&nbsp;</span>
        <span>{new Date(post?.publishedAt!).toLocaleDateString()}</span>
      </section>
      <section className="post__content">{post?.content}</section>

      {post?.category && post.category.length > 0 && (
        <section className="post__categories">
          <span className="post__categories--title">Post Categories:</span>
          <span className="post__categories--list">
            {post?.category.map(cat => (
              <NavItem name={cat.name} key={cat._id} />
            ))}
          </span>
        </section>
      )}

      {isAuthenticated && (
        <section className="post__action">
          <div className="post__action--like">
            <button className="post__action--button" onClick={handleAddLike}>
              <IconLike className="post__action--icon" />
            </button>
            <span>{post?.likesNum}</span>
          </div>
          <div className="post__action--comment">
            <button className="post__action--button" onClick={toggleComments}>
              <IconComment className="post__action--icon" />
            </button>
            <span>{post?.commentsNum}</span>
          </div>
          <button className="post__action--button" onClick={handleSavePost}>
            <IconSave className="post__action--icon" />
          </button>
        </section>
      )}

      {isAuthenticated && commentsShown && (
        <section className="post_comments">
          {isLoading && <LoadingSpinner loading={isLoading} />}
          {!isLoading && (
            <>
              <h2 className="post__comments--title">Comments</h2>
              {comments?.map(comment => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
              {isAuthenticated && (
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(addCommentHandler)}
                    className="post__comments--add-commnt"
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
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default PostDetails;
