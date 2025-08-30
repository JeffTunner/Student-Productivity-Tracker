import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function AuthRedirect({children}) {

    const {user, authReady} = useAuth();

    if(!authReady) return null;

    if(user) {
        return <Navigate to="/dashboard"/>;
    }

    return children;
}
export default AuthRedirect;