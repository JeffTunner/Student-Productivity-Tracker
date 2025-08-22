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
        <div>

            <input type="text" placeholder="Ask for help"
            value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>

            <button onClick={handleSend}> 
                Send
            </button>

        </div>
    );
}
export default MessageComposer;