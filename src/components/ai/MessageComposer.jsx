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
        <div className="flex gap-4 m-4">

            <textarea
                placeholder="Ask for help"
                className="border w-full rounded px-4 py-2 resize-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    handleSend();
                    e.preventDefault();
                }

                }}
            />

            <button onClick={handleSend} className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl"> 
                Send
            </button>
            <button onClick={() => clearThread(activeThreadId)}>❌</button>

        </div>
    );
}
export default MessageComposer;