import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import {toast} from 'react-hot-toast'

const SendReminderForm = ({ toggleButton, reminderData }) => {

    const [file, setFile] = useState(null);
    const [formattedDate, setFormattedDate] = useState()
    const date = new Date(reminderData.dueDate);

    const [formData, setFormData] = useState();
const apiURL = process.env.REACT_APP_API_URL_BASE


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

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            alert('Only PDF files are allowed!');
            return;
        }
        setFile(selectedFile);
    };
    

    const handleSendMail = async (e) => {
        e.preventDefault();
    
        
        const requiredFields = ['receiverEmail', 'subject', 'receiverName'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`${field} is required.`);
                return;
            }
        }
    
        const uploadData = new FormData();
        if (file) {
            uploadData.append('file', file);
        }

        
        Object.keys(formData).forEach((key) => {
            uploadData.append(key, formData[key]);
        });
    
        try {
        
            const response = await axios.post(`${apiURL}/v1/user/sendMail`, uploadData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            toast.success('Email Sent Successfully!')
            setInterval(()=>{
                window.location.reload();
            },2000)

        } catch (error) {
            console.error('Error sending email:', error);
            const errorMessage =
                error.response?.data?.message || 'An error occurred while sending the email.';
            toast.error(errorMessage);
        }
    };
    
    useEffect(() => {
        if (reminderData) {
            setFormData({
                userId:localStorage.getItem('userId'),
                reminderId:reminderData._id,
                receiverName: "",
                amount: reminderData.amount,
                dueDate: formattedDate,
                title: reminderData.title,
                organization_name: "",
                subject: "",
                receiverEmail: "",
                note: reminderData.notes,
            });
        }
    }, [reminderData, formattedDate]);
    

    useEffect(() => {
        setFormattedDate(date.toISOString().split('T')[0]);
    }, [])

    return (
        <div className="min-h-screen flex  items-center justify-center">
            <div className="py-4 px-4 rounded-md bg-white shadow-md">
                <h3 className="text-2xl text-gray-900 font-semibold">Send Reminder Mail</h3>
                <p className="text-gray-600">Enter details carefully!</p>
                <form className="mt-[10px]">

                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        defaultValue={formData?.title}
                        onChange={(e)=>handleInputChange(e)}
                        required
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />

                    <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Receiver's Name"
                            name="receiverName"
                            defaultValue={formData?.receiverName}
                            onChange={(e)=>handleInputChange(e)}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="Your Organization Name"
                            name="organization_name"
                            defaultValue={formData?.organization_name}
                            onChange={(e)=>handleInputChange(e)}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />

                        <input
                            type="date"
                            placeholder="Due date"
                            name="dueDate"
                            defaultValue={formattedDate}
                            onChange={(e)=>handleInputChange(e)}
                            required
                            className="w-full border cursor-pointer border-gray-300 rounded-md py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            name="amount"
                            defaultValue={formData?.amount}
                            onChange={(e)=>handleInputChange(e)}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />

                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Mail Subject"
                                name="subject"
                                defaultValue={formData?.subject}
                                onChange={(e)=>handleInputChange(e)}
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
                                onChange={(e)=>handleInputChange(e)}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="file"
                                className="float-left block font-normal text-gray-400 text-lg"
                            >
                                Attach Invoice *pdf only
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileChange(e)}
                                className="peer block w-full appearance-none border-none bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:ring-0"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <textarea
                                rows="5"
                                placeholder="Note"
                                name="note"
                                defaultValue={formData?.note}
                                onChange={(e)=>handleInputChange(e)}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex gap-4">


                            <button onClick={(e) => handleCancel(e)} className="py-3 text-base font-medium rounded text-black bg-white border border-amber-800 w-1/2 hover:bg-amber-600 hover:text-white transition duration-300">
                                Cancel
                            </button>

                            <button className=" w-1/2 py-3 text-base font-medium rounded text-white bg-amber-800 hover:bg-amber-600 transition duration-300"
                            onClick={(e)=>handleSendMail(e)}>
                                Send Mail
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendReminderForm;
