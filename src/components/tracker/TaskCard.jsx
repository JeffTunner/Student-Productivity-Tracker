import React, {useState} from "react";
import { useTracker } from "../../context/TrackerContext";

function TaskCard({card, onUpdate, onDelete, dateKey}) {

    const {tasks, addTask, removeTask, updateTask} = useTracker();

    const [taskInput, setTaskInput] = useState("");
    const [editText, setEditText] = useState("");

    const dayTasks = (tasks?.[dateKey]?.[card.id]) || [];

    function handleTitleChange(e) {
        const newTitle = e.target.value;
        onUpdate(card.id, {...card, title: newTitle});
    }

    function handleDescriptionChange(e) {
        const newDescription = e.target.value;
        onUpdate(card.id, {...card, description: newDescription});
    }

    function handleTaskInput(event) {
        setTaskInput(event.target.value);
    }

    function handleAddTask() {
        if(taskInput.trim() === "") return;
        const uniqueId = Date.now() + Math.random();
        addTask(dateKey, card.id, taskInput, uniqueId);
        setTaskInput("");
    }

    function handleEditTask(taskId) {
        updateTask(dateKey, card.id, taskId, {isEditing: true});
    }

    function handleUpdateTask(taskId, newText) {
        setEditText("");
        updateTask(dateKey, card.id, taskId, {text: newText, isEditing: false});
    }

    function handleCancelEdit(taskId) {
        setEditText("");
        updateTask(dateKey, card.id, taskId, {isEditing: false});
    }

    function handleRemoveTask(taskId) {
        removeTask(dateKey, card.id, taskId);
    }

    function handleToggleTask(taskId, completed) {
        updateTask(dateKey, card.id, taskId, {completed: !completed});
    }

    return (
        <div className="flex flex-col border-4 border-black rounded-2xl px-6 py-4 shadow-[6px_6px_0px_black] w-full max-w-md mt-6 cursor-pointer hover:scale-[1.02] transition-transform">
            {
                !card.isSet ? (
                    <div className="flex flex-col gap-3 mb-4">
                            <input type="text" placeholder="Enter the Title" value={card.title} onChange={handleTitleChange} 
                            className="border-2 border-black px-3 py-2 rounded-xl font-bold placeholder-gray-600 focus:ring-2 focus:ring-black" onKeyDown={(e) => {if(e.key === "Enter") {onUpdate(card.id,{...card, isSet: true});}} }/>
                            <input type="text" placeholder="Description" value={card.description} onChange={handleDescriptionChange} 
                            className="border-2 border-black px-3 py-2 rounded-xl placeholder-gray-600 focus:ring-2 focus:ring-black" onKeyDown={(e) => {if(e.key === "Enter"){onUpdate(card.id,{...card, isSet: true});}} }/>
                            <button className="border-2 border-black px-4 py-2 rounded-xl bg-white shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 active:translate-y-[2px]" onClick={() => onUpdate(card.id,{...card, isSet: true})}>
                                Set Card
                            </button>                                  
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <h1 className="text-center font-extrabold text-2xl underline decoration-4 decoration-black">{card.title}</h1>
                        <p className="text-gray-700 font-mono text-sm">{card.description}</p>
                        <div className="flex items-center gap-2">
                            <input type="text" placeholder="Add your tasks..." value={taskInput} onChange={handleTaskInput} className="flex-1 border-2 border-black px-2 py-1 rounded-lg"/> 
                            <button className="border-2 border-black px-3 py-1 rounded-lg bg-white shadow-[2px_2px_0px_black] font-bold hover:bg-gray-200 active:translate-y-[1px]" onClick={handleAddTask}>+</button>
                        </div>
                        <ol className="flex flex-col gap-2 mt-2">
                            {dayTasks.map((task) => (
                                <li key={task.id}>
                                    {task.isEditing ? (
                                        <input type="text" defaultValue={task.text} className="border-2 border-black px-2 py-1 rounded-lg w-full" 
                                        onKeyDown={(e) => {if(e.key === "Enter"){ handleUpdateTask(task.id, e.target.value);}    
                                            if (e.key === "Escape") { handleCancelEdit(task.id);}
                
                                         }}/>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                        <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id, task.completed)} className="w-5 h-5 accent-black"/>
                                        <span id="text" className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'font-medium'}`}>{task.text}</span>
                                        <button className="border-2 border-black p-1 rounded-lg shadow-[2px_2px_0px_black] hover:bg-gray-200" onClick={() => handleEditTask(task.id)}>✏️</button>
                                        <button className="border-2 border-black p-1 rounded-lg shadow-[2px_2px_0px_black] hover:bg-gray-200" onClick={() => handleRemoveTask(task.id)}>❌</button>
                                        </div>
                                    )
                                    }
                                </li>
                            )
                            )}
                        </ol>
                        <button className="mt-3 border-2 border-black px-3 py-1 rounded-lg hover:bg-gray-100 shadow-[3px_3px_0px_black] font-bold w-fit" onClick={() => onDelete(card.id)}>
                            🗑️
                        </button>
                                    
                   </div>
                )
            } 
        </div>
    );
}
export default TaskCard;