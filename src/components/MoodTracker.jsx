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
        <div className="flex h-screen p-4">
            <div>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen}/>
            </div>

            <div className={`flex flex-col transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1`}>
                <header className="bg-white border-4 border-black rounded-b-3xl shadow-[6px_6px_0px_#000] px-4 py-3 md:px-8 md:py-5 flex flex-col items-center gap-2">
                    <h1 className="font-mono font-extrabold text-3xl md:text-5xl text-center">How are you feeling Today?</h1>
                    <p className="font-mono font-semibold text-gray-700 text-lg md:text-2xl">{headingDate}</p>
                </header>

                <main className="relative flex-1 p-4 md:p-8 flex flex-col items-center justify-start overflow-y-auto">
                    <div
                    aria-hidden
                    className="pointer-events-none select-none absolute inset-0
                    [background:radial-gradient(rgba(0,0,0,0.35)_1px,transparent_1.5px)]
                    [background-size:10px_10px] opacity-10"
                    />
                    <div className="relative z-10 w-full max-w-xl bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-6 md:p-10 flex flex-col items-center gap-6">
                        <p className="font-mono font-bold text-lg text-center">Adjust according to your mood...</p>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-6xl md:text-7xl">{moodEmojis[tempMood-1]}</span>
                            <span className="font-mono font-bold text-lg md:text-xl">{moodLabels[tempMood-1]}</span>
                        </div>
                                    
                        <input type="range" 
                            min="1" max="10" 
                            className="w-64 md:w-80 accent-slate-800 cursor-pointer"
                            value={tempMood} 
                            onChange={(e) => setTempMood(e.target.value)}/>

                        <button onClick={(e) => setMood(dateKey, tempMood)}
                        disabled={tempMood===0}
                                      className={`px-6 py-3 font-extrabold rounded-xl shadow-[3px_3px_0px_black] transform transition duration-300
                ${
                  tempMood === 0
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 hover:shadow-[5px_5px_0px_black]"
                }`}>
                            Save Mood
                        </button>

                        {savedMessage && <p className="text-green-500 font-mono font-semibold mt-2">{savedMessage}</p>}
                  
                    </div>

                </main>
            </div>
        </div>
    );
}
export default MoodTracker;