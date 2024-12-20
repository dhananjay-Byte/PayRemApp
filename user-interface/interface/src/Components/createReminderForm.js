import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeResponse, saveReminder} from '../Redux/Slices/createRemindeSlice'
import {toast} from 'react-hot-toast'

const ReminderForm = ({toggleButton}) => {
    const dispatch = useDispatch();
    const {server_response} = useSelector((state)=>state.saveReminder)
    const [title,setTitle] = useState();
    const [amount,setAmount] = useState();
    const [dueDate,setDueDate] = useState();
    const [status,setStatus] = useState('pending');
    const [note,setNote] = useState();
    const [error,setError] = useState(false)

    const saveReminderinDB = async(e)=>{
        e.preventDefault();
        if(!title || !amount || !dueDate) { return setError(true)};
       
        dispatch(saveReminder({
            userId:localStorage.getItem('userId'),
            title:title,
            amount:amount,
            dueDate:dueDate,
            status:status,
            notes:note,
        }));
        setError(false);
    }

    const handleCancel = (e)=>{
        e.preventDefault()
        toggleButton();
    }

    useEffect(()=>{
        if(server_response && server_response===200){
            
            toast.success('reminder saved successfully!',{
                duration:3000
            })
            dispatch(removeResponse());

            setInterval(()=>{
                window.location.reload();
            },2000)
        } 
    },[server_response])
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form className="form bg-white p-6 my-10 relative shadow-lg rounded-md w-full max-w-lg">
                <div
                    className="icon bg-teal-600 text-white w-6 h-6 absolute flex items-center justify-center p-5"
                    style={{ left: "-40px" }}
                >
                    <i className="fal fa-phone-volume fa-fw text-2xl transform -rotate-45"></i>
                </div>
                <h3 className="text-2xl text-gray-900 font-semibold">Create a new reminder</h3>
                <p className="text-gray-600">enter details carefully!</p>
                <div className="flex space-x-5 mt-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="border p-2 w-1/2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        className="border p-2 w-1/2"
                        required
                    />
                </div>

                <div className="flex space-x-5 mt-3">
                    <input
                        type="date"
                        placeholder="Due Date"
                        value={dueDate}
                        onChange={(e)=>setDueDate(e.target.value)}
                        className="border p-2 w-1/2"
                        required
                    />
                    <div className="w-1/2">
                        <select
                            id="status"
                            className="border p-2 w-full "
                            defaultValue="pending"
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
                {error ? <div className="text-red-600 text-center mt-1">Above all fields are required!</div>: null}
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
                      onClick={(e)=> handleCancel(e)}
                        className="text-black w-1/2 mt-6 bg-white border border-teal-600  hover:bg-teal-500 hover:text-white font-semibold p-3"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        value="Create"
                        onClick={(e)=>saveReminderinDB(e)}
                        className="w-1/2 mt-6 cursor-pointer bg-teal-600 hover:bg-teal-500 text-white font-semibold p-3"
                    >
                        Create
                        </button>

                </div>

            </form>
        </div>
    );
};

export default ReminderForm;
