import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {

    const navigate = useNavigate();
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();
        setError(null);

        if(password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, {displayName: username});
            console.log("User Created", cred.user);
            alert("You have successfully Signed Up!");
            navigate("/dashboard");
        } catch (err) {
            console.log("SignUp Error", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="relative flex flex-col justify-center w-96 max-[400px]:w-full bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-10">
            <span className="absolute -top-4 left-4 bg-black text-white px-2 py-1 text-sm font-bold shadow-[2px_2px_0px_black]">
                SIGNUP
            </span>

            <div className="text-center mb-6 border-2 border-black rounded-xl px-4 py-3 shadow-[3px_3px_0px_black] bg-gray-50">
                <h3 className="font-mono font-extrabold text-3xl text-gray-800 drop-shadow-[2px_2px_0px_black]">Create Account</h3>
                <p className="text-md text-gray-600 font-mono">Please enter your details to Signup!</p>
            </div>
            <form onSubmit={handleSignUp} className="space-y-6">
                <div className="mb-2 flex flex-col">
                    <label aria-label="Username" htmlFor="username" className="block text-gray-800 text-xl font-extrabold">Username:</label>
                    <input autoComplete="username" type="text" className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-[2px_2px_0px_black] bg-gray-50" name="Username" id="username" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="mb-6 flex flex-col">
                    <label aria-label="Email" htmlFor="email" className="block text-gray-800 text-xl font-extrabold">Email:</label>
                    <input autoComplete="email" type="email" className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-[2px_2px_0px_black] bg-gray-50" name="Email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-6 flex flex-col">
                    <label aria-label="Password" htmlFor="password" className="block text-gray-800 text-xl font-extrabold">Password:</label>
                    <input autoComplete="current-password" type="password" className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-[2px_2px_0px_black] bg-gray-50" name="Password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="mb-8 flex flex-col">
                    <label aria-label="Confirm Password" htmlFor="confirm-password" className="block text-gray-800 text-xl font-extrabold">Confirm Password:</label>
                    <input autoComplete="new-password" type="password" className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-[2px_2px_0px_black] bg-gray-50" name="ConfirmPassword" id="confirm-password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>

                {error && (
                    <p className="text-gray-800 font-bold text-center border-2 border-black bg-gray-200 p-2 rounded shadow-[2px_2px_0px_black]">{error}</p>
                )}

                <div className="flex justify-center mb-4">
                    <button 
                    disabled={loading}
                    className="w-full bg-gray-200 border-2 border-black rounded-lg px-3 py-2 text-xl font-bold text-gray-900 shadow-[3px_3px_0px_black] hover:bg-gray-300 transition" 
                    type="submit">
                        {loading ? "Signing Up..." : "Signup"}
                    </button>
                </div>
                <div className="text-center mt-6 font-mono">
                    <p className="text-sm text-gray-700">Already have an account? {" "} <Link to="/login" className="text-black underline hover:text-gray-500" onClick={(e) => {e.target.style.text-blue-200}}>Login</Link></p>
                </div>
            </form>
        </div>
        </div>

    );
}
export default Signup;