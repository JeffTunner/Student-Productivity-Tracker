import { auth } from "../../firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function Topbar() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "User");
      } else {
        setUsername("Guest");
      }
    });
    return () => unsubscribe();
  },[]);

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });



  return (
    <header className="bg-white border-4 border-black rounded-b-3xl shadow-[6px_6px_0px_#000] px-4 py-3 md:px-8 md:py-5">
      <div className="flex justify-between items-center">

        <h1 className="text-gray-900 font-mono font-extrabold text-2xl md:text-4xl">
          Hey, {username} 👋
        </h1>

        <img
          src="/src/assets/profile.jpeg"
          alt="profile pic"
          className="w-12 md:w-16 h-auto border-4 border-black rounded-full shadow-[3px_3px_0px_#000] cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      <div className="mt-3 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left gap-2 font-mono">
        <p className="text-gray-600 font-semibold text-lg md:text-xl">
          Dashboard unlocked ⚡
        </p>
        <span className="text-gray-800 font-bold text-sm md:text-lg border-2 border-black rounded-xl px-3 py-1 shadow-[2px_2px_0px_#000] bg-white">
          {formattedDate}
        </span>
      </div>
    </header>
  );
}

export default Topbar;
