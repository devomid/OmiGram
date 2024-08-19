import io from 'socket.io-client';
import { GeneralState } from './contexts/GeneralContext';

const ENDPOINT = 'https://omigramapi.onrender.com';
var socket;


export const initSocket = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  socket = io(ENDPOINT);
  socket.emit('setup', user.user);
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket connection not initialized');
  }
  return socket;
}