import { useAi } from "../../context/AiContext.jsx";
import { useEffect, useRef } from "react";

function ChatWindow() {

    const {threads, activeThreadId} = useAi();

    const activeThread = Object.values(threads).find((thread) => thread.id === activeThreadId);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [threads, activeThreadId]);

    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {activeThread ? (
                activeThread.messages.length > 0 ? (
                    activeThread.messages.map((msg, index) => (
                        <div key={index} className="flex flex-col gap-2 p-4">
                            <span className={`max-w-xs p-2 rounded-2xl ${msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>{msg.role}: {msg.content}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 italic">No messagess yet...</div>
                )
            ) : (
                <div className="text-gray-500 italic">Select or create new Chat</div>
            )}
            <div ref={messagesEndRef}/>
        </div>
    );
}
export default ChatWindow;