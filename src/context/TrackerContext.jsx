import { useContext, useState, createContext, Children } from "react";

const TrackerContext = createContext();

export function TrackerProvider({children}) {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentDay, setCurrentDay] = useState(new Date().getDate());

    return (
        <TrackerContext.Provider
        value={{
            currentYear,
            setCurrentYear,
            currentMonth,
            setCurrentMonth,
            currentDay,
            setCurrentDay
        }}>
            {children}
        </TrackerContext.Provider>
    );

}

export function useDate() {
    return useContext(TrackerContext);
}