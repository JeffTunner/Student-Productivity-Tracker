import React, {useState} from "react";

function TaskCard() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCardSet, setIsCardSet] = useState(false);
    const [taskInput, setTaskInput] = useState("");
    const [task, setTask] = useState([]);
    const [editText, setEditText] = useState("");

    function handleTitle(event) {
        setTitle(event.target.value);
    }

    function handleDescription(event) {
        setDescription(event.target.value);
    }

    function handleTaskInput(event) {
        setTaskInput(event.target.value);
    }

    function handleAddTask() {
        const newTask = {text: taskInput, editing: false};
        if(taskInput.trim() === "") return;

        setTask(t => [...t, newTask]);
        setTaskInput("");
    }

    function handleEditTask(index) {
    const updatedTask = task.map((t, i) => {
        if (i === index) {
            setEditText(task[index].text);
        return  { ...t, editing: true }; 
        }
        return t;
    });
    setTask(updatedTask);
    }

    function handleUpdateTask(index, newText) {
        const updatedTask = task.map((t, i) => {
        if (i === index) {
            setEditText("");
        return { ...t, text: newText, editing: false };
        }
        return t;
        });
        setTask(updatedTask);
    }



    function handleRemoveTask(index) {
        const updatedTask = task.filter((_, i) => i !== index );
        setTask(updatedTask);
    }


    return (
        <div className="flex flex-col border-slate-900 border-2 rounded-3xl px-8 py-6 shadow-xl w-[300px] max-w-full mt-8 cursor-pointer hover:shadow-2xl hover:ring-2 ring-black">
            {
                !isCardSet ? (
                    <div className="flex flex-col gap-2 mb-4">
                            <input type="text" placeholder="Enter the Title" value={title} onChange={handleTitle} 
                            className="border border-black px-2 py-1 rounded" onKeyDown={(e) => {if(e.key === "Enter") setIsCardSet(true)} }/>
                            <input type="text" placeholder="Description" value={description} onChange={handleDescription} 
                            className="border border-black px-2 py-1 rounded" onKeyDown={(e) => {if(e.key === "Enter") setIsCardSet(true)} }/>
                            <button className="border border-black px-4 py-2 rounded hover:bg-gray-100" onClick={() => {setIsCardSet(true)}}>
                                Set Card
                            </button>                                  
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="text-center font-extrabold text-3xl underline">{title}</h1>
                        <p className="text-gray-700">{description}</p>
                        <div>
                            <input type="text" placeholder="Add your tasks..." value={taskInput} onChange={handleTaskInput} /> 
                            <button className="border border-black px-4 py-2 rounded hover:bg-gray-100" onClick={handleAddTask}>+</button>
                        </div>
                        <ol>
                            {task.map((task,index) => (
                                <li key={index}>
                                    {task.editing ? (
                                        <input type="text" value={editText} className="border border-black px-2 py-1 rounded" 
                                        onChange={(e) => setEditText(e.target.value)} 
                                        onKeyDown={(e) => {if(e.key === "Enter"){ handleUpdateTask(index, editText)}    
                                            if (e.key === "Escape") {
                                            const updatedTask = task.map((t, i) =>
                                            i === index ? { ...t, editing: false } : t
                                            );
                                            setTask(updatedTask);
                                            setEditText("");
                                        } }}/>
                                    ) : (
                                        <>
                                        <input type="checkbox" />
                                        <span id="text" className="ml-2">{task.text}</span>
                                        <button className="border border-black p-2 ml-2" onClick={() => handleEditTask(index)}>✏️</button>
                                        <button className="border border-black p-2 ml-2" onClick={() => handleRemoveTask(index)}>❌</button>
                                        </>
                                    )
                                    }
                                </li>
                            )
                            )}
                        </ol>
                                    
                   </div>
                )
            } 
        </div>
    );
}
export default TaskCard;