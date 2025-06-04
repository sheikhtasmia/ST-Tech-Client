import React, { useContext, useState, useEffect } from "react";
import { FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
  const { user, loading, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success alert for 1 second
  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => setShowSuccess(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        {/* uiverse.io spinner - "CirclePulse" from https://uiverse.io */}
        <div className="circle-pulse">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <style>{`
          .circle-pulse {
            position: relative;
            width: 80px;
            height: 80px;
          }
          .circle-pulse span {
            position: absolute;
            border: 4px solid #4f46e5;
            opacity: 0.6;
            border-radius: 50%;
            animation: pulse 1.5s infinite;
          }
          .circle-pulse span:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 0;
            left: 0;
            animation-delay: 0s;
          }
          .circle-pulse span:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 10px;
            left: 10px;
            animation-delay: 0.3s;
          }
          .circle-pulse span:nth-child(3) {
            width: 40px;
            height: 40px;
            top: 20px;
            left: 20px;
            animation-delay: 0.6s;
          }
          .circle-pulse span:nth-child(4) {
            width: 20px;
            height: 20px;
            top: 30px;
            left: 30px;
            animation-delay: 0.9s;
          }
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.2);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 0.6;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-start items-start h-screen bg-gray-50 text-gray-600 text-xl">
        Please log in to view your profile.
      </div>
    );
  }

  const handleSave = async () => {
    setError(null);
    setUpdating(true);
    try {
      await updateUserProfile({ displayName, photoURL });
      setIsEditing(false);
      setShowSuccess(true); // show success alert
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
    setError(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 bg-white p-10 rounded-3xl shadow-xl border border-indigo-200 relative">
      {/* Success Alert */}
      {showSuccess && (
        <div className="absolute top-5 right-5 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg font-semibold animate-fadeInOut">
          Profile updated successfully!
          <style>{`
            @keyframes fadeInOut {
              0% {opacity: 0; transform: translateY(-10px);}
              10%, 90% {opacity: 1; transform: translateY(0);}
              100% {opacity: 0; transform: translateY(-10px);}
            }
            .animate-fadeInOut {
              animation: fadeInOut 1s ease forwards;
            }
          `}</style>
        </div>
      )}

      <div className="flex flex-col items-center gap-8">
        {/* Profile Image */}
        <img
          src={photoURL || "https://i.ibb.co/ZYW3VTp/default-avatar.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Display Name or Edit Input */}
        <div className="w-full text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                className="w-full border border-indigo-300 rounded-lg px-4 py-2 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display Name"
              />
              <input
                type="text"
                className="w-full mt-5 border border-indigo-300 rounded-lg px-4 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo URL"
              />
              {error && (
                <p className="text-red-600 mt-3 text-sm font-semibold">{error}</p>
              )}
            </>
          ) : (
            <h2 className="text-3xl font-extrabold text-gray-900 select-text">
              {user.displayName || "No Name Provided"}
            </h2>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={updating}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg transition transform active:scale-95"
              >
                <FaSave size={20} />
                Save
              </button>
              <button
                onClick={handleCancel}
                disabled={updating}
                className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold flex items-center gap-3 shadow transition transform active:scale-95"
              >
                <FaTimes size={20} />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-lg transition transform active:scale-95"
            >
              <FaUserEdit size={20} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
