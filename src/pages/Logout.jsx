import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            signOut(auth).then(() => {
                navigate("/login");
            });
        },1500);

        return () => clearTimeout(timer);
    },[navigate]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white border-4 border-black rounded-3xl shadow-[6px_6px_0px_#000] px-6 py-8 md:px-10 md:py-12 text-center">

                    <h1 className="font-mono font-extrabold text-3xl md:text-5xl text-gray-900 mb-4">Logging you out...</h1>
                    <p className="font-mono font-bold text-lg md:text-2xl text-gray-700 mb-6">Please Visit again 🙏</p>

                    <div className="animate-bounce text-3xl md:text-4xl">👋</div>

            </div>
        </div>
    );
}
export default Logout;