import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();


    const username = localStorage.getItem("username");
    const roles = JSON.parse(localStorage.getItem("roles"));
    console.log(roles)

    return (
        roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/>
            : username
                ? <Navigate to="/home" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;