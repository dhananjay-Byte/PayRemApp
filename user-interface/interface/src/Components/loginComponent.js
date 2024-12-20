import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, removeToken, removeError, checkRoute } from '../Redux/Slices/loginUserSlice'
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const LoginComponent = () => {
  const { userData, error } = useSelector((state) => state.loginUser)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [displayPassword, setDisplayPassword] = useState(true);
  const [passwordType, setPasswordType] = useState('password');
  const [required, setRequired] = useState(false)

  const getToken = (e) => {
    e.preventDefault();
    if (!username || !password) return setRequired(true);
    const data = {
      username: username,
      password: password
    }
    setRequired(false);
    dispatch(fetchUser(data));
    toast.remove()
  }

  const showPassword = () => {
    setDisplayPassword(!displayPassword)
    if (displayPassword) {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  useEffect(() => {
    if (userData) {
      if (userData.status === 200) {
        toast.success('login Successfull')
        localStorage.setItem('userId',userData.data.userData.userId);
        localStorage.setItem('username',userData.data.userData.name);
        localStorage.setItem('email',userData.data.userData.email);
        setInterval(()=>{
          navigate('/dashboard')
        },2000)
    
      } else if (userData.status === 401) {
        toast.error(userData.data.error)
      }
    }

  }, [userData])

  useEffect(() => {

    if (error) {
      toast.error(error)
    }
    dispatch(removeError());
  }, [error])

  useEffect(() => {
    toast.remove();
    dispatch(removeToken());
  }, [])

  return (
    <div className="font-sans bg-gray-100">
      <div className="flex px-[10px]">
      <h1 className="hidden md:block font-bold text-sm md:text-3xl text-center">
            PayRem<span className="text-teal-600">.</span>
          </h1>
      </div>
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-teal-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-12"></div>
          <div className="card bg-teal-600 shadow-lg w-full h-full rounded-3xl absolute transform rotate-12"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-lg text-gray-700 text-center font-semibold">
              Login
            </label>
            <form method="#" action="#" className="mt-10">
              <div>
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>


              <div className="mt-7">
                <input
                  type={passwordType}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {required && <div className="text-red-600">All fields are required!</div>}

              <div className="mt-7 flex">

                <label
                  htmlFor="remember_me"
                  className="flex flex-row items-center w-full cursor-pointer"
                  onClick={showPassword}
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show Password</span>
                </label>

                <div className="w-full text-right ">
                  <a
                    className="underline text-sm text-gray-600 hover:text-gray-900 cursor-not-allowed"
                    href="#"
                  >
                    Forget Password?
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <button
                  onClick={(e) => getToken(e)}
                  className="bg-teal-600 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">New User?</label>
                  <a
                    href="#"
                    className="text-teal-400 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                    onClick={() => navigate('/register')}
                  >
                    Create account
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
