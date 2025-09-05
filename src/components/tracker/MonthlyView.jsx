import { useState, useEffect } from "react";
import TaskModal from "./TaskModal.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb.jsx";
import { useDate, useTracker } from "../../context/TrackerContext.jsx";

function MonthlyView() {

    const {currentMonth, setCurrentMonth, currentYear, setCurrentYear} = useDate();
    const {tasks} = useTracker();

    const {monthId, year} = useParams();

    const [selectedDateKey, setSelectedDateKey] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="min-h-screen bg-white flex flex-col">
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-black shadow-[6px_6px_0px_black] p-4 md:p-6 font-mono">
                <button className="font-extrabold text-base md:text-lg border-2 border-black rounded-full px-4 py-2 bg-white shadow-[2px_2px_0px_black] hover:bg-gray-700 hover:text-white hover:scale-105 transition" onClick={handleToday}>
                    Today
                </button>
                <div className="flex items-center gap-4 md:gap-6">
                    <button className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition" onClick={handlePrevMonth}>←</button>
                    <h1 className="text-slate-800 font-extrabold text-lg md:text-xl text-center">{headingDate}</h1>
                    <button className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition" onClick={handleNextMonth}>→</button>
                    <button className="font-extrabold text-base md:text-lg border-2 border-black rounded-full px-4 py-2 bg-white shadow-[2px_2px_0px_black] hover:bg-gray-700 hover:text-white hover:scale-105 transition" onClick={handleWeekView}>
                        {isWeekView ? 'Month' : 'Week'}
                    </button>
                </div>
            </header>
            <div className="px-4 py-2">
                <Breadcrumb year={currentYear} month={currentMonth}/>
            </div>

            <main className="flex-1 p-4 md:p-6 font-mono">
                {isWeekView ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {weeks.map((week, index) => (
                            <div
                            key={index}
                            className="p-4 border-4 border-black rounded-xl bg-white shadow-[4px_4px_0px_black] cursor-pointer hover:bg-gray-100 hover:scale-105 transition"
                            onClick={() => console.log("Selected week:", week)}
                            >
                            <p className="font-extrabold text-slate-800 text-center text-lg">
                                {formatDate(week.start)} – {formatDate(week.end)}
                            </p>
                            </div>
                         ))}
                    </div>
                ) : ( 
                <>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-7 gap-2 text-center font-extrabold text-slate-800">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                        <div className="p-2 border-b-4 border-black bg-gray-300 rounded-t-md shadow-[2px_2px_0px_black]"
                         key={dayName}>{dayName}</div>
                    ))}
                    </div>

                <div className="grid grid-cols-7 gap-2">
                    {calenderDays.map((day, index) => {
                        const dateKey = day ? getDateKey(currentYear, currentMonth, day) : null;
                        const count = day ? (tasks[dateKey]?.["default"]?.length || 0) : 0;
                        return (
                            <div key={index} className={`h-20 flex flex-col justify-center items-center border-4 border-black bg-white shadow-[3px_3px_0px_black] cursor-pointer transition ${dateKey === todayKey ? "bg-gray-800 text-white scale-105" : "hover:bg-gray-100"}`} onClick={() => {
                                if(day) {
                                    const dateKey = getDateKey(currentYear, currentMonth, day);
                                    setSelectedDateKey(dateKey);
                                    setIsModalOpen(true);
                                }
                            }}>
                            <span className="font-extrabold text-lg">{day || ""}</span>
                                 {count > 0 && (
                                <span className="text-xs font-bold text-slate-600 mt-1">
                                    {count} task{count > 1 ? "s" : ""}
                                </span>
                            
                                   /* <ul>
                                        {tasks.map((task,i) => (
                                            <li key={i}>{task}</li>
                                        ))}
                                    </ul> */
                                 )}
                                
                            </div>
                        ); 

                    })}    
                </div>
                </div>
                </>
                )}

                    
            </main> 
            <TaskModal isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            dateKey={selectedDateKey} />
        </div>
    );
}
export default MonthlyView;