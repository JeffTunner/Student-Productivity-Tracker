import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ isOpen, setIsOpen}) {

    const location = useLocation();

    const [showTrackers, setShowTrackers] = useState("true");

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
    <>
    
        <button className='fixed top-4 left-4 z-50' onClick={() => {toggleSidebar()}}><img src="/src/assets/hamburger-menu-icon.png" alt="hamburger-menu" className='w-14 mb-4 h-auto rounded-xl backdrop-invert-0 hover:invert'/></button>

        <div className={`fixed top-0 left-0 bg-white border-gray-900 shadow-2xl border-r-2 w-64 p-4 flex flex-col h-full transition-transform duration-500 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
            <ul className="space-y-4 mt-16 font-semibold">

                <li className="bg-gray-300 p-3 rounded-xl font-mono shadow-md hover:bg-gray-200 hover:cursor-pointer hover:shadow-xl">
                    <Link to="/dashboard" className={`${location.pathname === "/dashboard" ? "font-bold text-gray-50" : "text-gray-700"}`}>Home</Link>
                </li>

                <li className="bg-gray-300 text-gray-700 p-3 rounded-xl font-mono shadow-md hover:bg-gray-200 hover:cursor-pointer hover:shadow-xl" onClick={() => {setShowTrackers(!showTrackers)}} >
                    <span className={`${location.pathname === "/tracker" ? "font-bold text-gray-50" : "text-gray-700"}`}>Trackers</span>
                    { showTrackers && (
                    <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-900">
                        <li className="text-sm border-2 border-black rounded-lg hover:bg-slate-500 hover:text-gray-50 hover:underline p-1"><Link to="/dashboard/tracker/daily" className={`${location.pathname === "/dashboard/tracker/daily" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Daily</Link></li>
                        <li className="text-sm border-2 border-black rounded-lg hover:bg-slate-500 hover:text-gray-50 hover:underline p-1"><Link to="/dashboard/tracker/weekly" className={`${location.pathname === "/dashboard/tracker/weekly" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Weekly</Link></li>
                        <li className="text-sm border-2 border-black rounded-lg hover:bg-slate-500 hover:text-gray-50 hover:underline p-1"><Link to="/dashboard/tracker/monthly" className={`${location.pathname === "/dashboard/tracker/monthly" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Monthly</Link></li>
                        <li className="text-sm border-2 border-black rounded-lg hover:bg-slate-500 hover:text-gray-50 hover:underline p-1"><Link to="/dashboard/tracker/yearly" className={`${location.pathname === "/dashboard/tracker/yearly" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Yearly</Link></li>
                    </ul>
                    )}                   
                </li>

                <li className="bg-gray-300 p-3 rounded-xl font-mono shadow-md hover:bg-gray-200 hover:cursor-pointer hover:shadow-xl">
                    <Link to="/journal" className={`${location.pathname === "/journal" ? "font-bold text-gray-50" : "text-gray-700"}`}>Journal</Link>
                </li>

                <li className="bg-gray-300 p-3 rounded-xl font-mono shadow-md hover:bg-gray-200 hover:cursor-pointer hover:shadow-xl">
                    <Link to="/mood" className={`${location.pathname === "/mood" ? "font-bold text-gray-50" : "text-gray-700"}`}>Mood</Link>
                </li>

                <li className="bg-gray-300 p-3 rounded-xl font-mono shadow-md hover:bg-gray-200 hover:cursor-pointer hover:shadow-xl">
                    <Link to="/ai" className={`${location.pathname === "/ai" ? "font-bold text-gray-50" : "text-gray-700"}`}>AI Assistant</Link>
                </li>

                <li className="bg-gray-300 p-3 rounded-xl font-mono shadow-md hover:bg-gray-200 hover:cursor-pointer hover:shadow-xl">
                    <Link to="/settings" className={`${location.pathname === "/settings" ? "font-bold text-gray-50" : "text-gray-700"}`}>Settings</Link>
                </li>

            </ul>
            <span className="mt-auto pt-4 text-center font-semibold text-red-600 hover:underline hover:cursor-pointer">
                <Link to="/logout">Logout</Link>
            </span>
        </div>
    </>

    );
}
export default Sidebar;