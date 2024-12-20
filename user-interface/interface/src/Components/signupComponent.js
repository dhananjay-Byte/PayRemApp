import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import {registerUser,removeStatus} from '../Redux/Slices/registerUserSlice'
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const {response} = useSelector((state)=>state.register)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [displayPassword, setDisplayPassword] = useState(true);
  const [passwordType, setPasswordType] = useState('password');
  const [required, setRequired] = useState(false);
  const[error,setError] = useState();

  const storeUser = (e) => {
    e.preventDefault();
    if (!username || !email || !password){
      setRequired(true)
      return 0
    };
  
    const data = {
      email: email,
      username: username,
      password: password
    }
    setRequired(false);
    setError();
    dispatch(registerUser(data));
    navigate('/emailVerification');

    if(response?.status===201){
      toast.success(response.data.message,{
          duration:2000
        })
      }
      
    toast.remove();
  }

  const showPassword = () => {
    setDisplayPassword(!displayPassword)
    if (displayPassword) {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  
  useEffect(()=>{

    if(response?.statusCode===409){
      setError('Email or Username already exist!')
      toast.error('Something Went Wrong!')
    }
    dispatch(removeStatus());
  },[response])

  useEffect(()=>{
    toast.remove();
  },[])

  return (
    <div className="font-sans bg-gray-100">
       <div className="flex px-[10px]">
      <h1 className="hidden md:block font-bold text-sm md:text-3xl text-center">
            PayRem<span className="text-teal-600">.</span>
          </h1>
      </div>
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-teal-600 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-12"></div>
          <div className="card bg-teal-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-12"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-lg text-gray-700 text-center font-semibold">
              Register for new account
            </label>
            <form method="#" action="#" className="mt-10">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>

              <div className="mt-7">
                <input
                  type={passwordType}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {required && <div className="text-red-600">All fields are required!</div>}
              {error && <div className="text-red-600">{error}</div> }

              <label
                  htmlFor="remember_me"
                  className="inline-flex mt-7 items-center w-full cursor-pointer"
                  onClick={showPassword}
                >
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">Show Password</span>
                </label>

              <div className="mt-7">
                <button 
                onClick={(e)=>storeUser(e)}
                className="bg-teal-600 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                  Register
                </button>
              </div>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Not New?</label>
                  <a
                    href="#"
                    className="text-teal-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                    onClick={()=>navigate('/')}
                  >
                    Login
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

export default SignUpComponent;
