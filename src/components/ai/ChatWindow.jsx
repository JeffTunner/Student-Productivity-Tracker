import { useAi } from "../../context/AiContext.jsx";
import { useEffect, useRef } from "react";

function ChatWindow() {
  const { threads, activeThreadId } = useAi();
  const activeThread = Object.values(threads).find(
    (thread) => thread.id === activeThreadId
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threads, activeThreadId]);

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50">
      {activeThread ? (
        activeThread.messages.length > 0 ? (
          <div className="flex flex-col gap-4">
            {activeThread.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[80%] md:max-w-[60%] px-4 py-3 font-mono text-sm md:text-base rounded-2xl border-2 border-black shadow-[4px_4px_0px_black] break-words
                    ${
                      msg.role === "user"
                        ? "bg-gray-500 text-white rounded-br-none"
                        : "bg-white text-black rounded-bl-none"
                    }`}
                >
                  <span className="block font-bold text-xs mb-1 opacity-70">
                    {msg.role === "user" ? "You" : "AI"}
                  </span>
                  <span>{msg.content}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic text-center mt-10 font-mono">
            No messages yet...
          </div>
        )
      ) : (
        <div className="text-gray-500 italic text-center mt-10 font-mono">
          Select or create a new Chat
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;
