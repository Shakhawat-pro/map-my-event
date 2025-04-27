import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../context/AuthContext";
import useAdmin from "../hooks/useAdmin";



const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const {isAdmin, isAdminLoading }= useAdmin();

    if (loading || isAdminLoading) {
        return <div className="text-center h-screen flex justify-center items-center"><span className="loading text-black loading-infinity w-32"></span></div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={'/'} replace></Navigate>

};

export default AdminRoute;

AdminRoute.propTypes = {
    children: PropTypes.node
};