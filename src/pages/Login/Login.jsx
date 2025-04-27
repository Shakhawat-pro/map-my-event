import Lottie from "lottie-react";
import welcome from '../../assets/welcome.json'
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import Social from "../../components/socialLogin/SocialLogin";
import bg1 from "../../assets/bg01.jpg";
import { useContext } from "react";


const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;


        try {
            await signInUser(email, password);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                showConfirmButton: false,
            });
            navigate("/");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong!",
            });
        }


    }

    return (
        <div className="h-screen flex justify-center items-center " style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
            <div className="sm:h-[600px] w-11/12 max-w-screen-lg mx-auto shadow-2xl shadow-blue-800 flex flex-col  sm:flex-row-reverse items-center bg-white"  >
                <div className="back-gradient h-full sm:w-1/2 flex flex-col justify-center items-center max-sm:py-5" >
                    <h1 className="text-white font-bold font-serif text-4xl">Welcome Back!</h1>
                    <Lottie animationData={welcome} loop={true} />
                </div>
                <div className=" sm:w-1/2 sm:p-10 pt-0  max-sm:mt-4 " onSubmit={handleLogin}>
                    <Link to={'/'} className="flex items-center justify-center mb-5 btn btn-ghost">
                        <img
                            src="/logo.png"
                            alt="ConfMap Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                    <h1 className="font-bold text-xl">Login Now</h1>
                    <p className="text-sm mt-1">Don`t have an account? <Link to={'/register'}><span className="underline font-bold">Create Now</span></Link></p>
                    <form className="flex flex-col gap-3 mt-5">
                        <label className="input validator border-black w-full ">
                            <svg className="h-[1em] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                            <input type="email" placeholder="mail@site.com" name="email" required />
                        </label>
                        <label className="input border-black w-full">
                            <svg className="h-[1em] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                            <input type="password" required placeholder="Password" name="password" />
                        </label>

                        <div className="form-control mt-4 w-full">
                            <button type="submit" className="btn bg-black text-white w-full rounded-lg">Login</button>
                        </div>
                    </form>
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