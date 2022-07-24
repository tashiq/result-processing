import { CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import Login from "../Components/Login/Login";
import useAuth from "../Hooks/useAuth";
import './AdminRoute.css'
const AdminRoute = () => {
    const { user, isLoading } = useAuth();
    // console.log(user, isLoading);
    if (isLoading) {
        return (
            <div className="w-100"
                style={
                    {
                        backgroundImage: {},
                        height: "100vh",
                        fontSize: "35px",
                        textAlign: 'center',
                        lineHeight: '95vh'
                    }
                }
            >
                <span className="sp-aph W">W</span>
                <span className="sp-aph e1">e</span>
                <span className="sp-aph l">l</span>
                <span className="sp-aph c">c</span>
                <span className="sp-aph o">o</span>
                <span className="sp-aph m">m</span>
                <span className="sp-aph e2">e</span>
            </div>
        )
    }
    else if (user.email) {
        return <Outlet />

    }
    else {
        return <Login />
    }
};

export default AdminRoute;