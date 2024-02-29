import { useEffect } from 'react';

// import { useSocketContext } from './../contexts/socketContext.js';
import { useSocketContext } from '../contexts/socketContext.jsx';
import useConversation from './../zustand/useConversations.js';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    };
    // socket?.on('newMessage', (newMessage) => {
    //   // newMessage.shouldShake = true;
    //   setMessages([...messages, newMessage]);
    // });
    socket?.on('newMessage', handleNewMessage);
    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};
export default useListenMessages;

// const useListenMessages = () => {
// 	const { socket } = useSocketContext();
// 	const { messages, setMessages } = useConversation();

// 	useEffect(() => {
// 		socket?.on("newMessage", (newMessage) => {
// 			newMessage.shouldShake = true;
// 			const sound = new Audio(notificationSound);
// 			sound.play();
// 			setMessages([...messages, newMessage]);
// 		});

// 		return () => socket?.off("newMessage");
// 	}, [socket, setMessages, messages]);
// };
