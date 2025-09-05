import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useDate } from "../../context/TrackerContext.jsx";

function DailyView({username}) {

    const [cards, setCards] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        try {
        const savedCards = JSON.parse(localStorage.getItem("taskcards"));
        if(Array.isArray(savedCards)) setCards(savedCards);
        } catch (e) {
            console.log("Could not load cards from storage", e);
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if(hasLoaded){
            localStorage.setItem("taskcards", JSON.stringify(cards));
        }
    }, [cards, hasLoaded]);

    function handleAddCard() {
        const newCard = {id: Date.now(), title: "", description: "", isSet: false};
        setCards((c) => [...c, newCard]);
    }

    function handleUpdateCard(id, updatedData) {
        const updatedCard = cards.map(c => {
            if(c.id === id){
                return {...c, ...updatedData}
            } 
            return c;
        });
        setCards(updatedCard);
    }

    function handleDeleteCard(id) {
        const updatedCard = cards.filter(c => c.id !== id);
        setCards(updatedCard);
    }

    const {year, monthId, date} = useParams();
    const {currentYear, setCurrentYear, currentMonth, setCurrentMonth, currentDay, setCurrentDay} = useDate();
    useEffect(() => {
        if(year && monthId && date) {
            const parsedYear = parseInt(year, 10);
            const parsedMonth = parseInt(monthId, 10);
            const parsedDay = parseInt(date, 10);
            setCurrentYear(parsedYear);
            setCurrentMonth(parsedMonth);
            setCurrentDay(parsedDay);
        }
    }, [year, monthId, date, setCurrentYear, setCurrentMonth, setCurrentDay]);

    const selectedDate = (Number.isInteger(currentYear) && Number.isInteger(currentMonth) && Number.isInteger(currentDay)) 
                            ? new Date(currentYear, currentMonth, currentDay) : new Date();
    const headingDate = selectedDate.toLocaleDateString("en-US",{
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    const navigate = useNavigate();

    function handleNextDay() {
        const next = new Date(selectedDate);
        next.setDate(next.getDate() + 1);
        navigate(`/daily/${next.getFullYear()}/${next.getMonth()}/${next.getDate()}`);
    }

    function handlePrevDay() {
        const prev = new Date(selectedDate);
        prev.setDate(prev.getDate() - 1);
        navigate(`/daily/${prev.getFullYear()}/${prev.getMonth()}/${prev.getDate()}`);
    }

    function handleToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        setCurrentYear(year);
        setCurrentMonth(month);
        setCurrentDay(day);
        navigate(`/daily/${year}/${month}/${day}`);
    }

    return (
    <div className="min-h-screen bg-white flex flex-col">
            <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-black shadow-[6px_6px_0px_black] p-4 md:p-6 font-mono">
                <button className="font-extrabold text-base md:text-lg border-2 border-black rounded-full px-4 py-2 bg-white shadow-[2px_2px_0px_black] hover:bg-gray-700 hover:text-white hover:scale-105 transition" onClick={handleToday}>
                    Today
                </button>
                <div className="flex items-center gap-4 md:gap-6">
                    <button className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-110 hover:bg-gray-200 transition" onClick={handlePrevDay}>←</button>
                    <p className="text-slate-800 font-extrabold text-lg md:text-xl text-center">{headingDate}</p>
                    <button className="font-extrabold text-2xl border-4 border-black rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-[3px_3px_0px_black] hover:scale-105 hover:bg-gray-200 transition" onClick={handleNextDay}>→</button>
                </div>
            </header>
            <div className="px-4 py-2">
                <Breadcrumb year={currentYear} month={currentMonth} date={currentDay}/>
            </div>
        <div className="flex items-center flex-col">

                <div className="mt-4">
                    <button className="mb-6 bg-slate-900 text-white px-4 py-2 rounded-xl border-4 border-black font-mono font-extrabold shadow-[4px_4px_0px_black] hover:bg-slate-700 hover:scale-105 transition" onClick={handleAddCard}>+ Add Card</button>
                </div>
            <main className="px-4 py-6 md:px-8 md:py-10 border-4 border-black rounded-3xl bg-white shadow-[6px_6px_0px_black] font-mono w-full max-w-6xl ">
                {cards.length === 0 && (
                    <div className="text-center border-b-2 border-black pb-4 mb-4">
                        <h1 className="text-xl md:text-2xl font-extrabold underline">No tasks yet.</h1>
                        <p className="text-gray-600">Click + to add one!</p>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-6">
                    {
                        cards.map((card, index) => (
                            <TaskCard key={card.id} card={card} onUpdate={handleUpdateCard} onDelete={handleDeleteCard} dateKey={`${currentYear}-${String(currentMonth+1).padStart(2, "0")}-${String(currentDay).padStart(2, "0")}`}/>
                        ))
                    }
                </div>


            </main>
        </div>

    </div>
    );
}
export default DailyView;

