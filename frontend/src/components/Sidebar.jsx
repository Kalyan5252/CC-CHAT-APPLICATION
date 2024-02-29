import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutBtn from './LogoutBtn';

const Sidebar = () => {
  return (
    <div className="p-4 space-y-4  border-r-2 flex flex-col border-x-slate-600 bg-gray-800">
      <SearchInput />
      {/* <Conversations /> */}
      <LogoutBtn />
    </div>
  );
};

export default Sidebar;
