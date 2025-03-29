import Lottie from "lottie-react";
import welcome from '../../assets/welcome.json';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingModal from "../../components/LoadingModel"; // Assuming you have a LoadingModal component
import Social from "../../components/socialLogin/SocialLogin";
import bg1 from "../../assets/bg01.jpg";
import { useState } from "react";
import axios from "axios";
import supabase from "../../utils/supabase";

const Register = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle file input change (for profile image upload)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            
            // 1. Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "unsigned_upload"); // Your Cloudinary preset

            const cloudinaryRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dsgzlelwc/image/upload", // Cloudinary API endpoint
                formData
            );

            const imageUrl = cloudinaryRes.data.secure_url;
            console.log("Image uploaded:", imageUrl);

            // 2. Register user with Supabase
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        avatar_url: imageUrl,
                    },
                },
            });

            if (error) {
                throw error; // Handle the error from Supabase
            }

            // 3. Handle response
            console.log("Supabase signup success:", data);

            if (!data.session) {
                Swal.fire({
                    icon: "info",
                    title: "Check your email",
                    text: "We have sent you a confirmation link before Login.",
                });
                navigate("/login");
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Registered successfully",
                    text: "You are now signed in.",
                });
                navigate("/"); // Redirect to homepage or dashboard
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center" style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="sm:h-[600px] w-11/12 max-w-screen-lg mx-auto shadow-2xl shadow-blue-800 flex flex-col sm:flex-row items-center bg-white">
                <div className="back-gradient h-full sm:w-1/2 flex flex-col justify-center items-center max-sm:py-5">
                    <h1 className="text-white font-bold font-serif text-4xl">Join Us Today!</h1>
                    <Lottie animationData={welcome} loop={true} />
                </div>
                <div className="sm:w-1/2 sm:p-10 max-sm:mt-4">
                    <h1 className="font-bold text-xl">Register Now</h1>
                    <p className="text-sm mt-1">If you`re already a member, <Link to="/login"><span className="underline font-bold">Login Now</span></Link></p>
                    <form className="flex flex-col gap-3 mt-5" onSubmit={handleRegister}>
                        <label className="input border-black w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input type="input" required placeholder="Full name" name="fullName" />
                        </label>
                        <label className="input validator border-black w-full">
                            <svg className="h-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="mail@site.com" required name="email" />
                        </label>
                        <label className="input border-black w-full">
                            <svg className="h-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input type="password" required placeholder="Password" name="password" />
                        </label>

                        <div className="flex items-center gap-4 border-1 rounded-md overflow-clip">
                            <label className="btn bg-black text-white hover:bg-white hover:text-black duration-300 rounded-none border-0 border-r-1 border-black">
                                Choose Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} required />
                            </label>
                            <span className="text-sm">{selectedFile ? selectedFile.name : "No photo selected"}</span>
                        </div>
                        <div className="form-control mt-4 w-full">
                            <button type="submit" className="btn bg-black text-white w-full rounded-lg">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div>
                        <Social />
                    </div>
                </div>
            </div>

            {/* Loading Modal */}
            <LoadingModal isLoading={loading}/>
        </div>
    );
};

export default Register;
