import Sidebar from "./dashboard/Sidebar.jsx";
import { useState, useEffect } from "react";

function MoodTracker() {

    const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];

    const [mood, setMood] = useState(5);

    useEffect(() => {
    const savedMood = localStorage.getItem('mood' + dateKey);
    if(savedMood) {
        try {
            setMood(JSON.parse(savedMood));
        } catch (e) {
            setMood(5);
        }
    }
}, [dateKey]);

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

    function handleSave() {
        localStorage.setItem('mood' + dateKey, JSON.stringify(mood));
    }

    const moodEmojis = ["😭", "😢", "☹️", "😕", "😐", "🙂", "😊", "😃", "😄", "🤩"];
    const moodLabels = ["Terrible", "Very Sad", "Sad", "Meh", "Okay", "Fine", "Good", "Happy", "Great", "Amazing"];

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
                            <span className="text-7xl">{moodEmojis[mood-1]}</span>
                            <span className="font-mono font-bold text-xl">{moodLabels[mood-1]}</span>
                        </div>
                                    
                        <input type="range" 
                            min="1" max="10" 
                            className="w-80 accent-slate-800 cursor-pointer"
                            value={mood} 
                            onChange={(e) => setMood(parseInt(e.target.value))}/>

                        <button onClick={handleSave}
                        className="bg-slate-800 text-white px-6 py-3 font-extrabold rounded-xl 
                                       shadow-[3px_3px_0px_black] hover:bg-slate-700 hover:scale-105 
                                       hover:shadow-[5px_5px_0px_black] transform transition duration-300">
                            Save Mood
                        </button>
                  
                    </div>

                </main>
            </div>
        </div>
    );
}
export default MoodTracker;