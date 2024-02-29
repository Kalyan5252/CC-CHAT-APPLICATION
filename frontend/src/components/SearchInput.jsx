import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useConversation from '../zustand/useConversations';
import useGetConversations from '../hooks/useGetConversations';
import Conversations from './Conversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [reloadComponent, setReloadComponent] = useState(false);
  const { setSelectedConversation } = useConversation();
  const { conversations, setConversations, tdata } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handling');
    if (!search) setConversations(tdata);
    const { allUsers } = tdata;
    // console.log('ai:', allUsers);
    const conversation = allUsers.filter((c) =>
      c.userName.toLowerCase().includes(search.toLowerCase())
    );
    if (!conversation) {
      toast.error('No user found');
      setConversations(tdata);
    } else {
      // setSelectedConversation(conversation);
      // console.log('cs0:', conversations);
      setConversations({ allUsers: conversation });
      setReloadComponent(true);
      // console.log('cc:', conversation);
      // console.log('cc2:', conversations);
      setSearch('');
    }
  };
  return (
    <>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="input input-primary rounded-full input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle text-white hover:text-primary hover:bg-white hover:border-primary"
        >
          <FaSearch />
        </button>
      </form>
      {reloadComponent ? (
        <Conversations convs={conversations} />
      ) : (
        <Conversations convs={conversations} />
      )}
    </>
  );
};

export default SearchInput;
