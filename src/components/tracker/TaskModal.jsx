import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskModal({isOpen, dateKey, onClose, tasks, onSaveTasks}) {

    if(!isOpen) return null;

    const [taskInput, setTaskInput] = useState("");
    const [draftTasks, setDraftTasks] = useState(tasks);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        setDraftTasks(tasks);
        setTaskInput("");
        setEditIndex(null);
    },[tasks]);

    function handleTaskInput(e) {
        setTaskInput(e.target.value);
    }

    function handleAddOrUpdateTask() {
        if(taskInput.trim() === "") return;

        if(editIndex!==null) {
            const updated = [...draftTasks];
            updated[editIndex] = taskInput;
            setDraftTasks(updated);
            setEditIndex(null);
        } else {
            setDraftTasks([...draftTasks, taskInput]);
        }
        setTaskInput("");
    }

    function handleEditTask(index) {
        setTaskInput(draftTasks[index]);
        setEditIndex(index);
    }

    function handleDeleteTask(index) {
        const updated = draftTasks.filter((_, i) => i !== index);
        setDraftTasks(updated);

        if(editIndex === index) {
            setTaskInput("");
            setEditIndex(null);
        }
    }

    function handleSave() {
        onSaveTasks(draftTasks);
        onClose();
    }

    function handleClose() {
        setTaskInput("");
        setEditIndex(null);
        onClose();
    }

    const navigate = useNavigate();
    const {year, monthId} = useParams();
    function handleDayToggle(date) {
        const [y,m,d] = dateKey.split("-");
        const monthIndex = parseInt(m , 10) - 1;
        navigate(`/daily/${parseInt(y,10)}/${monthIndex}/${parseInt(d,10)}`);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 relative w-96 max-w-full">
                <button className="absolute top-2 right-2 text-xl font-bold" onClick={handleClose}>
                    ❌
                </button>

                <h2 className="text-lg font-bold mb-4 cursor-pointer hover:shadow-xl"
                onClick={() => handleDayToggle(dateKey)}>
                    Tasks for: {dateKey || "No Date Selected"} (For more detail, click)
                </h2>

                <div className="flex gap-2 mb-4">
                    <input type="text" placeholder="Type your tasks..." className="border w-full" value={taskInput} onChange={handleTaskInput}
                    onKeyDown={(e) => {if(e.key === "Enter") handleAddOrUpdateTask();}}/>
                    <button className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl" onClick={handleAddOrUpdateTask}>
                        {editIndex !== null ? "✔️" : "+"}
                    </button>
                </div>

                <ol className="list-decimal list-inside space-y-1">
                    {draftTasks.map((task, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{task}</span>
                            <div>
                                <button className="border" onClick={() => handleEditTask(index)}>✏️</button>
                                <button className="border" onClick={() => handleDeleteTask(index)}>🗑️</button>
                            </div>
                        </li>
                        
                    ))}

                </ol>

                <button className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl" onClick={handleSave}>Save and Close</button>
            </div>
        </div>
    );
}
export default TaskModal;