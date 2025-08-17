import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import { useParams } from "react-router-dom";
import { useDate } from "../../context/TrackerContext.jsx";

function DailyView({username}) {

    const hours = new Date().getHours();
    const name = username;
    let greeting;
    
    if(hours < 12) {
        greeting = "Good Morning!";
    } else if(hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

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
        const newCard = {id: Date.now(), title: "", description: "", tasks: [], isSet: false};
        setCards(c => [...c, newCard]);
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

    return (
    <div>
            <header className="flex flex-col items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <h1 className="font-extrabold text-3xl text-slate-800">{greeting}, {username || "user"} 😊</h1>
                <p className="text-slate-700">{headingDate}</p>
            </header>
            <div>
                <Breadcrumb year={currentYear} month={currentMonth} date={currentDay}/>
            </div>
        <div className="flex items-center flex-col">

                <div className="mt-4">
                    <button className="bg-slate-800 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300" onClick={handleAddCard}>+ Add Card</button>
                </div>
            <main className="flex flex-col flex-wrap justify-center items-center m-4 px-8 py-6 border-2 border-slate-900 rounded-xl shadow-xl font-mono w-fit max-w-full ">
                {cards.length === 0 && (
                    <div className="border-b border-slate-800 flex flex-col gap-2">
                        <h1 className="text-center text-xl font-extrabold underline ">No tasks yet.</h1>
                        <p>Click + to add one!</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-8 ">
                    {
                        cards.map((card, index) => (
                            <TaskCard key={card.id} card={card} onUpdate={handleUpdateCard} onDelete={handleDeleteCard}/>
                        ))
                    }
                </div>


            </main>
        </div>

    </div>
    );
}
export default DailyView;

