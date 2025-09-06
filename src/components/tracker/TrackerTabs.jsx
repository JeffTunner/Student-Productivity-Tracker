import Sidebar from "../dashboard/Sidebar.jsx";
import Greeting from "./Greeting.jsx";
import TabBar from "./Tabbar.jsx";
import React, {useState, useEffect} from "react";

function TrackerTabs() {

    const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);

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

    return (
        <div>
            <div>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>

            <div className={`flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1`}>
                <header className="h-48 p-4">
                    <Greeting/>
                </header>
                <main className="flex-1 p-4">
                    <TabBar />
                </main>
            </div>
        </div>
    );
}
export default TrackerTabs;