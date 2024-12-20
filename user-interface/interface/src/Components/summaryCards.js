import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummaryData } from "../Redux/Slices/fetchSummaryData";
const SummaryCards = ({summary }) => {
//     const dispatch = useDispatch()
//     const {summaryData} = useSelector((state)=>state.summaryData)
//     const apiURL = process.env.REACT_APP_API_URL_BASE
//   const [summary, setSummary] = useState({
//     totalReminders: 0,
//     pendingReminders: 0,
//     paidReminders: 0,
//     upcomingReminders: 0,
//   });

//   useEffect(() => {
//     dispatch(fetchSummaryData(userId))
//     if(summaryData) setSummary(summaryData);
//   }, [userId]);

  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className=" bg-white border-l-4  border-teal-500 text-teal-600 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold">Total Reminders</h3>
        <p className="text-2xl text-black font-bold">{summary.totalReminders}</p>
      </div>
      <div className=" bg-white border-l-4 border-teal-500 text-teal-600 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold">Pending Reminders</h3>
        <p className="text-2xl text-black font-bold">{summary.pendingReminders}</p>
      </div>
      <div className="bg-white border-l-4  border-teal-500 text-teal-600 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold">Paid Reminders</h3>
        <p className="text-2xl text-black font-bold">{summary.paidReminders}</p>
      </div>
      <div className="bg-white border-l-4  border-teal-500 text-teal-600 p-4 shadow-md rounded">
        <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
        <p className="text-2xl text-black font-bold">{summary.upcomingReminders}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
