import { Link, Outlet } from "react-router-dom";
function BaseLayout() {

    return (
        <div className="min-h-screen flex flex-col bg-amber-50">
            <header className="bg-blue-100 py-4 px-6 text-center flex-col border-2 rounded-xl shadow-2xl m-10">
                <h1 className="font-extrabold text-3xl text-blue-950 pb-3">Student Productivity Tracker</h1>
                <p className="font-semibold text-pink-600">Your very own time tracking app👌</p>
            </header>
            <nav className="bg-gray-100 px-6 py-3 shadow-md m-10 mt-0 rounded-lg">
                <ul className="flex justify-around gap-8 text-sm font-sans">
                    <li><Link to="/dashboard" className="hover:text-blue-800">Dashboard</Link></li>
                    <li><Link to="/signup" className="hover:text-emerald-500">SignUp</Link></li>
                    <li><Link to="/login" className="hover:text-emerald-500">Login</Link></li>
                </ul>
            </nav>
            <main className="flex-grow px-6 py-4 justify-center items-center flex">
                <Outlet />
            </main>
            <footer className="bg-gray-200 text-center py-4 hover:bg-gray-300">
                <p className="text-slate-700 font-extralight hover:text-rose-400 cursor-pointer">&copy; 2025 Student Productivity Tracker | Abhinav Kaushik </p>
            </footer>
        </div>
    );
}
export default BaseLayout;