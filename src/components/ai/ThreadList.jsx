import { useAi } from "../../context/AiContext.jsx";

function ThreadList() {

    const {threads, newThread, setActiveThreadId, activeThreadId, deleteThread} = useAi();

    return (
        <div>
            <button className="p-4 border border-black cursor-pointer" onClick={() => newThread()}>
                + New Chat
            </button>

            {Object.values(threads).map(thread => (
                <div key={thread.id}
                className={`p-2 mb-2 cursor-pointer border ${activeThreadId === thread.id ? "bg-gray-200" : ""}`}
                onClick={() => setActiveThreadId(thread.id)}>
                    {thread.title} <button onClick={(e) => {e.stopPropagation; deleteThread(thread.id);}}>🗑️</button>
                </div>
            ))}
        </div>
    );
}
export default ThreadList;