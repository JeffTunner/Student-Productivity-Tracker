import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";

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

    const today = new Date().toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    const [taskCard, setTaskCard] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState("");

    function handleAddTaskCard() {

        const newCard = {id: Date().now, title: taskTitle, description: taskDescription, list: []};
        const newList = {name: task};

        setTaskCard(tc => [...tc, newCard]);
        setTaskList(tl => [...tl, newList]);
        setTaskTitle("");
        setTaskDescription("");
        setTask("");
    }

    function handleTaskTitle(event) {
        setTaskTitle(event.target.value);
    }

    function handleTaskDescription(event) {
        setTaskDescription(event.target.value);
    }

    

    return (
    <div>
            <header className="flex flex-col items-center gap-2 bg-gray-100 font-mono p-4 border border-slate-950">
                <h1 className="font-extrabold text-3xl text-slate-800">{greeting}, {username} 😊</h1>
                <p className="text-slate-700">{today}</p>
            </header>
        <div className="flex items-center flex-col">
            <main className="flex flex-col flex-wrap justify-center items-center m-4 px-8 py-6 border-2 border-slate-900 rounded-xl shadow-xl font-mono w-fit max-w-full ">
                <div className="border-b border-slate-800 flex flex-col gap-2">
                    <h1 className="text-center text-xl font-extrabold underline ">No tasks yet.</h1>
                    <p>Click + to add one!</p>
                </div>
                <div className="mt-4">
                    <button className="bg-slate-800 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300" onClick={handleAddTaskCard}>+ Add Card</button>
                </div>

                <div className="flex flex-wrap gap-8">
                    
                    <TaskCard />

                        {taskCard.map((card,index) =>
                        <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black"> 
                            <div key={index} className="flex flex-col gap-2 mb-4">
                                <label className="text-center font-extrabold text-3xl underline">
                                    Title: {card.title}<input type="text" name="Title" id="title" className="w-[100px]" onChange={handleTaskTitle}/>
                                </label>
                                <label>
                                    Description: {card.description}<input type="text" name="Title" id="title" onChange={handleTaskDescription}/>
                                </label>                                
                            </div>
                            <div>
                                <input key={index} type="text" name="TaskName" id="taskname" className="border" value={task} />
                                <button className="bg-slate-800 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300" >+ Add Task</button>
                            </div>
                            <button >Set Card</button>
                            <ol>
                                <li>
                                    {card.task}
                                </li>
                            </ol>
                        </div>
                        )}


                </div>


            </main>
        </div>

    </div>
    );
}
export default DailyView;

/*
                                <h1 className="text-center font-extrabold text-3xl underline">Title: {card.title}</h1>
                                <p>{card.description}</p>
*/ 