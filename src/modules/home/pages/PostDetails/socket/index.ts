import { postDetailsActions } from './../store/index';
import socket from 'socket';
import store from 'store';

socket.on('post', data => {
  // if (data.action === 'create') {
  //   store.dispatch(homeActions.addNewPost(data.post));
  // } else
  // } else if (data.action === 'delete') {
  //   store.dispatch(homeActions.deletePost(data.post));
  // }

  if (data.action === 'update') {
    store.dispatch(postDetailsActions.updateCurrentPost(data.post));
  }
});
