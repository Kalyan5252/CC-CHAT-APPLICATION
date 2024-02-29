import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [tdata, setTdata] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        // console.log('data:', data);
        if (data.error) throw new Error(data.error);
        setConversations(data);
        setTdata(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations, setConversations, tdata };
};

export default useGetConversations;
