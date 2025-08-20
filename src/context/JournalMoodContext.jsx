import { useState, useEffect, createContext, useContext } from "react";

const JournalMoodContext = createContext();

export function JournalMoodProvider({children}) {



    const [journalData, setJournalData] = useState(() => {
        const saved = localStorage.getItem("journal");
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
        localStorage.setItem("journal", JSON.stringify(journalData));
    }, [journalData]);

    const addOrUpdateEntry = (dateKey, entryText) => {
        setJournalData(prev => ({
            ...prev,
            [dateKey]: {
                ...prev[dateKey],
                entry: entryText
            }
        }));
    }

    const setMood = (dateKey, moodValue) => {
        setJournalData(prev => ({
            ...prev,
            [dateKey]: {
                ...prev[dateKey],
                mood: moodValue
            }
        }));
    }

    return (
        <JournalMoodContext.Provider
        value={{
            journalData, setJournalData,
            addOrUpdateEntry, setMood
        }}>
            {children}
        </JournalMoodContext.Provider>
    );
}

export function useJournalMood() {
    return useContext(JournalMoodContext);
}