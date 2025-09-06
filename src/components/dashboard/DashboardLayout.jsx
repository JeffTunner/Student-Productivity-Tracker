import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import TaskBoard from "./TaskBoard.jsx";
import React, {useState, useEffect} from "react";
function DashboardLayout() {

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
        <div className="flex h-screen">
            <div>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>
            <div className={`flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1`}>
                <header className="h-48 p-4"><Topbar/></header>
                <main className=" flex-1 p-4"><TaskBoard /></main>
            </div>
        </div>
    );
}
export default DashboardLayout;