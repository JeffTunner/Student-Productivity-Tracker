import ChatWindow from "./ChatWindow.jsx";
import MessageComposer from "./MessageComposer.jsx";
import ThreadList from "./ThreadList.jsx";
function AiPage() {
    
    return (
        <div className="flex h-screen">
            <div className="w-64 border-r border-black p-4">
                <ThreadList />
            </div>

            <div className="flex flex-1 flex-col">
                <ChatWindow />
                <MessageComposer />
            </div>
        </div>
    );
}
export default AiPage;