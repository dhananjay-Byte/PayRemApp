import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import {removeStatus} from '../Redux/Slices/registerUserSlice'
import { useNavigate } from "react-router-dom";
function EmailVerificationHeader() {
    const {response} = useSelector((state)=>state.register)
  const dispatch = useDispatch()
  const navigate = useNavigate()
   useEffect(()=>{
    if(response?.isVerfied){
        toast.success('User Registered Successfully',{
            duration:2000
          })
        //   dispatch(removeStatus());
          navigate('/');
    }
},[response?.isVerfied ])

  return (
    <div>
        <h1 className='text-2xl flex justify-center'>
            Please Check Your Mail for verification.
        </h1>
    </div>
  )
}

export default EmailVerificationHeader