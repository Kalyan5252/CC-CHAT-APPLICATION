import { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import useSendMessage from '../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form className="px-4 py-2 my-3 flex gap-4 " onSubmit={handleSend}>
      <div className="relative w-full ">
        <input
          type="text"
          className="border text-sm rounded-full block w-full input p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className=" inset-y-0 end-0 flex items-center hover:text-primary  btn btn-ghost rounded-full "
      >
        {loading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <BiSend className="transform scale-150" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
