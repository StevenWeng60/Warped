import { io } from 'socket.io-client';
import prodConfig from '../config/production-config';

const URL = prodConfig

export const socket = io(URL);