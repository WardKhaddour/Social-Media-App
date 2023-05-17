import { BASE_URL } from '../constants';
import io from 'socket.io-client';

const socket = io(BASE_URL);
socket.on('connect', () => {
  console.log('connected to server');
});

export default socket;
