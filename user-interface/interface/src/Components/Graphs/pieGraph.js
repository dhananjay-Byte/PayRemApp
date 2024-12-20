import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ReminderDataPieGraph = ({ data }) => {
  const pieData = {
    labels: ["Total Reminders", "Pending Reminders", "Paid Reminders", "Upcoming Reminders"],
    datasets: [
      {
        label: "Reminders Overview",
        data: [
          data.totalReminders,
          data.pendingReminders,
          data.paidReminders,
          data.upcomingReminders,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Total
          "rgba(255, 159, 64, 0.6)", // Pending
          "rgba(153, 102, 255, 0.6)", // Paid
          "rgba(54, 162, 235, 0.6)", // Upcoming
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Reminder Summary Distribution",
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white p-6 shadow-md rounded">
      <h3 className="text-lg font-semibold mb-4">Reminder Distribution</h3>
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default ReminderDataPieGraph;
