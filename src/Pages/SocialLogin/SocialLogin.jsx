import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { fireConfetti } from '../utils/confetti';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name:result.user?.displayName
                }
                axiosPublic.post('/user', userInfo)
                .then(res =>{
                    console.log(res.data)
                    navigate('/')
                }) 

                // 1. Fire confetti
                fireConfetti();

                // 2. Play success sound
                const audio = new Audio("/sounds/login-success.mp3");
                audio.play();

                // 3. Show custom toast
                toast.custom(
                    (t) => (
                        <div
                            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                } max-w-md w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 transition-all duration-500`}
                        >
                            <div className="flex-1 w-0 p-4">
                                <div className="flex items-center space-x-4">
                                    <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Success" className="w-10 h-10" />
                                    <div className="text-white font-semibold text-lg">
                                        Welcome back, {result.user.displayName || "User"}! 🎉
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                    { duration: 4000 }
                );

                // 4. Navigate after short delay
                setTimeout(() => {
                    navigate('/');
                }, 4100);
            })
            .catch(error => {
                console.error("Google login error:", error.message);
                toast.error(`❌ Google login failed: ${error.message}`);
            });
    };


    return (
        <div>
            {/* Google Signup */}
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-gray-50 mb-6"
            >
                <FcGoogle className="text-2xl" />
                <span className="text-sm font-medium">Sign up with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;