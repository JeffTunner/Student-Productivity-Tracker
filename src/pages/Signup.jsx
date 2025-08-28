import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {

    const navigate = useNavigate();
    const{username, setUsername} = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();
        setError(null);

        if(password !== confirmPassword) {
            setPassword("Passwords do not match");
            setError(null);
        }

        try {
            setLoading(true);
            const cred = await createUserWithEmailAndPassword(auth, email, password);
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 w-full">
        <div className="flex flex-col justify-center shadow-md rounded-2xl p-8 mb-5 bg-slate-100 w-96  md:shadow-lg">
            <div className="text-center mb-4 bg-blue-200 p-4 rounded-lg">
                <h3 className="font-medium text-rose-600 text-3xl font-sans mb-2">Create Account</h3>
                <p className="font-thin text-orange-800 font-sans">Please enter your details to Signup!</p>
            </div>
            <form onSubmit={handleSignUp}>
                <div className="mb-2 flex flex-col">
                    <label aria-label="Username" htmlFor="username" className="block text-gray-700 mb-1 text-xl font-semibold">Username:</label>
                    <input autoComplete="username" type="text" className="w-full rounded-md border-gray-200 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200 mb-4" name="Username" id="username" onChange={(e) => {setUsername(e.target.value)}}/>
                </div>
                <div className="mb-6 flex flex-col">
                    <label aria-label="Email" htmlFor="email" className="block text-gray-700 mb-1 text-xl font-semibold">Email:</label>
                    <input autoComplete="email" type="email" className="w-full rounded-md border-gray-200 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200" name="Email" id="email" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-6 flex flex-col">
                    <label aria-label="Password" htmlFor="password" className="block text-gray-700 mb-1 text-xl font-semibold">Password:</label>
                    <input autoComplete="current-password" type="password" className="w-full rounded-md border-gray-200 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200" name="Password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="mb-8 flex flex-col">
                    <label aria-label="Confirm Password" htmlFor="confirm-password" className="block text-gray-700 mb-1 text-xl font-semibold">Confirm Password:</label>
                    <input autoComplete="new-password" type="password" className="w-full rounded-md border-gray-200 border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200" name="ConfirmPassword" id="confirm-password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                <div className="flex justify-center mb-4">
                    <button 
                    disabled={loading}
                    className="w-full transition-shadow duration-200 text-slate-50 bg-green-500 px-3 py-2 text-xl font-semibold rounded-md hover:bg-green-400 hover:shadow-md" 
                    type="submit">
                        {loading ? "Signing Up..." : "Signup"}
                    </button>
                </div>
                <div className="text-center text-gray-600">
                    <p className="text-sm">Already have an account? <Link to="/login" className="hover:text-blue-400" onClick={(e) => {e.target.style.text-blue-200}}>Login</Link></p>
                </div>
            </form>
        </div>
        </div>

    );
}
export default Signup;