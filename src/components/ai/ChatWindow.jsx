import { useAi } from "../../context/AiContext.jsx";

function ChatWindow() {

    const {threads, activeThreadId} = useAi();

    const activeThread = Object.values(threads).find((thread) => thread.id === activeThreadId);

    return (
        <div className="flex-1 p-4">
            {activeThread ? (
                activeThread.messages.length > 0 ? (
                    activeThread.messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-semibold">{msg.role}: </span>{msg.content}
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 italic">No messagess yet...</div>
                )
            ) : (
                <div className="text-gray-500 italic">Select or create new Chat</div>
            )}
        </div>
    );
}
export default ChatWindow;