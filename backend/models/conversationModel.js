import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
      },
    ],
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'message',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const conversationModel = mongoose.model('conversation', conversationSchema);

export default conversationModel;
