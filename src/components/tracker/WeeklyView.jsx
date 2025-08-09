
function WeeklyView({username}) {

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

    return (
        <div>
            <header className="flex flex-col items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <h1>{greeting}, {name}</h1>
                <h2>{headingDate} | Week: {weekRange}</h2>
            </header>
            <main className="grid grid-cols-7 border border-black min-h-screen">
                {
                    [...Array(7)].map((_, i) => {
                        const day = new Date(monday);
                        day.setDate(monday.getDate() + i);
                        console.log(day);
                    return (
                        <div key={i} className="bg-gray-400 border-r border-black text-center">
                            <div className={`font-bold ${(today.toDateString() === day.toDateString()) ? ' bg-slate-300 ' : ''}`}>
                                {day.toLocaleDateString("en-US", {weekday: "short"})}
                            </div>
                            <div className={`${(today.toDateString() === day.toDateString()) ? ' bg-slate-300 ' : ''}`}>{day.getDate()}</div>
                        </div>
                    );
                    })
                }
            </main> 
        </div>
    );
}
export default WeeklyView;