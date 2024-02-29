import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../hooks/useLogout';

const LogoutBtn = () => {
  const { loading, logout } = useLogout();
  return (
    <div className=" p-2 mt-auto cursor-pointer rounded-full hover:bg-white hover:shadow-md hover:text-gray-800">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <div className="flex gap-4" onClick={logout}>
          <BiLogOut className="h-6 w-6" />
          Logout
        </div>
      )}
    </div>
  );
};

export default LogoutBtn;
