import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MessageContainer from '../components/messageContainer';

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="md:p-2">
      <div className="md:flex sm:h-full md:justify-normal md:h-[650px]   rounded-lg overflow-hidden ">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
