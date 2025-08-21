import Sidebar from "./dashboard/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useJournalMood } from "../context/JournalMoodContext.jsx";

function JournalPage() {

    const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
    const {journalData, addOrUpdateEntry, savedMessage} = useJournalMood();
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];

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
    });

    const journalEntry = journalData[dateKey]?.entry || "";
    const [tempEntry, setTempEntry] = useState(journalEntry);

    useEffect(() => {
        setTempEntry(journalEntry);
    }, [journalEntry]);

    return (
        <div className="flex h-screen">
            <div>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>
            <div className={`flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1`}>
                <header className="h-24 bg-slate-200 p-4 flex flex-col items-center justify-center gap-2">
                    <h1 className="font-mono font-extrabold text-4xl shadow-2xl">Your Personal Diary!</h1>
                    <p className="font-mono font-bold text-gray-700 text-xl">{headingDate}</p>
                </header>

                <main className="flex-1 p-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 gap-4">
                    <div className="w-full max-w-3xl bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-6 flex flex-col items-center gap-6">
                        <textarea placeholder="So, How was your Day??" className="w-full h-80 p-4 font-mono font-bold text-lg bg-slate-50 border-2 border-black rounded-xl 
                 shadow-[3px_3px_0px_black] resize-none focus:outline-none focus:ring-4 focus:ring-slate-400 
                 hover:bg-slate-100 transition" value={tempEntry} onChange={(e) => setTempEntry(e.target.value)}>                    
                 </textarea>
                    </div>
                    <div>
                        <button disabled={!tempEntry.trim()}
                        className={`bg-slate-800 text-white px-6 py-3 font-extrabold rounded-xl 
                       shadow-[3px_3px_0px_black] hover:bg-slate-700 hover:scale-105 
                       hover:shadow-[5px_5px_0px_black] transform transition duration-300 ${!tempEntry.trim() ? "bg-gray-400 cursor-not-allowed" : "" }`} 
                       onClick={() => addOrUpdateEntry(dateKey, tempEntry)}>Save</button>
                    </div>
                    
                    {savedMessage && <p className="text-green-500 mt-2">{savedMessage}</p>}
                    
                </main>
            </div>
        </div>
    );
}
export default JournalPage;