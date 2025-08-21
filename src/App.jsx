import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
    return (
        <Router>
            <Routes>   
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
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
            </Routes>
        </Router>
    );
}

export default App
