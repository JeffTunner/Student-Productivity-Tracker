import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker } from "../../context/TrackerContext.jsx";

function TaskModal({isOpen, dateKey, onClose}) {

    const {tasks, addTask, removeTask, updateTask} = useTracker();
    const navigate = useNavigate();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [taskInput, setTaskInput] = useState("");

    if(!isOpen) return null;

    const dateTasks = tasks[dateKey]?.["default"] || [];

    function handleTaskInput(e) {
        setTaskInput(e.target.value);
    }

    function handleAddOrUpdateTask() {
        if(taskInput.trim() === "") return;

        if(editingTaskId !== null) {
            updateTask(dateKey, "default", editingTaskId, {
                text: taskInput
            });
            setEditingTaskId(null);
        } else {
            addTask(dateKey, "default", taskInput);
        }
        setTaskInput("");
    }

    function handleEditTask(task) {
        setTaskInput(task.text);
        setEditingTaskId(task.id);
    }

    function handleDeleteTask(taskId) {
        removeTask(dateKey, "default", taskId);
    }

    function handleToggleTask(task) {
        updateTask(dateKey, "default", task.id, { completed: !task.completed });
    }

    function handleSaveAndClose() {
        setTaskInput("");
        setEditingTaskId(null);
        onClose();
    }

    function handleDayToggle() {
        const [y,m,d] = dateKey.split("-");
        const monthIndex = parseInt(m , 10) - 1;
        navigate(`/daily/${parseInt(y,10)}/${monthIndex}/${parseInt(d,10)}`);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 relative w-96 max-w-full">
                <button className="absolute top-2 right-2 text-xl font-bold" onClick={handleSaveAndClose}>
                    ❌
                </button>

                <h2 className="text-lg font-bold mb-4 cursor-pointer hover:shadow-xl"
                onClick={() => handleDayToggle()}>
                    Tasks for: {dateKey || "No Date Selected"} (Click for Daily View)
                </h2>

                <div className="flex gap-2 mb-4">
                    <input type="text" placeholder="Type your tasks..." className="border w-full rounded px-2 py-1" value={taskInput} onChange={handleTaskInput}
                    onKeyDown={(e) => {if(e.key === "Enter") handleAddOrUpdateTask();}}/>
                    <button className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl" onClick={handleAddOrUpdateTask}>
                        {editingTaskId !== null ? "✔️" : "+"}
                    </button>
                </div>

                <ol className="list-decimal list-inside space-y-1">
                    {dateTasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task)}/>
                                <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</span>
                            </div>
                            
                            <div className="flex gap-1">
                                <button className="border" onClick={() => handleEditTask(task)}>✏️</button>
                                <button className="border" onClick={() => handleDeleteTask(task.id)}>🗑️</button>
                            </div>
                        </li>
                        
                    ))}

                </ol>

                <button className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl" onClick={handleSaveAndClose}>Save and Close</button>
            </div>
        </div>
    );
}
export default TaskModal;