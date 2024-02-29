import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST'],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log(`user connected via ${socket.id}`);
  // console.log('got userId:', socket.handshake.query.userId);
  const userId = socket.handshake.query.userId;
  if (userId != 'undefined') {
    userSocketMap[userId] = socket.id;
  }
  // console.log(userSocketMap);
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, server, io };
