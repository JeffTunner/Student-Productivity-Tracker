import { Link, Outlet } from "react-router-dom";
function BaseLayout() {

    return (
        <div>
            <header>
                <h1>Student Productivity Tracker</h1>
                <p>Your very own time tracking app👌</p>
            </header>
            <nav>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2025 Student Productivity Tracker | Abhinav Kaushik </p>
            </footer>
        </div>
    );
}
export default BaseLayout;