import React, {useState} from "react";

function TaskCard({card, onUpdate, onDelete}) {

    const [taskInput, setTaskInput] = useState("");
    const [editText, setEditText] = useState("");

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
        const newTask = {text: taskInput, editing: false};
        const updatedTasks = [...(card.tasks || []), newTask];
        setTaskInput("");
        onUpdate(card.id, {...card, tasks: updatedTasks});
    }

    function handleEditTask(index) {
    const updatedTasks = card.tasks.map((t, i) => {
        if (i === index) {
            setEditText(card.tasks[index].text);
        return  { ...t, editing: true }; 
        }
        return t;
    });
    onUpdate(card.id, {...card, tasks: updatedTasks});
    }

    function handleUpdateTask(index, newText) {
        const updatedTasks = card.tasks.map((t, i) => {
        if (i === index) {
            setEditText("");
        return { ...t, text: newText, editing: false };
        }
        return t;
        });
        onUpdate(card.id, {...card, tasks: updatedTasks});
    }

    function handleCancelEdit(index) {
        const updatedTasks = card.tasks.map((t, i) =>
        i === index ? { ...t, editing: false } : t
        );
        setEditText("");
        onUpdate(card.id, { ...card, tasks: updatedTasks });
    }

    function handleRemoveTask(index) {
        const updatedTasks = card.tasks.filter((_, i) => i !== index );
        onUpdate(card.id, {...card, tasks: updatedTasks});
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
                            {(card.tasks || []).map((task,index) => (
                                <li key={index}>
                                    {task.editing ? (
                                        <input type="text" value={editText} className="border border-black px-2 py-1 rounded" 
                                        onChange={(e) => setEditText(e.target.value)} 
                                        onKeyDown={(e) => {if(e.key === "Enter"){ handleUpdateTask(index, editText);}    
                                            if (e.key === "Escape") { handleCancelEdit(index);}
                
                                         }}/>
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