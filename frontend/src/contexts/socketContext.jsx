import { createContext, useEffect, useState, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  // console.log('aU:', authUser.data.user._id);
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8800', {
        query: {
          userId: authUser.data.user._id,
        },
      });
      setSocket(socket);
      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        console.log('closing socket', socket.id);
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
