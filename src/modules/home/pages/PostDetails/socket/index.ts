import { postDetailsActions } from './../store/index';
import socket from 'socket';
import store from 'store';

socket.on('post', data => {
  if (data.action === 'update') {
    store.dispatch(postDetailsActions.updateCurrentPost(data.post));
  }
});

socket.on('comment', data => {
  if (data.action === 'create') {
    store.dispatch(postDetailsActions.addNewComment(data.data));
  } else if (data.action === 'update') {
    store.dispatch(postDetailsActions.updateComment(data.data));
  } else if (data.action === 'delete') {
    store.dispatch(postDetailsActions.deleteComment(data.data));
  }
});

socket.on('like', data => {
  if (data.action === 'update') {
    store.dispatch(postDetailsActions.updateLikes(data.data));
  }
});

socket.on('savePost', data => {
  if (data.action === 'update') {
    store.dispatch(postDetailsActions.updateSavePost(data.data));
  }
});
