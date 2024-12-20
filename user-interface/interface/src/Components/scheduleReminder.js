import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import Scheduler from "./schedulerComponent";

const ScheduleReminder = ({ toggleButton, reminderData }) => {

    // const [file, setFile] = useState(null);
    const [formattedDate, setFormattedDate] = useState()
    const date = new Date(reminderData.dueDate);
    const [toggleSchedule, setToggleSchedule] = useState(false);

    const [formData, setFormData] = useState();
    const [prevData,setPrevData] = useState();

    const handleScheduleButton = (e) => {
        e.preventDefault();
        const requiredFields = ['receiverEmail', 'subject', 'receiverName'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`${field} is required.`);
                return;
            }
        }

        setToggleSchedule(!toggleSchedule)
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCancel = (e) => {
        e.preventDefault()
        toggleButton();
    }


    useEffect(() => {
        if (reminderData) {
            setFormData({
                userId:localStorage.getItem('userId'),
                reminderId: reminderData._id,
                receiverName: "",
                amount: reminderData.amount,
                dueDate: reminderData.dueDate,
                title: reminderData.title,
                organization_name: "",
                subject: "",
                receiverEmail: "",
                notes: reminderData.notes,
            });

            setPrevData({
                title:reminderData.title,
                amount:reminderData.amount,
                dueDate:reminderData.dueDate,
                note:reminderData.notes
            })
        }
    }, [reminderData, formattedDate]);


    useEffect(() => {
        setFormattedDate(date.toISOString().split('T')[0]);
    }, [])

    return (
        <div className="min-h-screen flex  items-center justify-center">
            <div className="py-4 px-4 rounded-md bg-white shadow-md">
                <h3 className="text-2xl text-gray-900 font-semibold">Schedule Reminder Mail</h3>
                <p className="text-gray-600">Enter details carefully!</p>
                <form className="mt-[10px]">

                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        defaultValue={formData?.title}
                        onChange={(e) => handleInputChange(e)}
                        required
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />

                    <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Receiver's Name"
                            name="receiverName"
                            defaultValue={formData?.receiverName}
                            onChange={(e) => handleInputChange(e)}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="Your Organization Name"
                            name="organization_name"
                            defaultValue={formData?.organization_name}
                            onChange={(e) => handleInputChange(e)}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />

                        <input
                            type="date"
                            placeholder="Due date"
                            name="dueDate"
                            defaultValue={formattedDate}
                            onChange={(e) => handleInputChange(e)}
                            required
                            className="w-full border cursor-pointer border-gray-300 rounded-md py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            name="amount"
                            defaultValue={formData?.amount}
                            onChange={(e) => handleInputChange(e)}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />

                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Mail Subject"
                                name="subject"
                                defaultValue={formData?.subject}
                                onChange={(e) => handleInputChange(e)}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            />
                        </div>


                        <div className="md:col-span-2">
                            <input
                                type="email"
                                placeholder="Receiver's E-mail"
                                name="receiverEmail"
                                defaultValue={formData?.receiverEmail}
                                onChange={(e) => handleInputChange(e)}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <textarea
                                rows="5"
                                placeholder="Note"
                                name="note"
                                defaultValue={formData?.notes}
                                onChange={(e) => handleInputChange(e)}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex gap-4">


                            <button onClick={(e) => handleCancel(e)} className="py-3 text-base font-medium rounded text-black bg-white border border-black w-1/2 hover:bg-gray-800 hover:text-white transition duration-300">
                                Cancel
                            </button>

                            <button className=" w-1/2 py-3 text-base font-medium rounded text-white bg-black hover:bg-gray-800 transition duration-300"
                                onClick={(e)=>handleScheduleButton(e)}>
                                Schedule
                            </button>
                        </div>
                    </div>
                </form>
                {
                    toggleSchedule && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                            <Scheduler onCancel={handleScheduleButton} mailData={formData} comparePrevData={prevData}/>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ScheduleReminder;
