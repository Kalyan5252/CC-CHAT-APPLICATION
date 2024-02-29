import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';

const Signup = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    await signup(inputs);
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
        <div className="w-full p-10 rounded-lg shadow-md bg-gray-800">
          <h1 className="font-semibold text-3xl">Signup</h1>
          <form className="mt-8 " onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between ">
              <label className="label p-2">
                <span className="text-base label-text">FirstName</span>
              </label>
              <input
                type="text"
                className=" input input-primary input-bordered h-10"
                value={inputs.firstName}
                onChange={(e) =>
                  setInputs({ ...inputs, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-between ">
              <label className="label p-2">
                <span className="text-base label-text">LastName</span>
              </label>
              <input
                type="text"
                className=" input input-primary input-bordered h-10"
                value={inputs.lastName}
                onChange={(e) =>
                  setInputs({ ...inputs, lastName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-between ">
              <label className="label p-2">
                <span className="text-base label-text">UserName</span>
              </label>
              <input
                type="text"
                className=" input input-primary input-bordered h-10"
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
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-between ">
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                className="input input-primary input-bordered h-10"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="lp_links w-full flex flex-col gap-4 p-2 mt-4 text-sm">
              <p className="flex gap-4">
                Already have an Account?
                <Link
                  to={'/login'}
                  href="#"
                  className="hover:text-blue-600 hover:underline transition-all"
                >
                  Login
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <button className="btn btn-outline btn-sm">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
