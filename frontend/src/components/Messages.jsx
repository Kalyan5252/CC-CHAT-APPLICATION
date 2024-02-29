import { useRef, useEffect } from 'react';
import Message from './Message';
import Message_right from './Message_right';
import useGetMessages from '../hooks/useGetMessages';
import useConversation from '../zustand/useConversations';
import useListenMessages from '../hooks/useListenMessages';

const Messages = () => {
  const { loading, messages } = useGetMessages();
  // console.log('mesg:', messages);
  useListenMessages();
  const { selectedConversation } = useConversation();
  // console.log('messages:', messages);
  const lastMsgRef = useRef();
  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    // <div className="px-4 flex-1 overflow-auto">
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    //   <Message_right />
    // </div>

    <div className="px-4 flex-1 overflow-auto">
      <div className="py-2 space-y-[10px] flex-1 flex flex-col overflow-auto">
        {/* <Message mesg={messages[0]} />
        <Message_right mesg={messages[0]} /> */}
        {messages &&
          messages.map((conv, idx) => {
            lastMsgRef;
            return (
              <div key={conv._id} ref={lastMsgRef}>
                {conv.senderId === selectedConversation._id ? (
                  <div key={conv._id}>
                    {/* {console.log('chk2')} */}
                    <Message key={conv._id} mesg={conv} />
                  </div>
                ) : (
                  <Message_right key={conv._id} mesg={conv} />
                )}
              </div>
            );
          })}
        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : null}
      </div>
    </div>
  );
};

export default Messages;
