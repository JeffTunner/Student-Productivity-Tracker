import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Hamburger from '../../assets/hamburger-menu-icon.png';

function Sidebar({ isOpen, setIsOpen}) {

    const location = useLocation();

    const [showTrackers, setShowTrackers] = useState("true");

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
    <>
    
        <button className='fixed top-4 left-4 z-50' onClick={() => {toggleSidebar()}}><img src={Hamburger} alt="hamburger-menu" className="w-14 h-auto rounded-xl hover:invert transition"/></button>

        <div className={`fixed top-0 left-0 bg-white border-black border-r-4 w-64 max-w-[80%] flex flex-col h-full transition-transform duration-500 ease-in-out z-40 shadow-[8px_0px_0px_black] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
            <div className='flex-1 overflow-y-auto p-4'>
                <ul className="space-y-4 mt-16 font-mono font-bold text-gray-800">

                <li className={`p-3 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 cursor-pointer transition 
            ${location.pathname === '/dashboard' ? ' bg-gray-200' : 'bg-white'}`}>
                    <Link to="/dashboard">Home</Link>
                </li>

                <li className={`p-3 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 cursor-pointer transition ${location.pathname === "/dashboard/tracker" ? "bg-gray-200" : "bg-white"}`} onClick={() => {setShowTrackers(!showTrackers)}} >
                    <span>Trackers</span>
                    { showTrackers && (
                    <ul className="ml-4 mt-3 space-y-2 text-sm ">
                        <li className="p-2 rounded border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-200 cursor-pointer"><Link to="/dashboard/tracker/daily" className={`${location.pathname === "/dashboard/tracker/daily" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Daily</Link></li>
                        <li className="p-2 rounded border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-200 cursor-pointer"><Link to="/dashboard/tracker/weekly" className={`${location.pathname === "/dashboard/tracker/weekly" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Weekly</Link></li>
                        <li className="p-2 rounded border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-200 cursor-pointer"><Link to="/dashboard/tracker/monthly" className={`${location.pathname === "/dashboard/tracker/monthly" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Monthly</Link></li>
                        <li className="p-2 rounded border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-200 cursor-pointer"><Link to="/dashboard/tracker/yearly" className={`${location.pathname === "/dashboard/tracker/yearly" ? "font-bold text-gray-50" : "text-gray-700 hover:text-gray-50"}`}>Yearly</Link></li>
                    </ul>
                    )}                   
                </li>

                <li className={`p-3 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 cursor-pointer transition 
            ${location.pathname === '/dashboard/journal' ? ' bg-gray-200' : 'bg-white'}`}>
                    <Link to="/dashboard/journal">Journal</Link>
                </li>

                <li className={`p-3 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 cursor-pointer transition 
            ${location.pathname === '/dashboard/mood' ? ' bg-gray-200' : 'bg-white'}`}>
                    <Link to="/dashboard/mood">Mood</Link>
                </li>

                <li className={`p-3 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 cursor-pointer transition 
            ${location.pathname === '/dashboard/ai' ? ' bg-gray-200' : 'bg-white'}`}>
                    <Link to="/dashboard/ai">AI Assistant</Link>
                </li>

               { /*<li className={`p-3 rounded-lg border-2 border-black shadow-[3px_3px_0px_black] hover:bg-gray-100 cursor-pointer transition 
            ${location.pathname === '/dashboard/settings' ? ' bg-gray-200' : 'bg-white'}`}>
                    <Link to="/dashboard/settings">Settings</Link>
                </li>*/}

            </ul>
            </div>
        <div className="p-4 border-t-4 border-black bg-white">
          <span className="block text-center font-extrabold text-red-600 underline hover:cursor-pointer">
            <Link to="/logout">Logout</Link>
          </span>
        </div>
        </div>
    </>

    );
}
export default Sidebar;