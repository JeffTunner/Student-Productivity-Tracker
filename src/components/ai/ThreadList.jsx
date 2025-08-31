import { useAi } from "../../context/AiContext.jsx";
import { Link } from "react-router-dom";

function ThreadList() {

    const {threads, newThread, setActiveThreadId, activeThreadId, deleteThread} = useAi();

    return (
        <div>
            <div className="flex flex-col justify-center gap-6">
                <Link to={`/dashboard`}
                    className="px-3 py-1 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 transition">
                    Dashboard
                </Link>
                <button className="p-4 border border-black cursor-pointer" onClick={() => newThread()}>
                    + New Chat
                </button>
            </div>

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