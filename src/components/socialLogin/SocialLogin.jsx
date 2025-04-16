import { useContext } from "react";
import { FaGooglePlusG } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Social = () => {
    const { signInWithGoogle } = useContext(AuthContext)



    const handleGoogle = () => {
        signInWithGoogle()
            // .then(result => {
            //     console.log(result);
            //     // const userInfo = {
            //     //     email: result.user?.email,
            //     //     name: result.user?.displayName,
            //     //     profilePicture: result.user?.photoURL,
            //     //     role: 'user',
            //     //     premiumTaken: null
            //     // }

            //     // axiosPublic.post('/users', userInfo)
            //     //     .then((res) => {
            //     //         console.log(res.data);
            //     //         {
            //     //             location.state ? navigate(location.state) : navigate('/')
            //     //         }
            //     //     })
            // })
    }

    return (
        <div onClick={handleGoogle} className="btn w-full bg-transparent border-black rounded-lg"><FaGooglePlusG className="text-2xl" /> Continue with Google </div>
    );
};

export default Social;