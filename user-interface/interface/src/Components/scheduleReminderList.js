import React, { useEffect, useState } from 'react'
import DisplayScheduledDetails from './displayScheduledDetails';
import toast from 'react-hot-toast'
import axios from 'axios';
import Cookies from 'js-cookie'

function ScheduleReminderList({ reminder }) {
    const [details,setDetails] = useState();
    const [toggleDetails, setToggleDetails] = useState(false);
    const toggleDetailsButton = () => setToggleDetails(!toggleDetails);
    const [scheduleDate, setScheduleData] = useState();
    const [scheduleTime, setScheduleTime] = useState();
const apiURL = process.env.REACT_APP_API_URL_BASE


    const fetchOtherDetails = async(id)=>{
        try {
            const response = await axios.get(`${apiURL}/v1/user/fetch/single-reminder?reminderId=${id}`,{
                    headers:{
                      Authorization:`Bearer ${Cookies.get('token')} `
                    }
                  })
                  setDetails(response.data)

        } catch (error) {
            console.log('checking error',error.response);
        }
    }

    const handleCancel = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.delete(`${apiURL}/v1/user/schedule-reminder/cancel?scheduledId=${reminder._id}`,{
                headers:{
                  Authorization:`Bearer ${Cookies.get('token')} `
                }
              })
              if(response.status===200){
                toast.success('Reminder Canceled Successfully')
                window.location.reload();
              }
        } catch (error) {
            console.log("schedule cancel response",error.response.error);
        }
    }

    useEffect(() => {
        const date = new Date(reminder.scheduleTime);
        const day = date.getDate(); 
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours(); 
        const minute = date.getMinutes(); 

    
        setScheduleData(`${day}/${month}/${year}`)
        setScheduleTime(`${hour}:${minute}`)

        fetchOtherDetails(reminder.reminderId);
        setDetails(reminder.title)
    }, [])
    return (
        <div className='w-[60%]'>
            <div className='bg-white w-full  shadow-md py-[15px] rounded-md'>
                <div className='flex flex-col  gap-2 justify-start w-full px-4'>
                    <label className="text-xl max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <strong>{details?.title}</strong>
                    </label>
                    <div className='flex flex-col gap-1'>
                        <p className='text-teal-600'>Schedule Date: {scheduleDate}</p>
                        <p className='text-teal-600'>Schedule Time: {scheduleTime}</p>
                    </div>
                    <div className='w-full flex justify-end gap-4'>
                        <button onClick={(e)=>handleCancel(e)} className='border border-teal-600 p-2 rounded-md text-sm cursor-pointer hover:text-white hover:bg-teal-500'>Cancel Schedule</button>
                        <button onClick={toggleDetailsButton} className='text-white bg-teal-600 hover:bg-teal-500 cursor-pointer rounded-md text-sm p-2'>View Details</button>
                    </div>
                </div>

            </div>

            {
                toggleDetails && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                        <DisplayScheduledDetails toggleButton={toggleDetailsButton} reminderData={reminder} otherData={details} />
                    </div>
                )
            }

        </div>
    )
}

export default ScheduleReminderList