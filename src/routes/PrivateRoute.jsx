import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if(loading){
        return <div className="text-center flex justify-center items-center"><span className="loading text-black loading-infinity w-32"></span></div>
    }
    
    if(user){
        return children
    }

    return <Navigate to="/login" state={location.pathname} replace></Navigate>
};

export default PrivateRoute;
