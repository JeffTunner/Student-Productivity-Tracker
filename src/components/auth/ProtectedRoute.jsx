import { Navigate } from "react-router-dom";

function ProtectedRoute({children}) {

    const isAuthenticated = localStorage.getItem("isLoggedIn");

    if(!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    return children;
}
export default ProtectedRoute;