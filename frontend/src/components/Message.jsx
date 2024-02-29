import React from 'react';

const Message = ({ mesg }) => {
  const getTime = (arg) => {
    const date = new Date(arg);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div className="relative chat chat-start overflow-hidden flex items-end">
      <div className="chat-bubble flex bg-green-600 text-white text-left gap-4">
        {mesg.message}
      </div>
      <span className=" opacity-40 text-xs "> {getTime(mesg.createdAt)} </span>
    </div>
  );
};

export default Message;
