import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow.jsx";
import MessageComposer from "./MessageComposer.jsx";
import ThreadList from "./ThreadList.jsx";
function AiPage() {

    const [isThreadListOpen, setIsThreadListOpen] = useState(() => window.innerWidth >= 768);

    useEffect(() => {

        const handleResize = () => {
            if(window.innerWidth >= 768) {
                setIsThreadListOpen(true);
            } else {
                setIsThreadListOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    
    return (
        <div className="flex h-screen">
            <div>
                <ThreadList isOpen={isThreadListOpen} setIsOpen={setIsThreadListOpen}/>
            </div>

            <div className={`flex flex-col flex-1 transition-all duration-500`}>
                <header className="flex items-center justify-between p-3 border-b-4 border-black bg-white">
                    <button 
                    className="md:hidden px-3 py-2 border-2 border-black rounded-md shadow-[2px_2px_0px_black]"
                    onClick={() => setIsThreadListOpen(true)}>
                        ☰
                    </button>
                    <h2 className="font-mono font-bold text-xl">AI Assistant</h2>
                    <div className="w-10" />
                </header>

                <div className="flex-1 overflow-auto"><ChatWindow /></div>
                <div className="p-3 border-t-4 border-black"><MessageComposer /></div>
            </div>
        </div>
    );
}
export default AiPage;