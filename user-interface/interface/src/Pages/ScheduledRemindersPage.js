import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import ScheduleReminderList from '../Components/scheduleReminderList';
import axios from 'axios';
import Cookies from 'js-cookie'
import { MdSchedule } from "react-icons/md";

function ScheduledRemindersPage() {

  const [reminders,setReminders] = useState();
const apiURL = process.env.REACT_APP_API_URL_BASE


  const fetchReminders = async ()=>{
    try {
      const response = await axios.get(`${apiURL}/v1/user/fetch/schedule-reminder?userId=${localStorage.getItem('userId')}`,{
        headers:{
          Authorization:`Bearer ${Cookies.get('token')} `
        }
      })
      if(response.data.length!==0) setReminders(response.data);
    } catch (error) {
      console.log('checking error',error.response.data);
    }
  }
  useEffect(()=>{
    fetchReminders()
  },[])
  return (
    <div className='bg-gray-100 h-screen w-screen overflow-y-hidden flex space-x-2 align-middle p-5'>
        <Sidebar/>
           <div className='flex flex-col gap-3 items-center w-full'>
             <div className='bg-teal-600 text-white text-2xl  p-[15px] rounded-lg shadow-md w-full flex gap-4 items-center align-middle'>
                Scheduled Reminders
             </div>
             <div className='overflow-scroll overflow-x-hidden w-full flex flex-col items-center gap-3'>
                    {reminders ? (
                        reminders.map((reminder) => (
                            <ScheduleReminderList key={reminder._id} reminder={reminder} />
                        ))
                    ) : (
                        <p>No reminders found</p>
                    )}
                </div>
           </div>
    </div>
  )
}

export default ScheduledRemindersPage