import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker } from "../../context/TrackerContext.jsx";

function TaskModal({isOpen, dateKey, onClose, cardId = "default"}) {

    const {tasks, addTask, removeTask, updateTask} = useTracker();
    const navigate = useNavigate();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [taskInput, setTaskInput] = useState("");

    if(!isOpen) return null;

    const dateTasks = tasks[dateKey]?.[cardId] || [];

    function handleTaskInput(e) {
        setTaskInput(e.target.value);
    }

    function handleAddOrUpdateTask() {
        if(taskInput.trim() === "") return;

        if(editingTaskId !== null) {
            updateTask(dateKey, cardId, editingTaskId, {
                text: taskInput
            });
            setEditingTaskId(null);
        } else {
            addTask(dateKey, cardId, taskInput);
        }
        setTaskInput("");
    }

    function handleEditTask(task) {
        setTaskInput(task.text);
        setEditingTaskId(task.id);
    }

    function handleDeleteTask(taskId) {
        removeTask(dateKey, cardId, taskId);
    }

    function handleToggleTask(task) {
        updateTask(dateKey, cardId, task.id, { completed: !task.completed });
    }

    function handleSaveAndClose() {
        setTaskInput("");
        setEditingTaskId(null);
        onClose();
    }

    function handleDayToggle() {
        const parts = dateKey.split("-");
        if(parts.length < 3) return;
        const [y,m,d] = parts;
        const monthIndex = parseInt(m , 10) - 1;
        navigate(`/daily/${parseInt(y,10)}/${monthIndex}/${parseInt(d,10)}`);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-white border-2 border-black rounded-xl shadow-[6px_6px_0px_black] w-full max-w-lg p-6 relative">
                <button className="absolute top-3 right-3 text-black text-xl font-bold hover:scale-110 transition" onClick={handleSaveAndClose}>
                    ❌
                </button>

                <h2 className="text-xl font-bold mb-4 cursor-pointer hover:underline"
                onClick={() => handleDayToggle()}>
                    Tasks for: {dateKey || "No Date Selected"}{" "}
                    <span className="text-sm text-gray-600">(Click for Daily View)</span>
                </h2>

                <div className="flex gap-2 mb-4">
                    <input type="text" placeholder="Type your tasks..." className="flex-1 border-2 border-black rounded-lg px-3 py-2 focus:outline-none" value={taskInput} onChange={handleTaskInput}
                    onKeyDown={(e) => {if(e.key === "Enter") handleAddOrUpdateTask();}}/>
                    <button className="border-2 border-black bg-white px-4 py-2 rounded-lg shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] transition" onClick={handleAddOrUpdateTask}>
                        {editingTaskId !== null ? "✔️" : "+"}
                    </button>
                </div>

                <ol className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {dateTasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center border-2 border-black rounded-lg px-3 py-2 bg-white shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] transition">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="w-5 h-5 accent-black" checked={task.completed} onChange={() => handleToggleTask(task)}/>
                                <span className={`${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>{task.text}</span>
                            </div>
                            
                            <div className="flex gap-2">
                                <button className="hover:scale-110 transition" onClick={() => handleEditTask(task)}>✏️</button>
                                <button className="hover:scale-110 transition" onClick={() => handleDeleteTask(task.id)}>🗑️</button>
                            </div>
                        </li>
                        
                    ))}

                </ol>

                <div className="mt-4 flex justify-end">
                    <button className="border-2 border-black bg-white px-4 py-2 rounded-lg shadow-[3px_3px_0px_black] hover:shadow-[5px_5px_0px_black] transition" onClick={handleSaveAndClose}>Save and Close</button>
                </div>
            </div>
        </div>
    );
}
export default TaskModal;