import React from 'react';
import useConversation from './../zustand/useConversations.js';
import { useSocketContext } from '../contexts/socketContext.jsx';

const conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`flex gap-4 items-center  rounded py-1 p-2 cursor-pointer hover:bg-gray-900 ${
          isSelected ? 'bg-gray-900' : ''
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img
              // src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              src={
                conversation.profilePic ||
                'https://imgs.search.brave.com/VtuLHgcddG8TLDGhaJKjTncbbvvSBk_shiTxgEnwGFs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/YWJzdHJhY3QtdXNl/ci1mbGF0LTQucG5n'
              }
              alt="user"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="font-bold text-white">{conversation.userName}</p>
          </div>
          <div className="flex justify-between">
            <p>
              {conversation.firstName} {conversation.lastName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default conversation;
