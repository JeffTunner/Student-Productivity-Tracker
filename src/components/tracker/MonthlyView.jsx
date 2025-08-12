import { useState, useEffect } from "react";

function MonthlyView() {

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [tasksByDate, setTasksByDate] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem("tasksByDate");
        if(saved) {
            try {
                setTasksByDate(JSON.parse(saved));
            } catch {
                setTasksByDate({});
            }
        }
    },[]);

    useEffect(() => {
    setTasksByDate({
    "2025-08-14": ["Buy milk", "Finish project"],
    "2025-08-15": ["Go to gym"]
    });
    }, []);


    useEffect(() => {
        localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
    }, [tasksByDate]);

    const headingDate = new Date(currentYear, currentMonth).toLocaleDateString("en-US",{
        month: "long",
        year: "numeric"
    });

    const daysInMonth = new Date(currentYear, currentMonth+1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();
    let calenderDays = Array(startDay).fill(null);
    for(let i = 1; i<=daysInMonth; i++) {
        calenderDays.push(i);
    }

    function handleNextMonth() {
        let nextMonth = currentMonth;
        let nextYear = currentYear;
        if(nextMonth === 11) {
            nextMonth = 0;
            nextYear++;
        } else {
            nextMonth++;
        }
        setCurrentMonth(nextMonth);
        setCurrentYear(nextYear);
        console.log(nextMonth, nextYear);
    }

    function handlePrevMonth() {
        let prevMonth = currentMonth;
        let prevYear = currentYear;
        if(prevMonth === 0) {
            prevMonth = 11;
            prevYear--;
        } else {
            prevMonth--;
        }
        setCurrentMonth(prevMonth);
        setCurrentYear(prevYear);
        console.log(prevMonth, prevYear);
    }

    function getDateKey(year, monthIndex, day) {
        const month = String(monthIndex + 1).padStart(2, "0");
        const dayStr = String(day).padStart(2, "0");
        return `${year}-${month}-${dayStr}`;
    }

    function addTask(e) {
        const text = e.target.value;
    }

    return (
        <div>
            <header className="flex justify-center items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <button className="font-extrabold text-2xl border-2 border-black rounded-full p-2 hover:shadow-2xl hover:bg-gray-200" onClick={handlePrevMonth}>←</button>
                <h1 className="font-mono font-extrabold text-xl">{headingDate}</h1>
                <button className="font-extrabold text-2xl border-2 border-black rounded-full p-2 hover:shadow-2xl hover:bg-gray-200" onClick={handleNextMonth}>→</button>
            </header>

            <main>
                <div className="grid grid-cols-7 gap-2 font-bold text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                        <div key={dayName}>{dayName}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {calenderDays.map((day, index) => {
                        const dateKey = day ? getDateKey(currentYear, currentMonth, day) : null;
                        const tasks = day ? tasksByDate[dateKey] || [] : [];
                        return (
                            <div key={index} className="border p-4 text-center">
                                {day}
                                {tasks.length > 0 && (
                                    <ul>
                                        {tasks.map((task,i) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) 

                    })}    
                </div>    
            </main> 
        </div>
    );
}
export default MonthlyView;