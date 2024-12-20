import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { useSelector, useDispatch} from 'react-redux'
import { emptyReminderId } from '../Redux/Slices/updateReminderSlice'
function DeleteMultipleReminders({ toggleButton }) {
    const [serverResponse, setServerResponse] = useState()
    const { reminderIds } = useSelector((state) => state.updateReminder)
    const dispatch = useDispatch()
const apiURL = process.env.REACT_APP_API_URL_BASE

    const handleDeleteReminder = async () => {
        try {
            if (reminderIds) {

                const response = await axios.post(
                    `${apiURL}/v1/user/reminder/delete-multiples`,
                    { reminderIds },
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                        },
                    }
                );

                setServerResponse(response.status)
            }

        } catch (error) {
            setServerResponse(error.response.status)
        }
    }

    useEffect(() => {
        if (serverResponse && serverResponse === 200) {
            toast.success('reminders deleted successfully!', {
                duration: 3000
            })
            dispatch(emptyReminderId());
            setInterval(() => {
                window.location.reload();
            }, 2000)
        }
    }, [serverResponse])

    return (
        <div>
                
                    <div className='bg-white shadow-md p-5 rounded-md flex flex-col gap-5'>
                        <p className='text-xl'>Please confirm deleting all selected Reminders!</p>
                        <div className='flex align-middle justify-end gap-4 text-l'>
                            <button onClick={toggleButton} className='border p-1 cursor-pointer border-red-600 hover:bg-red-600 hover:text-white w-[30%]'>Cancel</button>
                            <button onClick={handleDeleteReminder} className='border p-1 cursor-pointer bg-red-600 hover:bg-red-500 text-white w-[30%]'>Confirm</button>
                        </div>
                    </div>

        </div>
    )
}

export default DeleteMultipleReminders