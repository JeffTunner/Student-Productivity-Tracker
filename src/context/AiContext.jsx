import {createContext, useContext, useState, useEffect } from "react";
import { mockRespond } from "../api/mockRespond.js";
import { systemPromptTemplate } from "../utils/systemPrompt.js";
import { useAppTools } from "../hooks/useAppTools.js";
import { useJournalMood } from "./JournalMoodContext.jsx";
import { useTracker } from "./TrackerContext.jsx";
import { auth } from "../firebase.js";

const AiContext = createContext();

export function AiProvider({children}) {

    const {setMood, addOrUpdateEntry, journalData} = useJournalMood();
    const {addTask} = useTracker();
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];
    
    const tools = useAppTools();
    const now = () => new Date().toISOString();
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

                (async () => {
                    try {
                        const user = auth.currentUser;
                        if (!user) {
                        setThreads(prev => {
                            const msgs = prev[threadId].messages.map(m =>
                                m.id === tempId
                                    ? { ...m, content: "❌ Please log in to chat with the AI." }
                                    : m
                            );
                            return {
                                ...prev,
                                [threadId]: { ...prev[threadId], updatedAt: now(), messages: msgs }
                            };
                        });
                        return;
                        }

                        const token = await user.getIdToken();

                        const response = await fetch("http://localhost:5000/chat", {
                            method: "POST",
                            headers: {"Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({message: content})
                        });

                        
                        if (!response.ok) {
                            throw new Error(`Server responded with ${response.status}`);
                        }
                        
                        const data = await response.json();
                        const replyText = data.reply || "Hmm, I couldn’t generate a reply.";
                        const action = data.action || {type: "none"};

                        if(action.type === "update_mood") {
                            setMood(dateKey, action.value);
                        }
                        if(action.type === "update_journal") {
                            addOrUpdateEntry(dateKey, action.value);
                        }
                        if(action.type === "update_tasks") {
                            addTask(dateKey, "default", action.value);
                        }

                        setThreads((prev) => {
                            const msgs = prev[threadId].messages.map((m) => 
                                m.id === tempId ? {...m, content: replyText} : m
                            );
                            return {
                                ...prev,
                                [threadId]: {...prev[threadId], updatedAt: now(), messages: msgs}
                            };
                        });
                    }catch (e) {
                        console.error(e);
                        setThreads((prev) => {
                            const msgs = prev[threadId].messages.map((m) => 
                                m.id === tempId ? {...m, content: `⚠️ Backend error: ${e.message}` } : m
                            );
                            return {
                                ...prev,
                                [threadId]: {...prev[threadId], updatedAt: now(), messages: msgs}
                            };
                        });
                    }

                })();

               /* const systemPrompt = systemPromptTemplate({
                    todayISO: tools.getToday(),
                    mood: tools.getMood(),
                    journal: tools.getJournal(),
                    plannedTasks: tools.getPlannedTasks()
                });

                const history = [
                    ...threads[threadId].messages,
                    { role: "user", content, ts: now(), id: genId() }
                ];
                mockRespond({systemPrompt, messages: history, tools}).then((reply) => {
                    setThreads((prev) => {
                        const msgs = prev[threadId].messages.map((m) => 
                            m.id === tempId ? {...m, content: reply} : m);
                        return {
                            ...prev,
                            [threadId]: {
                                ...prev[threadId],
                                updatedAt: now(),
                                messages: msgs
                            }
                        };
                    });
                }); */

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