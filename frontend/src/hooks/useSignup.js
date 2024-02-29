import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    firstName,
    lastName,
    userName,
    password,
    confirmPassword,
  }) => {
    const success = handleInputError({
      firstName,
      lastName,
      userName,
      password,
      confirmPassword,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      //   console.log(data);
      if (data.error) throw new Error(data.error);
      //   if (data.status === 'success') {
      //     window.location.href = '/';
      //   }
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

function handleInputError({
  firstName,
  lastName,
  userName,
  password,
  confirmPassword,
}) {
  if (!firstName || !userName || !password || !confirmPassword) {
    toast.error('Provide the details');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords doesn't match");
    return false;
  }
  return true;
}
