import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Cookie from 'js-cookie'
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyRemindersGraph = ({ userId }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL_BASE

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/v1/user/reminder/monthly?userId=${userId}`,{
           headers: {
                           Authorization: `Bearer ${Cookie.get('token')}`
                       }
          });
        setMonthlyData(response.data);
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      }
    };

    fetchMonthlyData();
  }, [userId]);

  // Prepare data for Bar Graph
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const remindersSentData = Array(12).fill(0); // Initialize with 0 for all months
  monthlyData.forEach((item) => {
    remindersSentData[item._id - 1] = item.remindersSent; // Map counts to correct month
  });

  const barData = {
    labels,
    datasets: [
      {
        label: "Reminders Sent",
        data: remindersSentData,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full bg-white p-6 shadow-md rounded">
      <h3 className="text-lg font-semibold mb-4">Monthly Reminders Sent</h3>
      <Bar data={barData} options={{ responsive: true }} />
    </div>
  );
};

export default MonthlyRemindersGraph;
