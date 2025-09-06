import { useState, useEffect } from "react";
import DayCard from "./DayCard.jsx";
import Breadcrumb from "./Breadcrumb.jsx";

function WeeklyView({ username }) {
  const weeklycards = {
    Sun: [],
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
  };
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const [currentSunday, setCurrentSunday] = useState(() => {
    const dow = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dow); 
    return sunday;
  });

  const [week, setWeek] = useState(() => {
    const saved = localStorage.getItem("weeklyTasks");
    try {
      return saved ? JSON.parse(saved) : weeklycards;
    } catch (e) {
      console.log("Couldn’t load from storage", e);
      return weeklycards;
    }
  });

  useEffect(() => {
    localStorage.setItem("weeklyTasks", JSON.stringify(week));
  }, [week]);

  const formattedDate = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const saturday = new Date(currentSunday);
  saturday.setDate(currentSunday.getDate() + 6);

  const headingDate = currentSunday.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekRange = `${formattedDate(currentSunday)} - ${formattedDate(
    saturday
  )}`;

  function handleUpdateWeek(dayKey, updatedData) {
    setWeek((prev) => ({
      ...prev,
      [dayKey]: updatedData,
    }));
  }

  function handleToday() {
    const dow = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dow);
    setCurrentSunday(sunday);
  }

  function handleNextWeek() {
    const nextSunday = new Date(currentSunday);
    nextSunday.setDate(currentSunday.getDate() + 7);
    setCurrentSunday(nextSunday);
  }

  function handlePrevWeek() {
    const prevSunday = new Date(currentSunday);
    prevSunday.setDate(currentSunday.getDate() - 7);
    setCurrentSunday(prevSunday);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-black shadow-[6px_6px_0px_black] p-4 md:p-6 font-mono">
        <button
          className="font-extrabold text-base md:text-lg border-2 border-black rounded-full px-4 py-2 bg-white shadow-[2px_2px_0px_black] hover:bg-gray-700 hover:text-white hover:scale-105 transition"
          onClick={handleToday}
        >
          Today
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition"
            onClick={handlePrevWeek}
          >
            ←
          </button>
          <h2 className="text-slate-800 font-extrabold text-lg md:text-xl text-center">
             Week: {weekRange}
          </h2>
          <button
            className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition"
            onClick={handleNextWeek}
          >
            →
          </button>
        </div>
      </header>

      <div className="px-4 py-2">
        <Breadcrumb />
      </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 flex-1">
        {dayNames.map((dayName, i) => {
          const day = new Date(currentSunday);
          day.setDate(currentSunday.getDate() + i);

          return (
            <div
              key={dayName}
              className=" bg-white transition rounded-lg flex flex-col"
            >
              <DayCard
                date={day}
                tasks={week[dayName]}
                isToday={today.toDateString() === day.toDateString()}
                onUpdate={(updatedTasks) =>
                  handleUpdateWeek(dayName, updatedTasks)
                }
              />
            </div>
          );
        })}
      </main>
    </div>
  );
}
export default WeeklyView;
