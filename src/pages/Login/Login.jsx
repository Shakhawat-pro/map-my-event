import Lottie from "lottie-react";
import welcome from '../../assets/welcome.json'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import Social from "../../components/socialLogin/SocialLogin";
import bg1 from "../../assets/bg01.jpg";


const Login = () => {

    return (
        <div className="h-screen flex justify-center items-center " style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
            <div className="sm:h-[600px] w-11/12 max-w-screen-lg mx-auto shadow-2xl shadow-blue-800 flex flex-col  sm:flex-row-reverse items-center bg-white"  >
                <div className="back-gradient h-full sm:w-1/2 flex flex-col justify-center items-center max-sm:py-5" >
                    <h1 className="text-white font-bold font-serif text-4xl">Welcome Back!</h1>
                    <Lottie animationData={welcome} loop={true} />
                </div>
                <div className="sm:w-1/2 sm:p-10  max-sm:mt-4">
                    <h1 className="font-bold text-xl">Login Now</h1>
                    <p className="text-sm mt-1">Don`t have an account? <Link to={'/register'}><span className="underline font-bold">Create Now</span></Link></p>

                    <div className="divider"> OR</div>
                    <div className="">
                        <Social></Social>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;