import { useState, useEffect } from "react";
import DayCard from "./DayCard.jsx";

function WeeklyView({username}) {

    const weeklycards = {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
    };
    const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const [week, setWeek] = useState(() => {
        const saved = localStorage.getItem("weeklyTasks");
        try{
            return saved ? JSON.parse(saved) : weeklycards;
        } catch (e) {
        console.log("Couldnt load from storage", e);
        return weeklycards;
        }
    });

    useEffect(() => {
        localStorage.setItem("weeklyTasks", JSON.stringify(week));
    },[week]);

    const hours = new Date().getHours();
    const name = username || "user";
    let greeting;

    if(hours < 12) {
        greeting = "Good Morning";
    } else if(hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const headingDate = new Date().toLocaleDateString("en-US",{
        month: "long",
        year: "numeric"
    });

    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formattedDate = (date) => 
        date.toLocaleDateString("en-US", {month: "short", day: "numeric"});

    const weekRange = `${formattedDate(monday)} - ${formattedDate(sunday)}`;

    function handleUpdateWeek(dayKey, updatedData) {
        setWeek(prev => ({
            ...prev,
            [dayKey]: updatedData
        }));
    }


    return (
        <div>
            <header className="flex flex-col items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <h1>{greeting}, {name}</h1>
                <h2>{headingDate} | Week: {weekRange}</h2>
            </header>
            <main className="grid grid-cols-7 border border-black min-h-screen">
                {
                    dayNames.map((dayName, i) => {
                        const day = new Date(monday);
                        day.setDate(monday.getDate() + i);
                        
                    return (
                       <DayCard key={dayName} date={day} tasks={week[dayName]} isToday={today.toDateString() === day.toDateString()} onUpdate={(updatedTasks) => handleUpdateWeek(dayName, updatedTasks)}/>
                    );
                    })
                }
            </main> 
        </div>
    );
}
export default WeeklyView;