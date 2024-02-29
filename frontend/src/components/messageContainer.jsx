import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../zustand/useConversations';
import { useAuthContext } from '../contexts/AuthContext';

const messageContainer = () => {
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return selectedConversation ? (
    <div className="hidden md:flex md:min-w-[550px]  min-w-[550px] w-full flex-col bg-gray-800">
      <div className="">
        <div className="bg-slate-500 px-4 py-2 mb-2 h-[70px] flex items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="pic"
                  src={
                    selectedConversation.profilePic ||
                    'https://imgs.search.brave.com/VtuLHgcddG8TLDGhaJKjTncbbvvSBk_shiTxgEnwGFs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/YWJzdHJhY3QtdXNl/ci1mbGF0LTQucG5n'
                  }
                />
              </div>
            </div>
            <span className="text-gray-900 font-bold ">
              {selectedConversation.userName}{' '}
            </span>
          </div>
        </div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  ) : (
    <div className="hidden flex-col md:flex justify-center w-full items-center md:min-w-[550px] bg-gray-900">
      {/* {console.log(authUser)} */}
      <h1>Hello...{authUser.data.user.firstName}</h1>
      <h2>Select a Conversation</h2>
    </div>
  );
};

export default messageContainer;
