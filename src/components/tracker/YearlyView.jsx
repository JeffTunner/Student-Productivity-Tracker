import { useState, useEffect } from "react";
import TaskModal from "./TaskModal.jsx";
import { useNavigate } from "react-router-dom";
import { useDate, useTracker } from "../../context/TrackerContext.jsx";
import Breadcrumb from "./Breadcrumb.jsx";

function YearlyView() {

    const {currentYear, setCurrentYear, currentMonth, setCurrentMonth} = useDate();
    const {tasks} = useTracker();


    const [isWeekGridView, setIsWeekGridView] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const [completedWeeks, setCompletedWeeks] = useState(() => {
        const saved = localStorage.getItem("completedWeeks");
        if(saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return [];
    });
    useEffect(() => {
        localStorage.setItem("completedWeeks", JSON.stringify(completedWeeks));
    }, [completedWeeks]);

    const headingYear = new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
        year: "numeric"
    });

    function handleToday() {
        const today = new Date();
        const year = today.getFullYear();
        setCurrentYear(year);
        navigate(`/yearly/${year}`);
    }

    function handleNextYear() {
        let nextYear = currentYear;
        nextYear++;
        setCurrentYear(nextYear);
        navigate(`/yearly/${nextYear}`);
    }

    function handlePrevYear() {
        let prevYear = currentYear;
        prevYear--;
        setCurrentYear(prevYear);
        navigate(`/yearly/${prevYear}`);
    }

    function handleGridView() {
        setIsWeekGridView(!isWeekGridView);
    }

    function handleAddTasksForMonth(month) {
        setSelectedMonth(month);
        setIsAdding(true);
    }

    function handleToggleWeek(weekIndex) {
        const key = `${currentYear}-${weekIndex}`;
        setCompletedWeeks(prev => 
            prev.includes(key) ?
            prev.filter(w => w !== key) 
            : [...prev, key]
        );
    }

    const navigate = useNavigate();
    const handleMonthClick = (monthId) => {
        navigate(`/monthly/${currentYear}/${monthId}`);
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-black shadow-[6px_6px_0px_black] p-4 md:p-6 font-mono">
                <button className="font-extrabold text-base md:text-lg border-2 border-black rounded-full px-4 py-2 bg-white shadow-[2px_2px_0px_black] hover:bg-gray-700 hover:text-white hover:scale-105 transition" onClick={handleToday}>
                    Today
                </button>
                <div className="flex items-center gap-4 md:gap-6">
                    <button className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition" onClick={handlePrevYear}>←</button>
                    <h1 className="text-slate-800 font-extrabold text-lg md:text-xl text-center">{headingYear}</h1>
                    <button className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition" onClick={handleNextYear}>→</button>
                    <button className="font-extrabold text-base md:text-lg border-2 border-black rounded-full px-4 py-2 bg-white shadow-[2px_2px_0px_black] hover:bg-gray-700 hover:text-white hover:scale-105 transition" onClick={handleGridView}>{isWeekGridView ? 'Yearly' : '52 Weeks Grid'}</button>
                </div>
            </header>

            <div className="px-4 py-2">
                <Breadcrumb year={currentYear}/>
            </div>

            <main className="p-4">
                {isWeekGridView ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {Array.from({length: 52}, (_, week) => {
                            const key = `${currentYear}-${week}`;
                            return(
                            <div key={week} className={`border-4 border-black px-4 py-6 rounded-xl text-center font-extrabold bg-white shadow-[4px_4px_0px_black] hover:scale-105 hover:bg-gray-100 transition cursor-pointer ${completedWeeks.includes(key) ? 'line-through text-gray-400 bg-gray-200' : ''}`} onClick={() => handleToggleWeek(week)}>
                                Week {week + 1}
                            </div>
                            );
                        })}
                    </div>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({length: 12}, (_, i) => {
                        const monthName = new Date(currentYear, i).toLocaleDateString("en-US", {
                            month: "long"
                        });
                        const isCurrentMonth = 
                        currentYear === new Date().getFullYear() && i === new Date().getMonth();
                        const dateKey = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
                        return (
                        <div key={i} className={` flex flex-col justify-between items-center gap-4 border-4 border-black px-6 py-6 rounded-2xl text-center font-extrabold  shadow-[6px_6px_0px_black] hover:scale-105 text-black hover:bg-gray-100 transition cursor-pointer ${isCurrentMonth ? 'bg-gray-800 text-white hover:text-black' : ''}`}>
                           <span onClick={() => handleMonthClick(i)} className="text-lg md:text-xl underline decoration-2 decoration-black">{monthName} 
                           {tasks[dateKey]?.["monthly"]?.length > 0 && ( `(${tasks[dateKey]["monthly"].length})`)}</span>
                            <button className="mb-6 bg-slate-900 text-white px-4 py-2 rounded-xl border-4 border-black font-mono font-extrabold shadow-[4px_4px_0px_black] hover:bg-slate-700 hover:scale-105 transition"
                            onClick={() => handleAddTasksForMonth(i)}>
                                + Add Task
                            </button>
                        </div>
                        );
                    })}
                </div>
                )}
                <TaskModal 
                    isOpen={isAdding}
                    dateKey={selectedMonth !== null ? `${currentYear}-${String(selectedMonth + 1).padStart(2, "0")}` : ""}
                    onClose={() => setIsAdding(false)}
                    cardId="monthly"/>

            </main>
        </div>
    );
}
export default YearlyView;