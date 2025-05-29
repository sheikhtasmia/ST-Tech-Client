import React, { useContext } from "react";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import lottie from "../../assets/Registar/Animation - 1748547965564.json";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Registration = () => {
  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    if (!photoURL) {
      alert("Please provide a photo URL.");
      return;
    }

    // Step 1: Create User
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // Step 2: Update Profile
        return updateProfile(user, {
          displayName: name,
          photoURL,
        });
      })
      .then(() => {
        alert("Registration successful!");
        form.reset();
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
        alert(`Registration failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e9ff] via-white to-[#d4e0ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 bg-white/60 border border-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl overflow-hidden">

        {/* Lottie Animation */}
        <div className="flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100/30 to-blue-100/30">
          <Lottie animationData={lottie} loop className="w-full h-[500px]" />
        </div>

        {/* Registration Form */}
        <div className="p-8 md:p-12 bg-white/70 backdrop-blur-2xl">
          <div className="flex justify-center mb-6">
            <img className="w-52" src="https://i.ibb.co/HDPgsNx3/download-13.png" alt="Logo" />
          </div>
          <p className="text-center text-gray-500 text-sm mb-6">Create your account to get started</p>

          {/* Google Signup */}
          <button className="flex items-center justify-center gap-3 w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-gray-50 mb-6">
            <FcGoogle className="text-2xl" />
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm text-gray-500 bg-white/70 px-4">or</div>
          </div>

          {/* Form Start */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* Photo URL */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?
            <Link to='/login'>
              <p className="text-indigo-500 hover:underline ml-1 inline-block">Sign in here</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
