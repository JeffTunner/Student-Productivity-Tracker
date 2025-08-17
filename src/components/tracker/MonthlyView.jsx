import { useState, useEffect } from "react";
import TaskModal from "./TaskModal.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb.jsx";
import { useDate } from "../../context/TrackerContext.jsx";

function MonthlyView() {

    const {currentMonth, setCurrentMonth, currentYear, setCurrentYear} = useDate();

    const {monthId, year} = useParams();

    const [selectedDateKey, setSelectedDateKey] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasksByDate, setTasksByDate] = useState(() => {
        const saved = localStorage.getItem("tasksByDate");
        if(saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {};
            }
        }
        return {};
    });

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
        localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
    }, [tasksByDate]);

    useEffect(() => {
    if (monthId !== undefined && year !== undefined) {
        setCurrentMonth(parseInt(monthId, 10));
        setCurrentYear(parseInt(year, 10));
    }
    }, [monthId, year]);


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

    const navigate = useNavigate();

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
        navigate(`/monthly/${nextYear}/${nextMonth}`);
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
        navigate(`/monthly/${prevYear}/${prevMonth}`);
    }

    function getDateKey(year, monthIndex, day) {
        const month = String(monthIndex + 1).padStart(2, "0");
        const dayStr = String(day).padStart(2, "0");
        return `${year}-${month}-${dayStr}`;
    }

    function handleToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        setCurrentMonth(month);
        setCurrentYear(year);
        navigate(`/monthly/${year}/${month}`);
    }

    const today = new Date();
    const todayKey = getDateKey(today.getFullYear(), today.getMonth(), today.getDate());

    const [isWeekView, setIsWeekView] = useState(false);

    function handleWeekView() {
        setIsWeekView(prev => !prev);
    }

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth+1, 0);
    const startOfCalender = new Date(firstDayOfMonth);
    startOfCalender.setDate(startOfCalender.getDate() - startOfCalender.getDay());
    const endOfCalender = new Date(lastDayOfMonth);
    endOfCalender.setDate(endOfCalender.getDate() + (6 - endOfCalender.getDay()));

    let weeks = [];
    const current = new Date(startOfCalender);

    while(current <= endOfCalender) {
        let weekStart = new Date(current);
        let weekEnd = new Date(current);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        weeks.push({
            start: new Date(weekStart),
            end: new Date(weekEnd)
        });
        current.setDate(current.getDate() + 7);
    }

    function formatDate(date) {
        return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    }

    return (
        <div>
            <header className="flex justify-center items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <button className="font-bold text-xl border-2 border-black rounded-full p-3 hover:bg-gray-500 hover:text-white" onClick={handleToday}>
                    Today
                </button>
                <button className="font-extrabold text-2xl border-2 border-black rounded-full p-2 hover:shadow-2xl hover:bg-gray-200" onClick={handlePrevMonth}>←</button>
                <h1 className="font-mono font-extrabold text-xl">{headingDate}</h1>
                <button className="font-extrabold text-2xl border-2 border-black rounded-full p-2 hover:shadow-2xl hover:bg-gray-200" onClick={handleNextMonth}>→</button>
                <button className="font-bold text-xl border-2 border-black rounded-full p-3 hover:bg-gray-500 hover:text-white" onClick={handleWeekView}>
                    {isWeekView ? 'Month' : 'Week'}
                </button>
            </header>
            <div>
                <Breadcrumb year={currentYear} month={currentMonth}/>
            </div>

            <main>
                {isWeekView ? (
                    <div className="flex flex-wrap gap-3">
                        {weeks.map((week, index) => (
                            <div
                            key={index}
                            className="p-3 border rounded-lg cursor-pointer bg-white hover:bg-gray-100"
                            onClick={() => console.log("Selected week:", week)}
                            >
                            {formatDate(week.start)} – {formatDate(week.end)}
                            </div>
                         ))}
                    </div>
                ) : ( 
                <>
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
                            <div key={index} className={`border p-4 text-center cursor-pointer ${dateKey === todayKey ? 'bg-slate-500 text-white rounded-full' : ''}`} onClick={() => {
                                if(day) {
                                    const dateKey = getDateKey(currentYear, currentMonth, day);
                                    setSelectedDateKey(dateKey);
                                    setIsModalOpen(true);
                                }
                            }}>
                                {day}
                                {tasks.length > 0 && ( `(${tasks.length})`
                                   /* <ul>
                                        {tasks.map((task,i) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul> */
                                )}
                            </div>
                        ) 

                    })}    
                </div>
                </>
                )}

                    
            </main> 
            <TaskModal isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            dateKey={selectedDateKey} 
            tasks={tasksByDate[selectedDateKey] || []}
            onSaveTasks={(newTasks) => {
                if(!selectedDateKey) return;
                setTasksByDate((prev) => {
                    const updated = {...prev};
                    if(newTasks.length === 0) {
                        delete updated[selectedDateKey];
                    } else {
                        updated[selectedDateKey] = newTasks;
                    }
                    return updated;
                });
            }}/>
        </div>
    );
}
export default MonthlyView;