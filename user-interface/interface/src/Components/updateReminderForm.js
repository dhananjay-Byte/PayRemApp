import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {updateReminderCall,removeResponse} from '../Redux/Slices/updateReminderSlice'
import {toast} from 'react-hot-toast' 

function UpdateReminderForm({toggleButton,reminderData}) {
    const [title,setTitle] = useState(reminderData.title);
    const [amount,setAmount] = useState(reminderData.amount);
    const [status,setStatus] = useState(reminderData.status);
    const [note,setNote] = useState(reminderData.notes);
    const [formattedDate,setFormattedDate] = useState()
    const dispatch = useDispatch();
    const {update_reminder_response} = useSelector((state)=>state.updateReminder)
    const date = new Date(reminderData.dueDate);

    

    const updateReminder = async(e)=>{
        e.preventDefault();
        dispatch(updateReminderCall({
            reminderId:reminderData._id,
            data:{
                status:status,
                title:title,
                dueDate:formattedDate,
                amount:amount,
                notes:note
            }
        }))
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        toggleButton();
    }

    useEffect(()=>{
        if(update_reminder_response && update_reminder_response===200){
            toast.success('Reminder Updated Successfully',{
                duration:3000
            })
            dispatch(removeResponse());
            window.location.reload();
        }
    },[update_reminder_response])

    useEffect(()=>{
        setFormattedDate(date.toISOString().split('T')[0]);
    },[])
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
            <form className="form bg-white p-6 my-10 relative 0 shadow-lg rounded-md w-full max-w-lg">
                <div
                    className="icon bg-blue-600 text-white w-6 h-6 absolute flex items-center justify-center p-5"
                    style={{ left: "-40px" }}
                >
                    <i className="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i>
                </div>
                <h3 className="text-2xl text-gray-900 font-semibold">Update reminder</h3>
                <p className="text-gray-600">enter details carefully!</p>
                <div className="flex space-x-5 mt-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="border p-2 w-1/2"
                   
                    />
                    <input
                        type="text"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        className="border p-2 w-1/2"
                       
                    />
                </div>

                <div className="flex space-x-5 mt-3">
                    <input
                        type="date"
                        placeholder="Due Date"
                        value={formattedDate}
                        onChange={(e)=>setFormattedDate(e.target.value)}
                        className="border p-2 w-1/2"
                  
                    />
                    <div className="w-1/2">
                        <select
                            id="status"
                            className="border p-2 w-full "
                            defaultValue="pending"
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            <option value="" disabled>
                                Select status
                            </option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>
                {/* {error ? <div className="text-red-600 text-center mt-1">Above all fields are required!</div>: null} */}
                <textarea
                    cols="10"
                    rows="3"
                    placeholder="Note (optional) "
                    value={note}
                    onChange={(e)=>setNote(e.target.value)}
                    className="border p-2 mt-3 w-full"
                ></textarea>
                <div className="flex space-x-5 mt-3">
                    

                    <button
                      onClick={(e)=>handleCancel(e)}
                        className="text-black w-1/2 mt-6 bg-white border border-blue-600  hover:bg-blue-500 hover:text-white font-semibold p-3"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        value="Create"
                        onClick={(e)=>updateReminder(e)}
                        className="w-1/2 mt-6 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3"
                    >
                        Update
                        </button>

                </div>

            </form>
        </div>
  )
}

export default UpdateReminderForm