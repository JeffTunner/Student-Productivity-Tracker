import {createContext, useContext, useState, useEffect } from "react";

const AiContext = createContext();

export function AiProvider({children}) {
    
    const now = () => new Date().toISOString().split('T')[0];
    const genId = () => Date.now().toString(36) + Math.random().toString(16).slice(2);
    const LS_KEY = "ai:threads:v1"
    const [activeThreadId, setActiveThreadId] = useState(null);
    const [threads, setThreads] = useState(() => {
        const saved = localStorage.getItem(LS_KEY);
        if(saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return {};
            }
        }
        return {};
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(threads));
    }, [threads]);


    function newThread(title = "New Chat") {
        const id = genId();
        setThreads(prev => ({
            ...prev,
            [id]:{
                id, title,
                createdAt: now(), updatedAt: now(),
                messages: [
                    {id: genId(), role: "system", content: "You are a helpful, concise assistant.", ts: now()}
                ] 
            }
        }));
        setActiveThreadId(id);
        return id;
    }

    function appendMessages(threadId, {role, content}) {
        if(!threads[threadId]) return;
        setThreads((prev) => ({
            ...prev,
            [threadId]: {
                ...prev[threadId],
                updatedAt: now(),
                messages: [
                    ...prev[threadId].messages,
                    {id: genId(), role, content: content.trim(), ts: now()}
                ]
            }
        }));
    }



    return (
        <AiContext.Provider
        value={{
            activeThreadId, setActiveThreadId,
            threads, setThreads,
            newThread, appendMessages
        }}>
            {children}
        </AiContext.Provider>
    );
}

export function useAi() {
    const ctx = useContext(AiContext);
    if(!ctx) throw new Error("useAi must be used inside AiProvider");
    return ctx;
}