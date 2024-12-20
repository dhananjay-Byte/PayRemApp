import React, { useEffect, useState } from 'react';
import { MdDelete, MdEmail, MdEdit, MdSchedule } from "react-icons/md";
import UpdateReminderForm from './updateReminderForm';
import SendReminderForm from './sendReminderMail';
import DeleteReminder from './deleteReminder';
import { useDispatch } from 'react-redux';
import { removeReminderId, addReminderId } from '../Redux/Slices/updateReminderSlice';
import ScheduleReminder from './scheduleReminder';

const RemindersList = ({ reminder }) => {
    const dispatch = useDispatch()
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [toggleMail, setToggleMail] = useState(false);
    const [toggleDelete,setToggleDelete] = useState(false);
    const [toggleScheduleMail,setScheduleMail] = useState(false);

    const toggleUpdateButton = () => setToggleUpdate(!toggleUpdate);
    const toggleMailButton = () => setToggleMail(!toggleMail);
    const toggleDeleteButton = ()=> setToggleDelete(!toggleDelete);
    const toggleScheduleButton = ()=> setScheduleMail(!toggleScheduleMail);

    const formattedDate = new Date(reminder.dueDate).toISOString().split('T')[0];

    const handleCheckbox = async(id,e)=>{
        if(e.target.checked===true){ 
            dispatch(addReminderId(id))
        }else if(e.target.checked===false){
            dispatch(removeReminderId(id))
        }
    }

    return (
        <div className='w-[70%]'>
            <div className='bg-white w-full flex shadow-md py-[15px] rounded-md justify-around items-center'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-3'>
                        <input type='checkbox'  onChange={(e)=>handleCheckbox(reminder._id,e)} id={`reminder-${reminder.id}`} className='size-[18px]' />
                        <label htmlFor={`reminder-${reminder.id}`} className="text-xl max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                            <strong>{reminder.title}</strong>
                        </label>
                    </div>
                    <div className='flex justify-between gap-8'>
                        <div className='flex flex-col gap-2 flex-1'>
                            <p className='text-teal-600'>
                                Date: <strong className='text-black'>{formattedDate}</strong>
                            </p>
                            <p className='text-teal-600'>
                                Status: <strong className='text-black'>{reminder.status}</strong>
                            </p>
                            
                            <p className='text-teal-600'>
                                {reminder.isScheduled && <strong className='text-black'>Reminder Scheduled</strong>}
                            </p>
                           
                        </div>
                        <div className='flex flex-col gap-2 flex-1 w-full'>
                        <p className={`text-teal-600 flex`}>
                                Amount: <strong className='text-black'><input type='text' className='focus:outline-none' value={reminder.amount}/></strong> 
                            </p>
                           
                            
                            <p className='text-teal-600'>
                                Reminders Sent: <strong className='text-black'>{reminder.remindersSent ? reminder.remindersSent : 0}</strong>
                            </p>

                            <p className='flex text-sm items-center gap-1'>
                                Click on <MdEdit className='text-blue-600 cursor-pointer' /> icon to update
                            </p>

                        </div>
                    </div>
                </div>
                <div className='flex gap-2 text-xl'>
                    <div title='Send Mail'>
                        <MdEmail onClick={toggleMailButton} className='text-amber-600 cursor-pointer shadow-sm hover:shadow-amber-600' />
                    </div>
                    <div title='Edit Reminder'>
                        <MdEdit onClick={toggleUpdateButton} className='text-blue-600 cursor-pointer shadow-sm hover:shadow-blue-600' />
                    </div>
                    <div title='Schedule Reminder'>
                        <MdSchedule onClick={toggleScheduleButton} className='cursor-pointer shadow-sm hover:shadow-black' />
                    </div>
                    <div title='Delete'>
                        <MdDelete onClick={toggleDeleteButton} className='text-red-600 cursor-pointer shadow-sm hover:shadow-red-600' />
                    </div>
                </div>
            </div>

            {toggleUpdate && (
                <Modal>
                    <UpdateReminderForm toggleButton={toggleUpdateButton} reminderData={reminder} />
                </Modal>
            )}

            {toggleMail && (
                <Modal>
                    <SendReminderForm toggleButton={toggleMailButton} reminderData={reminder} />
                </Modal>
            )}

            {
                toggleDelete && (
                    <Modal>
                        <DeleteReminder toggleButton={toggleDeleteButton} id={reminder._id}/>
                    </Modal>
                )
            }

            {
                toggleScheduleMail && (
                    <Modal>
                        <ScheduleReminder toggleButton={toggleScheduleButton} reminderData={reminder}/>
                    </Modal>
                )
            }
        </div>
    );
};

const Modal = ({ children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
        {children}
    </div>
);

export default RemindersList;
