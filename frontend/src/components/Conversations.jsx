import React from 'react';
import Conversation from './conversation';
import useGetConversations from '../hooks/useGetConversations';

const Conversations = ({ convs }) => {
  const { loading, conversations } = useGetConversations();
  const { allUsers } = convs;
  // console.log('convs:', convs);

  // console.log('db:', allUsers);
  // console.log('convs:', allUsers);
  return (
    <div className="py-2 space-y-[10px] flex flex-col overflow-auto">
      {allUsers &&
        allUsers.map((conv, idx) => (
          <Conversation key={conv._id} conversation={conv} className="" />
        ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
