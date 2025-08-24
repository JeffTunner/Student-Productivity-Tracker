import {createContext, useContext, useState, useEffect } from "react";
import { getAiResponses, sendToAPI } from "../api/ai.js";

const AiContext = createContext();

export function AiProvider({children}) {
    
    const now = () => new Date();
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

    function appendMessage(threadId, {role, content}) {
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

        if(role === "user") {            
                const tempId = genId();
                setThreads((prev) => {
                    const thread = prev[threadId];
                    let updatedTitle = thread.title;
                    if(thread.title === "New Chat") {
                        updatedTitle = content.trim() ? content.slice(0, 20) + (content.length > 20 ? "..." : "") : `Chat with Ai - ${now().toLocaleDateString()}`;
                    }

                    return {
                    ...prev,
                    [threadId]: {
                        ...thread,
                        title: updatedTitle,
                        updatedAt: now(),
                        messages: [
                            ...thread.messages,
                            {id: tempId, role: "assistant", content: "⏳ ...", ts: now()}
                        ]
                    }
                    };
                });

                sendToAPI(content).then((reply) => {
                    setThreads((prev) => {
                        const msgs = prev[threadId].messages.map((m) => 
                            m.id === tempId ? {...m, content: reply} : m );
                        return{
                            ...prev,
                            [threadId]: {
                                ...prev[threadId],
                                updatedAt: now(),
                                messages: msgs
                            }
                        };
                    });
                });
        }
    }

    function clearThread(threadId) {
        if(!threads[threadId]) return;

        setThreads((prev) => ({
            ...prev,
            [threadId]: {
                ...prev[threadId],
                messages: prev[threadId].messages.slice(0, 1)
            }
        }));
    }

    function deleteThread(threadId) {
        const newThreads = {...threads};
        delete newThreads[threadId];
        setThreads(newThreads);
        if(activeThreadId === threadId) setActiveThreadId(null);
    }

    return (
        <AiContext.Provider
        value={{
            activeThreadId, setActiveThreadId,
            threads, setThreads,
            newThread, appendMessage, clearThread, deleteThread
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