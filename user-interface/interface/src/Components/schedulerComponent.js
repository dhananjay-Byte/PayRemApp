import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { updateReminderCall } from "../Redux/Slices/updateReminderSlice";
import { useDispatch } from "react-redux";

const Scheduler = ({ onCancel,mailData,comparePrevData }) => {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
    });

    const dispatch = useDispatch()

    const [updatedData,setUpdatedData] = useState();
const apiURL = process.env.REACT_APP_API_URL_BASE


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { date, time } = formData;
        if (!date || !time) {
            alert("Please provide both date and time!");
            return;
        }

        if(updatedData) {
            dispatch(updateReminderCall({
                reminderId:mailData.reminderId,
                data:updatedData
            }));
        }
        
        
        // Combine date and time, assume input is in local timezone (IST)
        const localDateTime = new Date(`${date}T${time}:00`);

        try {
            const response = await axios.post(`${apiURL}/v1/user/reminder/schedule`, {
                mailData: mailData,
                scheduleTime: localDateTime,
            },{
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                }
            });


            toast.success(response.data.message)
            setInterval(() => {
                window.location.reload();
            }, 2000)
        } catch (error) {
           
            toast.error(error.response.data.message)
        }
    };

    useEffect(()=>{
        setUpdatedData();
        const fieldsToCompare = ["title", "amount", "dueDate", "notes"];
        fieldsToCompare.forEach((field) => {
          if (mailData[field] !== comparePrevData[field]) {
              setUpdatedData((prevState)=>({
                  ...prevState,
                  [field]:mailData[field]
              }))
          }
      });
    },[])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white w-[20rem] shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold mb-4">Schedule Reminder</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="md:col-span-2 flex gap-2">


                    <button onClick={onCancel} className="py-3 text-base font-medium rounded text-black bg-white border border-black w-full hover:bg-gray-800 hover:text-white transition duration-300">
                        Cancel
                    </button>

                    <button className=" w-full py-3 text-base font-medium rounded text-white bg-black hover:bg-gray-800 transition duration-300">
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Scheduler;
