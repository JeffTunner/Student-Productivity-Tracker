import { useContext, useState, createContext, Children, useEffect } from "react";

const TrackerContext = createContext();

export function TrackerProvider({children}) {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        if(savedTasks) {
            try {
                return JSON.parse(savedTasks);
            } catch (e) {
                return {};
            }
        }
        return {};
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(dateKey, cardId, taskText, id) {
        setTasks(prev => {
            const updated = {...prev};
            if(!updated[dateKey]) updated[dateKey] = {};
            if(!updated[dateKey][cardId]) updated[dateKey][cardId] = [];
            
            if (updated[dateKey][cardId].some(t => t.id === id)) {
            return prev;
            }

            updated[dateKey][cardId] = [...updated[dateKey][cardId] , {
            id, 
            text: taskText, 
            completed: false, 
            isEditing: false
            }];
            return updated;
        });
    }

    function removeTask(dateKey, cardId, taskId) {
        setTasks(prev => {
            const updated = {...prev};
            if(updated[dateKey]?.[cardId]) {
                updated[dateKey][cardId] = updated[dateKey][cardId].filter(t => t.id !== taskId);
            }
            return updated;
        });
    }

    function updateTask(dateKey, cardId, taskId, newField) {
        setTasks(prev => {
            const updated = {...prev};
            if(updated[dateKey]?.[cardId]) {
                updated[dateKey][cardId] = updated[dateKey][cardId].map(t => 
                    t.id === taskId ? {...t, ...newField} : t
                );
            }
            return updated;
        });
    }

    return (
        <TrackerContext.Provider
        value={{
            currentYear,
            setCurrentYear,
            currentMonth,
            setCurrentMonth,
            currentDay,
            setCurrentDay,
            tasks,
            setTasks,
            addTask,
            removeTask,
            updateTask
        }}>
            {children}
        </TrackerContext.Provider>
    );

}

export function useDate() {
    return useContext(TrackerContext);
}

export function useTracker() {
    return useContext(TrackerContext);
}