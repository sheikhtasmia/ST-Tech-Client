import React, { useContext } from "react";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import lottie from "../../assets/login/Animation - 1748543567206.json";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {

    const {signIn} = useContext(AuthContext)


    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email,password)
        .then(result =>{
            const user = result.user;
            console.log(user);
        })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-white to-[#e4ecff] flex items-center justify-center px-4 py-10">
            <div className="relative max-w-full w-full grid grid-cols-1 md:grid-cols-2 bg-white/40 border border-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl overflow-hidden">

                {/* Left - Lottie */}
                <div className="flex items-center justify-center px-6 py-8 bg-gradient-to-br from-blue-100/40 via-white/20 to-indigo-100/40">
                    <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
                        <Lottie animationData={lottie} loop className="w-full h-full" />
                    </div>
                </div>

                {/* Right - Form */}
                <div className="p-8 md:p-10 bg-white/60 backdrop-blur-2xl">
                    <div className="flex justify-center mb-4">
                        <img className="w-[220px]" src="https://i.ibb.co/HDPgsNx3/download-13.png" alt="logo" />
                    </div>
                    <p className="text-gray-500 text-sm text-center mb-5">Strategic communication starts here.</p>

                    {/* Google Login */}
                    <div className="mb-5">
                        <button className="flex items-center justify-center gap-3 w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow hover:shadow-md transition-all hover:bg-gray-50">
                            <FcGoogle className="text-2xl" />
                            <span className="text-sm font-medium">Continue with Google</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm text-gray-500 bg-white/60 px-4">or</div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                required
                            />
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-5 text-sm text-gray-600 text-center">
                        Don’t have an account?
                     <Link to='/registration'>
                        <p  className="text-indigo-500 hover:underline ml-1">Register here</p>
                     </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
