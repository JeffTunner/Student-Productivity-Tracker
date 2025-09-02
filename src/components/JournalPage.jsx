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
        <div className="flex h-screen p-4">
            <div>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>
            <div className={`flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1`}>
                <header className="bg-white border-4 border-black rounded-b-3xl shadow-[6px_6px_0px_#000] px-4 py-3 md:px-8 md:py-5 flex flex-col items-center gap-2">
                    <h1 className="font-mono font-extrabold text-3xl md:text-5xl text-center">Your Personal Diary!</h1>
                    <p className="font-mono font-semibold text-gray-700 text-lg md:text-2xl">{headingDate}</p>
                </header>

                <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-start overflow-y-auto gap-6">
                    <div className="w-full max-w-3xl bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-4 md:p-6 flex flex-col items-center gap-6">
                        <textarea placeholder="So, How was your Day??" className="w-full h-64 md:h-80 p-4 font-mono font-bold text-base md:text-lg bg-slate-50 border-2 border-black rounded-xl 
                shadow-[3px_3px_0px_black] resize-none focus:outline-none focus:ring-4 focus:ring-slate-400 
                hover:bg-slate-100 transition" value={tempEntry} onChange={(e) => setTempEntry(e.target.value)}>                    
                 </textarea>
                    </div>
                    <div>
                        <button disabled={!tempEntry.trim()}
                                      className={`px-6 py-3 font-extrabold rounded-xl shadow-[3px_3px_0px_black] transform transition duration-300
                ${
                  tempEntry.trim()
                    ? "bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 hover:shadow-[5px_5px_0px_black]"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                       onClick={() => addOrUpdateEntry(dateKey, tempEntry)}>Save</button>
                    </div>
                    
                    {savedMessage && <p className="text-green-500 font-mono font-semibold">{savedMessage}</p>}
                    
                </main>
            </div>
        </div>
    );
}
export default JournalPage;