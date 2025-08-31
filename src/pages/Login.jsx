import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged In", cred.user);
      alert("Successfully Logged In!");
      navigate("/dashboard");
    } catch (err) {
      console.log("Login Error", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <div className="relative flex flex-col justify-center w-96 max-[400px]:w-full bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_black] p-10">
        <span className="absolute -top-4 left-4 bg-black text-white px-2 py-1 text-sm font-bold shadow-[2px_2px_0px_black]">
            LOGIN
        </span>

        {/* Header */}
        <div className="text-center mb-6 border-2 border-black rounded-xl px-4 py-3 shadow-[3px_3px_0px_black] bg-gray-50">
          <h3 className="font-mono font-extrabold text-4xl text-gray-800 drop-shadow-[2px_2px_0px_black]">
            Hello 😊
          </h3>
          <p className="text-lg text-gray-600 font-mono">
            Please Enter your Credentials to Login!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block text-gray-800 text-xl font-extrabold"
            >
              Email:
            </label>
            <input
              autoComplete="email"
              type="email"
              className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-[2px_2px_0px_black] bg-gray-50"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block text-gray-800 text-xl font-extrabold"
            >
              Password:
            </label>
            <input
              autoComplete="current-password"
              type="password"
              className="w-full border-2 border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-[2px_2px_0px_black] bg-gray-50"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-gray-800 font-bold text-center border-2 border-black bg-gray-200 p-2 rounded shadow-[2px_2px_0px_black]">
              {error}
            </p>
          )}

          {/* Button */}
          <div className="flex justify-center">
            <button
              disabled={loading}
              className="w-full bg-gray-200 border-2 border-black rounded-lg px-3 py-2 text-xl font-bold text-gray-900 shadow-[3px_3px_0px_black] hover:bg-gray-300 transition"
              type="submit"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 font-mono">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black underline hover:text-gray-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
