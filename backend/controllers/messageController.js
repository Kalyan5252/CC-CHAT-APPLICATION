import catchAsync from '../utility/catchAsync.js';
import Conversation from './../models/conversationModel.js';
import Message from './../models/messageModel.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = catchAsync(async (req, res) => {
  const { message } = req.body;
  // console.log(message);
  // res.send('mesg check transfer');
  const { id: receiverId } = req.params;
  const senderId = req.user.id;
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage.id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  // SOCKET FUNCTIONALITY
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }

  res.status(201).json(newMessage);
});

export const getMessages = catchAsync(async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user.id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate('messages');

  if (!conversation) return res.status(200).json([]);

  res.status(200).json(conversation.messages);
});
