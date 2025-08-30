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
        <div className="bg-gray-200 flex justify-center items-center box-border h-screen w-screen">
            <div className="px-6 py-5  bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_black] font-bold hover:bg-gray-200 transition flex ">
                <section className="flex flex-col items-center justify-center text-center gap-4">
                    <h1 className="font-mono font-extrabold text-5xl text-gray-600">Logging you out...</h1>
                    <p className="font-mono font-bold text-xl text-gray-600">Please Visit again 🙏</p>
                </section>
            </div>
        </div>
    );
}
export default Logout;