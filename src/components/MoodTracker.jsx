import Sidebar from "./dashboard/Sidebar.jsx";
import { useState, useEffect } from "react";

function MoodTracker() {

    const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
    const today = new Date();

    useEffect(() => {
    const handleResize = () => {
        if(window.innerWidth >= 768) {
            setSidebarOpen(true);
        } else {
            setSidebarOpen(false);
        }
    };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[]);

    const headingDate = today.toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })

    return (
        <div className="flex h-screen">
            <div>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>

            <div className={`flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1`}>
                <header className="h-24 bg-slate-200 p-4 flex flex-col items-center justify-center gap-2">
                    <h1 className="font-mono font-extrabold text-4xl shadow-2xl">How are you feeling Today?</h1>
                    <p className="font-mono font-bold text-gray-700 text-xl">{headingDate}</p>
                </header>

                <main className="flex flex-col items-center justify-center">
                   <label className="flex flex-col justify-center gap-4">Adjust according to your mood...<input type="range" /></label> 
                </main>
            </div>
        </div>
    );
}
export default MoodTracker;