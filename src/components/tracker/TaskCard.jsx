import React, {useState} from "react";
import { useTracker } from "../../context/TrackerContext";

function TaskCard({card, onUpdate, onDelete}) {

    const {tasks, addTask, removeTask, updateTask, currentYear, currentMonth, currentDay} = useTracker();

    const [taskInput, setTaskInput] = useState("");
    const [editText, setEditText] = useState("");

    const dateKey = `${currentYear}-${String(currentMonth+1).padStart(2, "0")}-${String(currentDay).padStart(2, "0")}`;

    const dayTasks = (tasks[dateKey]?.[card.id]) || [];

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
        <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
            {
                !card.isSet ? (
                    <div className="flex flex-col gap-2 mb-4">
                            <input type="text" placeholder="Enter the Title" value={card.title} onChange={handleTitleChange} 
                            className="border border-black px-2 py-1 rounded" onKeyDown={(e) => {if(e.key === "Enter") {onUpdate(card.id,{...card, isSet: true});}} }/>
                            <input type="text" placeholder="Description" value={card.description} onChange={handleDescriptionChange} 
                            className="border border-black px-2 py-1 rounded" onKeyDown={(e) => {if(e.key === "Enter"){onUpdate(card.id,{...card, isSet: true});}} }/>
                            <button className="border border-black px-4 py-2 rounded hover:bg-gray-100" onClick={() => onUpdate(card.id,{...card, isSet: true})}>
                                Set Card
                            </button>                                  
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="text-center font-extrabold text-3xl underline">{card.title}</h1>
                        <p className="text-gray-700">{card.description}</p>
                        <div>
                            <input type="text" placeholder="Add your tasks..." value={taskInput} onChange={handleTaskInput} /> 
                            <button className="border border-black px-4 py-2 rounded hover:bg-gray-100" onClick={handleAddTask}>+</button>
                        </div>
                        <ol>
                            {dayTasks.map((task) => (
                                <li key={task.id}>
                                    {task.isEditing ? (
                                        <input type="text" defaultValue={task.text} className="border border-black px-2 py-1 rounded" 
                                        onKeyDown={(e) => {if(e.key === "Enter"){ handleUpdateTask(task.id, e.target.value);}    
                                            if (e.key === "Escape") { handleCancelEdit(task.id);}
                
                                         }}/>
                                    ) : (
                                        <div className="flex items-center">
                                        <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id, task.completed)}/>
                                        <span id="text" className={`ml-2 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</span>
                                        <button className="border border-black p-2 ml-2" onClick={() => handleEditTask(task.id)}>✏️</button>
                                        <button className="border border-black p-2 ml-2" onClick={() => handleRemoveTask(task.id)}>❌</button>
                                        </div>
                                    )
                                    }
                                </li>
                            )
                            )}
                        </ol>
                        <button className="mt-2 border border-black px-2 py-1 rounded hover:shadow-2xl w-fit" onClick={() => onDelete(card.id)}>
                            🗑️
                        </button>
                                    
                   </div>
                )
            } 
        </div>
    );
}
export default TaskCard;