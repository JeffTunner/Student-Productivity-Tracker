import { useAi } from "../../context/AiContext.jsx";
import { useState } from "react";

function MessageComposer() {

    const {appendMessage, activeThreadId, clearThread} = useAi();
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if(!newMessage.trim()) return;
        if(!activeThreadId) {
            alert("Select or create new Thread!");
            return;
        }
        appendMessage(activeThreadId, {
            role: "user",
            content: newMessage
        });
        setNewMessage("");
    };

    return (
        <div className="w-full  bg-slate-50 p-3 md:p-4 flex flex-col md:flex-row items-center gap-3 ">

            <textarea
                placeholder="Type your message..."
                className="w-full h-20 md:h-16 px-4 py-2 font-mono text-sm md:text-base border-4 border-black rounded-xl
                   shadow-[3px_3px_0px_black] resize-none focus:outline-none focus:ring-4 focus:ring-slate-400
                   hover:bg-slate-100 transition"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    handleSend();
                    e.preventDefault();
                }

                }}
            />

            <div className="flex gap-2 w-full md:w-auto justify-end">
                <button 
                onClick={handleSend} disabled={!newMessage.trim()} 
                          className={`px-4 py-2 font-mono font-extrabold rounded-xl border-4 border-black 
                     shadow-[3px_3px_0px_black] transition duration-300 
                     ${
                       !newMessage.trim()
                         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                         : "bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 hover:shadow-[5px_5px_0px_black]"
                     }`}> 
                    Send
                </button>
                <button 
                onClick={() => clearThread(activeThreadId)}
                className="px-3 py-2 font-mono font-extrabold text-white rounded-xl border-4 border-black
                     shadow-[3px_3px_0px_black] hover:scale-105 hover:shadow-[5px_5px_0px_black]
                     transition"
                >
                    ❌
                </button>
            </div>

        </div>
    );
}
export default MessageComposer;