import { useAi } from "../../context/AiContext.jsx";
import { Link } from "react-router-dom";

function ThreadList({ isOpen, setIsOpen }) {
  const { threads, newThread, setActiveThreadId, activeThreadId, deleteThread } = useAi();

  const closeSidebar = () => setIsOpen(false);

  const handleNew = () => {
    newThread();
    closeSidebar();
  };

  const handleSelect = (id) => {
    setActiveThreadId(id);
    closeSidebar();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      <div
        className={`fixed top-0 left-0 bg-white border-black border-r-4 w-64 max-w-[80%] flex flex-col h-full
                    transition-transform duration-500 ease-in-out z-40 shadow-[8px_0px_0px_black]
                    md:relative md:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <Link
            to={`/dashboard`}
            className="px-4 py-2 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-mono font-extrabold text-center
                     hover:bg-gray-100 hover:shadow-[4px_4px_0px_black] transition transform hover:scale-105"
            onClick={closeSidebar}
          >
            ⬅ Dashboard
          </Link>

          <button
            className="px-4 py-2 bg-slate-800 text-white font-mono font-extrabold border-2 border-black rounded-xl
                       shadow-[3px_3px_0px_black] hover:bg-slate-700 hover:scale-105 hover:shadow-[5px_5px_0px_black]
                       transition duration-300"
            onClick={handleNew}
          >
            + New Chat
          </button>
        </div>

        <div className="flex flex-col gap-3 px-4 pb-4 overflow-y-auto">
          {Object.values(threads).length === 0 ? (
            <p className="font-mono text-gray-600 text-center italic">
              No chats yet. Start a new one!
            </p>
          ) : (
            Object.values(threads).map((thread) => (
              <div
                key={thread.id}
                className={`flex justify-between items-center px-4 py-3 border-2 border-black rounded-xl cursor-pointer
                            shadow-[3px_3px_0px_black] font-mono font-bold transition
                            ${
                              activeThreadId === thread.id
                                ? "bg-gray-200"
                                : "bg-white hover:bg-gray-100"
                            }`}
                onClick={() => handleSelect(thread.id)}
              >
                <span className="truncate">{thread.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.id);
                  }}
                  className="ml-2 px-2 py-1 text-sm text-white border-2 border-black rounded-lg
                             shadow-[2px_2px_0px_black] hover:scale-105 transition"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ThreadList;
