import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [inputs, setInputs] = useState({
    userName: '',
    password: '',
  });

  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="flex flex-col  justify-center items-center min-w-96 mx-auto">
        <div className="w-full p-10 rounded-lg shadow-md bg-gray-800">
          <h1 className="font-semibold text-3xl">Login</h1>
          <form className="mt-8 " onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between ">
              <label className="label p-2">
                <span className="text-base label-text">UserName</span>
              </label>
              <input
                type="text"
                className=" input input-primary input-bordered h-10"
                placeholder="username"
                value={inputs.userName}
                onChange={(e) =>
                  setInputs({ ...inputs, userName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col justify-between ">
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-primary input-bordered h-10"
                placeholder="****"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>

            <div className="lp_links w-full flex flex-col gap-4 p-2 mt-4 text-sm">
              <p className="flex gap-4">
                <a
                  href="#"
                  className="hover:text-blue-600 hover:underline transition-all"
                >
                  Forgot Your Password?
                </a>
              </p>
              <p className="flex gap-4">
                <Link
                  to={'/signup'}
                  href="#"
                  className=" hover:underline transition-all hover:text-primary "
                >
                  Signup
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <button className="btn btn-outline btn-sm">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
