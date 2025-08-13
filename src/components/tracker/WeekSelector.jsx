import { useState, useEffect } from "react";

function WeekSelector({ startOfCalendar, endOfCalendar }) {
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);

  useEffect(() => {
    const weekList = [];
    let current = new Date(startOfCalendar);

    while (current <= endOfCalendar) {
      let weekStart = new Date(current);
      let weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);

      weekList.push({
        start: new Date(weekStart),
        end: new Date(weekEnd),
      });

      current.setDate(current.getDate() + 7);
    }
    setWeeks(weekList);
  }, [startOfCalendar, endOfCalendar]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {weeks.map((week, index) => {
        const isActive = selectedWeek === index;
        return (
          <div
            key={index}
            className={`p-3 border rounded-lg cursor-pointer transition ${
              isActive ? "bg-black text-white" : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setSelectedWeek(index)}
          >
            {formatDate(week.start)} – {formatDate(week.end)}
          </div>
        );
      })}
    </div>
  );
}

export default WeekSelector;