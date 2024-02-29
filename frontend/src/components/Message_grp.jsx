import React from 'react';

const Message = () => {
  return (
    <div className="chat chat-start overflow-hidden">
      <div className="chat-image avatar">
        <div className="w-6 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble flex ">
        Whatsup dude
        <span className="opacity-40 text-xs relative bottom-[-15px] right-[-5px]">
          09:00
        </span>
      </div>
    </div>
  );
};

export default Message;
