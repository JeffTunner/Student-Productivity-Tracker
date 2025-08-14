import { useState } from "react";

function YearlyView() {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    const headingYear = new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
        year: "numeric"
    });

    function handleToday() {
        const today = new Date();
        setCurrentYear(today.getFullYear());
    }

    function handleNextYear() {
        let nextYear = currentYear;
        nextYear++;
        setCurrentYear(nextYear);
    }

    function handlePrevYear() {
        let prevYear = currentYear;
        prevYear--;
        setCurrentYear(prevYear);
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
            </header>

            <main>
                <div className="grid grid-cols-3 gap-4 p-4 h-svh">
                    {Array.from({length: 12}, (_, i) => {
                        const monthName = new Date(currentYear, i).toLocaleDateString("en-US", {
                            month: "long"
                        });
                        const isCurrentMonth = 
                        currentYear === new Date().getFullYear() && i === new Date().getMonth();
                        return (
                        <div key={i} className={`border p-4 rounded-lg text-center font-bold hover:bg-gray-100 hover:shadow-lg transition cursor-pointer ${isCurrentMonth ? 'bg-gray-500' : ''}`}>
                            {monthName}
                        </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}
export default YearlyView;