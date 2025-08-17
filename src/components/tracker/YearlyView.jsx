import { useState, useEffect } from "react";
import TaskModal from "./TaskModal.jsx";
import { useNavigate } from "react-router-dom";
import { useDate } from "../../context/TrackerContext.jsx";

function YearlyView() {

    const {currentYear, setCurrentYear, currentMonth, setCurrentMonth} = useDate();



    const [isWeekGridView, setIsWeekGridView] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [tasksByMonth, setTasksByMonth] = useState(() => {
        const saved = localStorage.getItem("tasksByMonth");
        if(saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return {};
            }
        }
        return {};
    }, []);

    useEffect(() => {
        localStorage.setItem("tasksByMonth", JSON.stringify(tasksByMonth));
    }, [tasksByMonth]);

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

    function handleSaveTasks(updatedTasks) {
        const dateKey = `${currentYear}-${String(selectedMonth + 1).padStart(2, "0")}`;
        setTasksByMonth(prev => ({
            ...prev,
            [dateKey]: updatedTasks
        }));
    }

    function handleToggleWeek(weekIndex) {
        setCompletedWeeks(prev => 
            prev.includes(weekIndex) ?
            prev.filter(w => w !== weekIndex) 
            : [...prev, weekIndex]
        );
    }

    const navigate = useNavigate();
    const handleMonthClick = (monthId) => {
        navigate(`/monthly/${currentYear}/${monthId}`);
    }

    return (
        <div>
            <header className="flex justify-center items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <button className="font-bold text-xl border-2 border-black rounded-full p-3 hover:bg-gray-500 hover:text-white" onClick={handleToday}>
                    Today
                </button>
                <button className="font-extrabold text-2xl border-2 border-black rounded-full p-2 hover:shadow-2xl hover:bg-gray-200" onClick={handlePrevYear}>←</button>
                <h1 className="font-mono font-extrabold text-xl">{headingYear}</h1>
                <button className="font-extrabold text-2xl border-2 border-black rounded-full p-2 hover:shadow-2xl hover:bg-gray-200" onClick={handleNextYear}>→</button>
                <button className="font-bold text-xl border-2 border-black rounded-full p-3 hover:bg-gray-500 hover:text-white" onClick={handleGridView}>{isWeekGridView ? 'Yearly' : '52 Weeks Grid'}</button>
            </header>

            <main>
                {isWeekGridView ? (
                    <div className="grid grid-cols-4 gap-2 p-4">
                        {Array.from({length: 52}, (_, week) => (
                            <div key={week} className={`border p-4 rounded-lg  text-center font-bold hover:bg-gray-100 hover:shadow-lg transition cursor-pointer ${completedWeeks.includes(week) ? 'line-through' : ''}`} onClick={() => handleToggleWeek(week)}>
                                Week {week + 1}
                            </div>
                        ))}
                    </div>
                ) : (
                <div className="grid grid-cols-3 gap-4 p-4 h-svh">
                    {Array.from({length: 12}, (_, i) => {
                        const monthName = new Date(currentYear, i).toLocaleDateString("en-US", {
                            month: "long"
                        });
                        const isCurrentMonth = 
                        currentYear === new Date().getFullYear() && i === new Date().getMonth();
                        const dateKey = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
                        return (
                        <div key={i} className={` flex flex-col justify-center items-center gap-6 border p-4 rounded-lg text-center font-bold hover:bg-gray-100 hover:shadow-lg transition cursor-pointer ${isCurrentMonth ? 'bg-gray-500' : ''}`}>
                           <span onClick={() => handleMonthClick(i)}>{monthName}
                           {tasksByMonth[dateKey]?.length > 0 && ( `(${tasksByMonth[dateKey].length})`)}</span>
                           {isAdding && selectedMonth === i ? (
                            <TaskModal 
                            isOpen={isAdding}
                            dateKey={selectedMonth !== null ? `${currentYear}-${String(selectedMonth + 1).padStart(2, "0")}` : ""}
                            onClose={() => setIsAdding(false)}
                            tasks={selectedMonth !== null ? (tasksByMonth[`${currentYear}-${String(selectedMonth + 1).padStart(2, "0")}`] || []) : [] }
                            onSaveTasks={handleSaveTasks}/>
                           ) : (
                            <button className="bg-slate-800 w-48 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300"
                            onClick={() => handleAddTasksForMonth(i)}>
                                + Add Task
                            </button>
                           )} 

                        </div>
                        )
                    })}
                </div>
                )}

            </main>
        </div>
    );
}
export default YearlyView;