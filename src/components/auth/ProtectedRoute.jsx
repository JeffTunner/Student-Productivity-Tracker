import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({children}) {

    const {user, authReady} = useAuth();

    if (!authReady) return null; // or a spinner
    return user ? children : <Navigate to="/login" replace />;
}
export default ProtectedRoute;