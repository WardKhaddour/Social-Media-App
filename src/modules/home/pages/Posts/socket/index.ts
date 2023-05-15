import { postsActions } from './../store/index';
import socket from 'socket';
import store from 'store';

socket.on('post', data => {
  if (data.action === 'create') {
    store.dispatch(postsActions.addNewPost(data.post));
  } else if (data.action === 'update') {
    store.dispatch(postsActions.updatePost(data.post));
  } else if (data.action === 'delete') {
    store.dispatch(postsActions.deletePost(data.post));
  }
});
