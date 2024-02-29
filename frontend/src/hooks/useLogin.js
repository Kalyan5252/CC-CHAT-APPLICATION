import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ userName, password }) => {
    // console.log('login chk');
    const success = handleInputError({ userName, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();
      if (!data) throw new Error(data.error);
      if (data.status === 'success') {
        localStorage.setItem('chat-user', JSON.stringify(data));
        setAuthUser(data);
      } else {
        toast.error('Wrong Credentials');
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

const handleInputError = ({ userName, password }) => {
  if (!userName || !password) {
    toast.error('Provide login credentials');
    return false;
  }
  return true;
};

export default useLogin;
