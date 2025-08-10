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
        <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
            <header className={`text-center px-2 py-2 mb-4 ${isToday ? "bg-slate-400 rounded-full" : ""}`}>
                <div className="font-bold">{date.toLocaleDateString("en-US", {weekday: "short"})}</div>
                <div>{date.getDate()}</div>
            </header>

            { 
                !isAdding ? (
                    <button className="bg-slate-800 text-white p-2 font-extrabold rounded-lg shadow-lg hover:bg-slate-700 hover:shadow-2xl hover:shadow-slate-950 hover:scale-105 transform transition-transform duration-300"
                    onClick={handleIsAdding}>
                        + Add tasks
                    </button>
                    
                ) : (
                    <div className="flex gap-1">
                        <input type="text" placeholder="Tasks go here..." className="border w-full" value={taskInput} onChange={handleTaskInput}/>
                        <button className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl" onClick={handleAddTask}>
                            +
                        </button>
                    </div>
                )
            }

            <main>
                <ol className="mt-6">
                    {tasks.map((task, index) => (
                        <li key={index}>
                            {task.isEditing ? (
                                <input type="text" value={editText} className="border border-black px-2 py-1 rounded w-full"
                                onChange={(e) => setEditText(e.target.value)} 
                                onKeyDown={(e) => {if(e.key === "Enter"){ handleUpdateTask(index, editText);}    
                                            if (e.key === "Escape") { handleCancelEdit(index);}
                
                                }}/>
                            ) : (
                                <div className="flex items-center">
                                    <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(index)}/>
                                    <span className={`ml-2 mr-2 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                                    <button className="border border-black" onClick={() => handleEditTask(index)}>✏️</button>
                                    <button className="border border-black " onClick={() => handleRemoveTask(index)}>❌</button>
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