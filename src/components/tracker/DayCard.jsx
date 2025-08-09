import { useState } from "react";

function DayCard({date, isToday}) {

    const[tasks, setTasks] = useState([]);

    function handleFirstTask() {
        setTasks(tasks);
    }
    
    return(
        <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
            <header className={`text-center px-2 py-2 mb-4 ${isToday ? "bg-slate-400 rounded-full" : ""}`}>
                <div className="font-bold">{date.toLocaleDateString("en-US", {weekday: "short"})}</div>
                <div>{date.getDate()}</div>
            </header>

            { 
                tasks.length === 0 && (
                    <button className="bg-slate-800 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300"
                    onClick={handleFirstTask}>
                        + Add tasks
                    </button>
                    
                )
            }

            <main>
                
            </main>
        </div>
    );
}
export default DayCard;