import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BaseLayout from "./components/BaseLayout.jsx";
function App() {
    return (
        <Router>
            <Routes>   
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />          
            </Routes>
        </Router>
    );
}

export default App
