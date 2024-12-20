import React, { useEffect, useState } from 'react'
import DisplayHistoryData from './displayHistoryData';

function HistoryReminderList({ reminder }) {
    const [toggleDetails, setToggleDetails] = useState(false);
    const toggleDetailsButton = () => setToggleDetails(!toggleDetails);
    const [scheduleDate, setScheduleData] = useState();
    const [scheduleTime, setScheduleTime] = useState();

    
    useEffect(() => {
        let date
        if(reminder.scheduleTime){ date = new Date(reminder.scheduleTime);
        }else{
            date = new Date(reminder.updatedAt)
        }
       
        const day = date.getDate(); 
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours(); 
        const minute = date.getMinutes(); 
    
        setScheduleData(`${day}-${month}-${year}`)
        setScheduleTime(`${hour}:${minute}`)

    }, [])
    return (
        <div className='w-[60%]'>
            <div className='bg-white w-full  shadow-md py-[15px] rounded-md'>
                <div className='flex flex-col justify-start w-full px-4'>
                    <label className="text-xl max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                        <strong>{reminder.title}</strong>
                    </label>
                    <div className='flex flex-col gap-1'>
                        <p className='text-teal-600'>Date: {scheduleDate}</p>
                        <p className='text-teal-600'>Time: {scheduleTime}</p>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button onClick={toggleDetailsButton} className='text-white bg-teal-600 hover:bg-teal-500 cursor-pointer rounded-md text-sm p-2'>View Details</button>
                    </div>
                </div>

            </div>

            {
                toggleDetails && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                        <DisplayHistoryData toggleButton={toggleDetailsButton} reminderData={reminder}/>
                    </div>
                )
            }

        </div>
    )
}

export default HistoryReminderList