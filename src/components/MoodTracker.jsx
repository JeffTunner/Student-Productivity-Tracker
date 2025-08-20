import Sidebar from "./dashboard/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useJournalMood } from "../context/JournalMoodContext.jsx";

function MoodTracker() {

    const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
    const {journalData, setMood, savedMessage} = useJournalMood();
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
    })

    const moodEmojis = ["😭", "😢", "☹️", "😕", "😐", "🙂", "😊", "😃", "😄", "🤩"];
    const moodLabels = ["Terrible", "Very Sad", "Sad", "Meh", "Okay", "Fine", "Good", "Happy", "Great", "Amazing"];

    const todayMood = journalData[dateKey]?.mood || 5;
    const [tempMood, setTempMood] = useState(todayMood);

    useEffect(() => {
        setTempMood(todayMood);
    }, [todayMood]);

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

                <main className="flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-slate-100 to-slate-200 flex-1">
                    <div className="w-full max-w-xl bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-8 flex flex-col items-center gap-6">
                        <p className="font-mono font-bold text-lg">Adjust according to your mood...</p>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-7xl">{moodEmojis[tempMood-1]}</span>
                            <span className="font-mono font-bold text-xl">{moodLabels[tempMood-1]}</span>
                        </div>
                                    
                        <input type="range" 
                            min="1" max="10" 
                            className="w-80 accent-slate-800 cursor-pointer"
                            value={tempMood} 
                            onChange={(e) => setTempMood(e.target.value)}/>

                        <button onClick={(e) => setMood(dateKey, tempMood)}
                        disabled={tempMood===0}
                        className={`bg-slate-800 text-white px-6 py-3 font-extrabold rounded-xl 
                                       shadow-[3px_3px_0px_black] hover:bg-slate-700 hover:scale-105 
                                       hover:shadow-[5px_5px_0px_black] transform transition duration-300 ${tempMood===0} ? "bg-gray-400 cursor-not-allowed" : ""`}>
                            Save Mood
                        </button>

                        {savedMessage && <p className="text-green-500 mt-2">{savedMessage}</p>}
                  
                    </div>

                </main>
            </div>
        </div>
    );
}
export default MoodTracker;