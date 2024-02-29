import React from 'react';

const Message_right = ({ mesg }) => {
  const getTime = (arg) => {
    const date = new Date(arg);
    return `${date.getHours() % 12}:${date.getMinutes()}`;
  };
  return (
    <div className="chat chat-end overflow-hidden">
      <div className="flex items-end gap-2">
        <span className=" opacity-40 text-xs ">{getTime(mesg.createdAt)}</span>
        <div className="chat-bubble flex bg-blue-600 text-white">
          {mesg.message}
        </div>
      </div>
    </div>
  );
};

export default Message_right;
