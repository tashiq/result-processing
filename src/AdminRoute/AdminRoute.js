import { CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import Login from "../Components/Login/Login";
import useAuth from "../Hooks/useAuth";

const AdminRoute = () => {
    const { user, isLoading } = useAuth();
    // console.log(user, isLoading);
    if (isLoading) {
        return <CircularProgress />
    }
    else if (user.email) {
        return <Outlet />
    }
    else {
        return <Login />
    }
};

export default AdminRoute;