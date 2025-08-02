import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
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
                <span className="h-48 bg-slate-200 p-4"><Topbar username={"Abhinav Kaushik"}/></span>
                <span className="bg-slate-800 flex-1 p-4">Cards</span>
            </div>
        </div>
    );
}
export default DashboardLayout;