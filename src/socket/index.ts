import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BASE_URL!);
socket.on('connect', () => {
  console.log('connected to server');
});

export default socket;
