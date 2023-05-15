// import { homeActions } from './homeSlice';
// import io from 'socket.io-client';
// import store from 'store';

// const socket = io('http://localhost:8000');
// socket.on('connect', () => {
//   console.log('connected to server');
// });

// socket.on('post', data => {
//   if (data.action === 'create') {
//     store.dispatch(homeActions.addNewPost(data.post));
//   } else if (data.action === 'update') {
//     store.dispatch(homeActions.updatePost(data.post));
//   } else if (data.action === 'delete') {
//     store.dispatch(homeActions.deletePost(data.post));
//   }
// });

export {};
