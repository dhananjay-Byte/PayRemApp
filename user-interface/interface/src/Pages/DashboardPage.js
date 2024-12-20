import React,{useEffect,useState} from 'react'
import Sidebar from '../Components/sidebar';
import SummaryCards from '../Components/summaryCards';
import MonthlyRemindersGraph from '../Components/Graphs/barGraph';
import { fetchSummaryData } from '../Redux/Slices/fetchSummaryData';
import { useDispatch, useSelector } from "react-redux";
import ReminderDataPieGraph from '../Components/Graphs/pieGraph';
import useSignOut from '../Hooks/useSignOut';

function DashboardPage() {
    const id = localStorage.getItem('userId')
    const email = localStorage.getItem('email');
    const {handleSignOut} = useSignOut()
    const dispatch = useDispatch()
    const {Data} = useSelector((state)=>state.summaryData)
    const [summary, setSummary] = useState({
        totalReminders: 0,
        pendingReminders: 0,
        paidReminders: 0,       
        upcomingReminders: 0,
      });

      useEffect(() => {
        if(!Data){
            dispatch(fetchSummaryData(id))
        }
        }, []);

        useEffect(()=>{
            if(Data) setSummary(Data);
        },[Data])
    
    return (
        <div className='bg-gray-100 h-screen gap-3 w-screen overflow-hidden flex align-middle p-5'>
            <Sidebar />

            <div className='w-full flex flex-col gap-4  '>
                <div className='w-full flex justify-between items-center bg-teal-600 h-max p-4 shadow-md rounded-md mb-4'>
                    <p className='text-2xl text-white'>Dashboard</p>
                    <div className='flex flex-col gap-2'>
                    <p className='text-white'>
                        {email}
                    </p>
                    <button onClick={handleSignOut} className='border border-teal-500 bg-white p-2 text-sm rounded-md'>SignOut</button>
                    </div>
                  
                </div>
                <SummaryCards summary={summary}/>
                <div className='flex h-[60%] space-x-2 mt-3'>
                <div className='w-1/2'>
                <MonthlyRemindersGraph  userId={id}/>
                </div>
                <div className='w-1/2'>
                <ReminderDataPieGraph data={summary}/>
                </div>
                </div>
               
               
            </div>

        </div>
    )
}

export default DashboardPage