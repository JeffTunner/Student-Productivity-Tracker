import { useAi } from "../../context/AiContext.jsx";
import { useState } from "react";

function MessageComposer() {

    const {appendMessages, activeThreadId} = useAi();
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if(!newMessage.trim()) return;
        if(!activeThreadId) {
            alert("Select or create new Thread!");
            return;
        }
        appendMessages(activeThreadId, {
            role: "user",
            content: newMessage
        });
        setNewMessage("");
    };

    return (
        <div className="flex gap-4 m-4">

            <input type="text" placeholder="Ask for help"
            className="border w-full rounded px-4 py-4"
            value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {if(e.key === "Enter") handleSend();}}/>

            <button onClick={handleSend} className="border-2 rounded-md border-slate-600 p-2 hover:shadow-2xl"> 
                Send
            </button>

        </div>
    );
}
export default MessageComposer;