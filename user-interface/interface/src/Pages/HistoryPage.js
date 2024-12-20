import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import axios from 'axios';
import Cookies from 'js-cookie';
import HistoryReminderList from '../Components/historyRemindersList';

function HistoryPage() {
    const [historyReminders, setHistoryReminders] = useState([]);
    const [filteredReminders, setFilteredReminders] = useState([]);
    const [filters, setFilters] = useState({ title: '', dueDate: '' });
const apiURL = process.env.REACT_APP_API_URL_BASE


    const id = localStorage.getItem('userId');

    const fetchReminderHistory = async () => {
        try {
            const response = await axios.get(`${apiURL}/v1/user/fetch/history-reminders?userId=${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            setHistoryReminders(response.data);
            setFilteredReminders(response.data); // Initialize filtered reminders
        } catch (error) {
            console.error('Error fetching reminder history:', error);
        }
    };

    useEffect(() => {
        fetchReminderHistory();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));

        // Filter reminders based on current filters
        const filtered = historyReminders.filter((reminder) => {
            const matchesTitle = reminder.title
                .toLowerCase()
                .includes((filters.title || '').toLowerCase());
            const matchesDueDate = !filters.dueDate || reminder.dueDate === filters.dueDate;

            return matchesTitle && matchesDueDate;
        });

        setFilteredReminders(filtered);
    };

    return (
        <div className='bg-gray-100 h-screen w-screen overflow-y-hidden flex space-x-2 align-middle p-5'>
            <Sidebar />
            <div className='flex flex-col w-full items-center gap-4'>

                <div className='bg-teal-600 py-[15px] px-[10px] rounded-lg shadow-md w-full flex gap-4 justify-center items-center align-middle'>
                    <input
                        type="text"
                        placeholder="Search Title"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    />
                    {/* <input
                        type="date"
                        placeholder="Search Due Date"
                        name="dueDate"
                        value={filters.dueDate}
                        onChange={handleFilterChange}
                        className="w-1/4 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                    /> */}
                </div>
                <div className='overflow-scroll overflow-x-hidden w-full flex flex-col items-center gap-3'>
                    {filteredReminders.length > 0 ? (
                        filteredReminders.map((reminder) => (
                            <HistoryReminderList key={reminder._id} reminder={reminder} />
                        ))
                    ) : (
                        <p>No reminders found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;
