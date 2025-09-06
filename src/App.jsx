import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import TrackerHome from "./pages/tracker/TrackerHome.jsx";
import DailyTracker from "./pages/tracker/DailyTracker.jsx";
import WeeklyTracker from "./pages/tracker/WeeklyTracker.jsx";
import MonthlyTracker from "./pages/tracker/MonthlyTracker.jsx";
import YearlyTracker from "./pages/tracker/YearlyTracker.jsx";
import MonthlyView from "./components/tracker/MonthlyView.jsx";
import YearlyView from "./components/tracker/YearlyView.jsx";
import DailyView from "./components/tracker/DailyView.jsx";
import Journal from "./pages/Journal.jsx";
import Mood from "./pages/Mood.jsx";
import Ai from "./pages/AI.jsx";
import Logout from "./pages/Logout.jsx";
import AuthRedirect from "./components/auth/AuthRedirect.jsx";

function App() {
    return (
        <Router>
            <Routes>   
                    <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
                    <Route path="/signup" element={<AuthRedirect><Signup /></AuthRedirect>} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/dashboard/tracker" element={<ProtectedRoute><TrackerHome /></ProtectedRoute>} /> 
                    <Route path="/dashboard/tracker/daily" element={<ProtectedRoute><DailyTracker/></ProtectedRoute>} /> 
                    <Route path="/daily/:year/:monthId/:date" element={<ProtectedRoute><DailyView/></ProtectedRoute>} /> 
                    <Route path="/dashboard/tracker/weekly" element={<ProtectedRoute><WeeklyTracker/></ProtectedRoute>} />          
                    <Route path="/dashboard/tracker/monthly" element={<ProtectedRoute><MonthlyTracker/></ProtectedRoute>} /> 
                    <Route path="/monthly/:year/:monthId" element={<ProtectedRoute><MonthlyView/></ProtectedRoute>} />
                    <Route path="/dashboard/tracker/yearly" element={<ProtectedRoute><YearlyTracker/></ProtectedRoute>} />
                    <Route path="/yearly/:year" element={<ProtectedRoute><YearlyView/></ProtectedRoute>} /> 
                    <Route path="/dashboard/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>}/>
                    <Route path="/dashboard/mood" element={<ProtectedRoute><Mood /></ProtectedRoute>}/>
                    <Route path="/dashboard/ai" element={<ProtectedRoute><Ai /></ProtectedRoute>}/>
                    <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>}/>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App
