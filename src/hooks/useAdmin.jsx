import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useContext(AuthContext)
    const {data, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/admin/isAdmin?email=${user.email}`)
            return res.data
        },
    })
    return {
        isAdmin : data?.isAdmin || false,
        isAdminLoading
    }
};

export default useAdmin;