import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import RemindersList from '../Components/remindersList';
import ReminderForm from '../Components/createReminderForm';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReminders } from '../Redux/Slices/fetchUsersReminders';
import DeleteMultipleReminders from '../Components/deleteMultipleReminders';
import { MdFormatListBulleted } from "react-icons/md";

function ReminderPage() {
    const [toggleMail, setToggleMail] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const { reminderIds } = useSelector((state) => state.updateReminder)
    const [reminders, setReminders] = useState([]);
    const [ids,setIdsLength] = useState()
    const [filteredReminders, setFilteredReminders] = useState([]);
    const [filters, setFilters] = useState({ title: '', amount: '', status: '' });
    const dispatch = useDispatch();
    const { userRemindersData } = useSelector((state) => state.userReminders);
    const id = localStorage.getItem('userId');

    const toggleMailButton = () => {
        setToggleMail(!toggleMail);
    };

    const toggleDeleteButton = () => {
        if(ids!==0) setToggleDelete(!toggleDelete)
        };

    useEffect(() => {
        const data = { userId: id };
        dispatch(fetchReminders(data));
    }, [dispatch, id]);

    useEffect(()=>{
        if(reminderIds) {
            setIdsLength(reminderIds.length)
        }
    },[reminderIds])

    useEffect(() => {
        if (userRemindersData) {
            setReminders(userRemindersData.data);
            setFilteredReminders(userRemindersData.data);
        }
    }, [userRemindersData]);

    useEffect(() => {
        // Apply filters
        const filtered = reminders.filter((reminder) => {
            const matchesTitle = reminder.title
                .toLowerCase()
                .includes(filters.title.toLowerCase());
            const matchesAmount =
                !filters.amount || reminder.amount.toString().includes(filters.amount);
            const matchesStatus =
                !filters.status || reminder.status.toLowerCase() === filters.status;

            return matchesTitle && matchesAmount && matchesStatus;
        });
        setFilteredReminders(filtered);
    }, [filters, reminders]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='bg-gray-100 h-screen w-screen overflow-y-hidden flex space-x-2 align-middle p-5'>
            <Sidebar />
            
            <div className='flex flex-col gap-3 items-center w-full'>
                <div className='bg-teal-600 py-[15px] rounded-lg shadow-md w-full flex gap-4 justify-center items-center align-middle'>
                    <input
                        type="text"
                        placeholder="Search Title"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    />
                    <input
                        type="text"
                        placeholder="Search Amount"
                        name="amount"
                        value={filters.amount}
                        onChange={handleFilterChange}
                        className="w-1/4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    />
                    <div>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="border p-2 w-full"
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div title='Create Reminder'>
                        <MdAddCircle onClick={toggleMailButton} className='text-3xl cursor-pointer text-green-600' />
                    </div>
                    <div title='Delete Reminders'>
                        <MdDelete onClick={toggleDeleteButton} className='text-3xl cursor-pointer text-red-600' />
                    </div>
                </div>
                <div className='overflow-scroll overflow-x-hidden w-full flex flex-col items-center gap-3'>
                    {filteredReminders.length > 0 ? (
                        filteredReminders.map((reminder) => (
                            <RemindersList key={reminder._id} reminder={reminder} />
                        ))
                    ) : (
                        <p className='flex align-middle items-center gap-2 mt-[100px]'>Click on <MdAddCircle className='text-2xl'/> to create a reminder</p>
                    )}
                </div>
            </div>
            {toggleMail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <ReminderForm toggleButton={toggleMailButton} />
                </div>
            )}

            {
                toggleDelete  &&  ids!==0 && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                        <DeleteMultipleReminders toggleButton={toggleDeleteButton} />
                    </div>


                )
            }
        </div>
    );
}

export default ReminderPage;
