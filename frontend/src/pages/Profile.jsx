import React from 'react';
import { useState } from 'react';
// import useConversation from '../zustand/useConversations';
import { useAuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { authUser } = useAuthContext();
  const user = authUser.data.user;
  const [profilePic, setProfilePic] = useState(user.profilePic);

  console.log(user);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    // Trigger file input when profile picture is clicked
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex h-full justify-center items-center ">
      <div className="bg-gray-800 p-10 text-gray-200 gap-10 flex flex-col min-h-[550px] min-w-[450px]">
        <h1 className="underline">Profile</h1>
        <div className="flex justify-center">
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <img
            src={
              profilePic ||
              'https://imgs.search.brave.com/VtuLHgcddG8TLDGhaJKjTncbbvvSBk_shiTxgEnwGFs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/YWJzdHJhY3QtdXNl/ci1mbGF0LTQucG5n'
            }
            alt="pic"
            onClick={handleClick}
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <h3 className="self-start">UserName</h3>
          <input
            type="text"
            value={user.userName}
            readOnly
            className="outline-none p-4 rounded-lg bg-gray-700"
          />
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <h3 className="self-start">FirstName</h3>
          <input
            type="text"
            value={user.firstName}
            readOnly
            className="outline-none p-4 rounded-lg bg-gray-700"
          />
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <h3 className="self-start">LastName</h3>
          <input
            type="text"
            value={user.lastName}
            readOnly
            className="outline-none p-4 rounded-lg bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
