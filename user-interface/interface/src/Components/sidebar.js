import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdDashboard, MdFormatListBulleted, MdSchedule, MdHistory } from "react-icons/md";
import useSignOut from "../Hooks/useSignOut";

const Sidebar = () => {
  const [sidenav, setSidenav] = useState(true);
  const location = useLocation(); // Get current location
  const {handleSignOut} = useSignOut()
  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, href: "/dashboard" },
    { name: "Reminders", icon: <MdFormatListBulleted />, href: "/reminders" },
    { name: "Scheduled Reminders", icon: <MdSchedule />, href: "/schedule-reminders" },
    { name: "History", icon: <MdHistory />, href: "/reminders-history" },
  ];

  return (
    <div className="h-full flex flex-row font-poppins">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidenav(!sidenav)}
        className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
      >
        <svg
          className="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white h-screen overflow-y-hidden shadow-md px-3 ${
          sidenav ? "block" : "hidden"
        } md:block w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <h1 className="font-bold text-4xl text-center md:hidden">
            D<span className="text-teal-600">.</span>
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-3xl text-center">
            PayRem<span className="text-teal-600">.</span>
          </h1>

          {/* User Profile */}
          <div id="profile" className="space-y-3">
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                Welcome, {localStorage.getItem("username")}
              </h2>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
              <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Menu */}
          <div className="flex flex-col align-middle space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`text-sm font-medium py-2 px-2 rounded-md transition duration-150 ease-in-out ${
                  location.pathname === item.href
                    ? "bg-teal-600 text-white text-base"
                    : "text-gray-700 hover:bg-teal-600 hover:text-white"
                }`}
              >
                <span className="inline-block w-6 h-6 mr-2">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="border rounded-md cursor-not-allowed py-[8px] w-full shadow-md text-white bg-teal-600">
              Generate Excel
            </button>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSignOut} className="border border-teal-600 py-[8px] w-full shadow-md rounded-md hover:text-white hover:bg-teal-500">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
