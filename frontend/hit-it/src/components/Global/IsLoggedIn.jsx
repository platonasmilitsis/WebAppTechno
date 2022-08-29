import { useLocation, Navigate, Outlet } from "react-router-dom";

const IsLoggedIn = () => {
    const location = useLocation();

    const username = localStorage.getItem("username");

    return (
        username
            ? <Navigate to="/home" state={{ from: location }} replace />
            : <Outlet/>
    );
}

export default IsLoggedIn;