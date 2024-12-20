import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {toast} from 'react-hot-toast'

function DeleteReminder({toggleButton,id}) {
    const [serverResponse,setServerResponse] = useState()
const apiURL = process.env.REACT_APP_API_URL_BASE

const handleDeleteReminder =  async()=>{
    try {
        const response = await axios.delete(`${apiURL}/v1/user/reminder/delete`, {
            data: {
                reminderId: id
            },
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        setServerResponse(response.status)

    } catch (error) {
        setServerResponse(error.response.status)
    }
}

useEffect(()=>{
    if(serverResponse && serverResponse===200){
        toast.success('reminder deleted successfully!',{
            duration:3000
        })

        setInterval(()=>{
            window.location.reload();
        },2000)
    }
},[serverResponse])
  return (
    <div className='bg-white shadow-md p-5 rounded-md flex flex-col gap-5'>
        <p className='text-xl'>Please confirm deleting this Reminder!</p>
        <div className='flex align-middle justify-end gap-4 text-l'>
            <button onClick={toggleButton} className='border p-1 cursor-pointer border-red-600 hover:bg-red-600 hover:text-white w-[30%]'>Cancel</button>
            <button onClick={handleDeleteReminder} className='border p-1 cursor-pointer bg-red-600 hover:bg-red-500 text-white w-[30%]'>Confirm</button>
        </div>
    </div>
  )
}

export default DeleteReminder