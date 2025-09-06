import { useState } from "react";

function DayCard({date, isToday, tasks, onUpdate}) {

    const [isAdding, setIsAdding] = useState(false);
    const [taskInput, setTaskInput] = useState("");
    const [editText, setEditText] = useState("");

    function handleIsAdding() {
        setIsAdding(true);
    }

    function handleTaskInput(e) {
        setTaskInput(e.target.value);
    }

    function handleAddTask() {
        if(taskInput.trim() === "" ) return;
        const newTask = {text: taskInput, isEditing: false, completed: false};
        onUpdate([...tasks, newTask]);
        setTaskInput("");
        setIsAdding(false);
    }

    function handleEditTask(index) {
        const updatedTask = tasks.map((task, i) => {
            if(i===index) {
                setEditText(task.text);
                return {...task, isEditing: true};
            } return task;
        });
        onUpdate(updatedTask);
    }

    function handleRemoveTask(index) {
        const updatedTask = tasks.filter((_,i) => i!== index);
        onUpdate(updatedTask);
    }

    function handleToggleTask(index) {
        const updatedTask = tasks.map((task,i) => {
            if(i===index) {
                return {...task, completed: !task.completed};
            } return task;
        });
        onUpdate(updatedTask);
    }

    function handleUpdateTask(index, newText) {
        const updatedTask = tasks.map((task, i) => {
            if(i===index) {
                setEditText("");
                return {...task, text: newText, isEditing: false};
            } return task;
        });
        onUpdate(updatedTask);
    }

    function handleCancelEdit(index) {
        const updatedTask = tasks.map((task, i) => {
            if(i===index) {
                return {...task, isEditing: false};
            } return task;
        });
        onUpdate(updatedTask);
    }
    
    return(
        <div className="flex flex-col border-4 border-black rounded-2xl px-6 py-4 bg-white shadow-[6px_6px_0px_black] md:w-[300px] max-w-full h-auto md:h-screen mt-6 cursor-pointer hover:scale-[1.02] transition-transform duration-200 overflow-y-auto">
            <header className={`text-center px-3 py-2 mb-4 border-2 border-black rounded-lg shadow-[3px_3px_0px_black] font-extrabold uppercase ${isToday ? "bg-gray-800 text-white" : ""}`}>
                <div>{date.toLocaleDateString("en-US", {weekday: "short"})}</div>
                <div className="text-xl">{date.getDate()}</div>
            </header>

            { 
                !isAdding ? (
                    <button className="mb-6 bg-slate-900 text-white px-4 py-2 rounded-xl border-4 border-black font-mono font-extrabold shadow-[4px_4px_0px_black] hover:bg-slate-700 hover:scale-105 transition"
                    onClick={handleIsAdding}>
                        + Add tasks
                    </button>
                    
                ) : (
                    <div className="flex gap-2">
                        <input type="text" placeholder="Tasks go here..." className="border-2 border-black px-2 py-1 rounded-md w-full" value={taskInput} onChange={handleTaskInput}/>
                        <button className="border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0px_black] hover:bg-gray-100" onClick={handleAddTask}>
                            +
                        </button>
                    </div>
                )
            }

            <main>
                <ol className="mt-4 space-y-2">
                    {tasks.map((task, index) => (
                        <li key={index} className="flex items-center justify-between px-2 py-1">
                            {task.isEditing ? (
                                <input type="text" value={editText} className="border-2 border-black px-2 py-1 rounded w-full"
                                onChange={(e) => setEditText(e.target.value)} 
                                onKeyDown={(e) => {if(e.key === "Enter"){ handleUpdateTask(index, editText);}    
                                            if (e.key === "Escape") { handleCancelEdit(index);}
                
                                }}/>
                            ) : (
                                <div className="flex items-center flex-1">
                                    <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(index)} className="mr-2 accent-black"/>
                                    <span className={`font-bold mr-2 ${task.completed ? 'line-through text-gray-400' : 'text-black'}`}>{task.text}</span>
                                    <div className="flex gap-1">
                                        <button className="px-2 border-2 border-black rounded shadow-[1px_1px_0px_black]" onClick={() => handleEditTask(index)}>✏️</button>
                                        <button className="px-2 border-2 border-black rounded shadow-[1px_1px_0px_black]" onClick={() => handleRemoveTask(index)}>❌</button>
                                    </div>
                                </div>
                            )}

                        </li>
                    ))}
                </ol>
            </main>
        </div>
    );
}
export default DayCard;