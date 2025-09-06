import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
function Greeting() {

    const [username, setUsername] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUsername(user.displayName || "user");
            } else {
                setUsername("Guest");
            }
        });
        return () => unsubscribe();
    },[]);


    const hours = new Date().getHours();
    let greeting;
    
    if(hours < 12) {
        greeting = "Good Morning!";
    } else if(hours < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const today = new Date().toLocaleDateString("en-US", {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return(
        <div className="bg-white border-4 border-black rounded-b-3xl shadow-[6px_6px_0px_#000] px-4 py-3 md:px-8 md:py-5">
            <header className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-2 font-mono">
                <h1 className="text-2xl md:text-4xl font-extrabold text-black drop-shadow-[2px_2px_0_white]">{greeting}, {username} 👋</h1>          
            <div className="flex flex-col gap-1 max-w-xl">
                <h2 className="text-xl md:text-2xl font-extrabold text-black drop-shadow-[2px_2px_0_white]">Welcome to the Tracker 😄</h2>
                <p className="text-sm md:text-lg font-semibold text-gray-700 drop-shadow-[1px_1px_0_white]">Here you can choose from 4 different options to do the tracking.</p>
            </div>
            </header>
        </div>
    );
}
export default Greeting;