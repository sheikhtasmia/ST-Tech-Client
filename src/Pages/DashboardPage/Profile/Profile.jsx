// import React, { useContext, useState, useEffect } from "react";
// import { FaUserEdit, FaSave, FaTimes, FaEnvelope, FaUser, FaCheckCircle, FaCamera } from "react-icons/fa";
// import { AuthContext } from "../../../Providers/AuthProvider";

// const Profile = () => {
//   const { user, loading, updateUserProfile } = useContext(AuthContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [displayName, setDisplayName] = useState(user?.displayName || "");
//   const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   useEffect(() => {
//     setDisplayName(user?.displayName || "");
//     setPhotoURL(user?.photoURL || "");
//   }, [user]);

//   useEffect(() => {
//     let timer;
//     if (showSuccess) {
//       timer = setTimeout(() => setShowSuccess(false), 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [showSuccess]);

//   const handleSave = async () => {
//     setError(null);
//     if (!displayName) {
//       setError("Display Name cannot be empty.");
//       return;
//     }
//     setUpdating(true);
//     try {
//       await updateUserProfile({ displayName, photoURL });
//       setIsEditing(false);
//       setShowSuccess(true);
//     } catch (err) {
//       setError(err.message || "Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleCancel = () => {
//     setDisplayName(user.displayName || "");
//     setPhotoURL(user.photoURL || "");
//     setError(null);
//     setIsEditing(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg font-medium">Loading profile data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//         <div className="text-center p-12 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
//           <FaUser className="text-red-500 text-4xl mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
//           <p className="text-gray-600">Please log in to view and edit your profile.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {showSuccess && (
//         <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in-down">
//           <FaCheckCircle className="text-xl" />
//           <div>
//             <p className="font-semibold">Success!</p>
//             <p className="text-sm opacity-90">Profile updated successfully</p>
//           </div>
//           <div className="w-full bg-white/20 h-1 absolute bottom-0 left-0 animate-progress"></div>
//         </div>
//       )}

//       <div className="max-w-full mx-auto">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             <FaUser className="inline-block mr-3 align-text-bottom" /> User Profile
//           </h1>
//           <p className="text-gray-600 text-lg max-w-lg mx-auto">
//             Your essential account information (Managed by Authentication Provider).
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           <div className="lg:col-span-1">
//             <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sticky lg:top-8">
//               <div className="text-center">
//                 <div className="relative inline-block mb-6">
//                   <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
//                     <img
//                       src={
//                         photoURL ||
//                         `https://ui-avatars.com/api/?name=${displayName || 'User'}&background=4F46E5&color=ffffff&size=128&bold=true&font-size=0.5`
//                       }
//                       alt="Profile"
//                       className="w-full h-full rounded-3xl object-cover border-4 border-white transition-all duration-300"
//                     />
//                   </div>
//                   {isEditing && (
//                     <div className="absolute bottom-0 right-0 p-3 bg-white rounded-full shadow-md text-sm text-gray-500">
//                       Edit mode
//                     </div>
//                   )}
//                 </div>

//                 <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
//                   {displayName || "No Name Set"}
//                 </h2>

//                 <div className="space-y-3 pt-4 border-t border-gray-200 mx-auto max-w-xs">
//                   <div className="flex items-center justify-center gap-2 text-gray-600">
//                     <FaEnvelope className="text-indigo-500 flex-shrink-0" />
//                     <span className="truncate text-sm">{user.email || "N/A"}</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2 text-gray-600">
//                     <FaCheckCircle className="text-indigo-500 flex-shrink-0" />
//                     <span className="font-medium text-gray-800 text-sm">
//                       Joined: {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Unknown"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
//               <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
//                 <h3 className="text-3xl font-bold text-gray-800">
//                   Update Authentication Details
//                 </h3>
//                 {!isEditing ? (
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-7 py-3 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
//                   >
//                     <FaUserEdit className="text-xl" />
//                     Edit Profile
//                   </button>
//                 ) : (
//                   <div className="flex gap-4">
//                     <button
//                       onClick={handleCancel}
//                       disabled={updating}
//                       className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-700 px-7 py-3 rounded-full font-semibold flex items-center gap-3 shadow transition-all duration-300 active:scale-95"
//                     >
//                       <FaTimes />
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleSave}
//                       disabled={updating}
//                       className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white px-7 py-3 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
//                     >
//                       <FaSave />
//                       {updating ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {error && (
//                 <div className="mb-8 bg-red-100 border border-red-300 rounded-xl p-5 shadow-inner">
//                   <p className="text-red-700 text-base font-medium">⚠️ Error: {error}</p>
//                 </div>
//               )}

//               <div className="space-y-8">
//                 <ProfileInputField
//                   icon={<FaUser />}
//                   label="Display Name"
//                   value={displayName}
//                   isEditing={isEditing}
//                   onChange={(e) => setDisplayName(e.target.value)}
//                   placeholder="Enter your display name"
//                 />

//                 <ProfileInputField
//                   icon={<FaCamera />}
//                   label="Photo URL"
//                   value={photoURL}
//                   isEditing={isEditing}
//                   onChange={(e) => setPhotoURL(e.target.value)}
//                   placeholder="Enter image URL"
//                 />

//                 <ProfileInputField
//                   icon={<FaEnvelope />}
//                   label="Email Address (Read-only)"
//                   value={user.email}
//                   isEditing={false}
//                   readOnlyValue={user.email}
//                   helperText="Email is managed by the Authentication Provider and cannot be changed here."
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//                 @keyframes fade-in-down {
//                     0% { opacity: 0; transform: translateY(-20px); }
//                     100% { opacity: 1; transform: translateY(0); }
//                 }
//                 @keyframes progress {
//                     0% { width: 100%; }
//                     100% { width: 0%; }
//                 }
//                 .animate-fade-in-down {
//                     animation: fade-in-down 0.5s ease-out;
//                 }
//                 .animate-progress {
//                     animation: progress 3s linear forwards;
//                 }
//             `}</style>
//     </div>
//   );
// };

// export default Profile;

// const ProfileInputField = ({ icon, label, value, isEditing, onChange, placeholder, type = 'text', helperText, readOnlyValue }) => {
//   const isReadOnly = !isEditing || readOnlyValue;
//   return (
//     <div className="group">
//       <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
//         {icon}
//         {label}
//       </label>
//       {isReadOnly ? (
//         <div className={`w-full ${readOnlyValue ? 'bg-gray-100/70 text-gray-600' : 'bg-gray-50/50 text-gray-800 font-semibold'} border-2 border-transparent rounded-2xl px-6 py-4 transition-all duration-200`}>
//           {readOnlyValue || value || "Not set"}
//         </div>
//       ) : (
//         <input
//           type={type}
//           className="w-full bg-white/50 border-2 border-gray-200 focus:border-indigo-500 rounded-2xl px-6 py-4 text-lg font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300"
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//         />
//       )}
//       {helperText && <p className="text-xs text-gray-500 mt-2 ml-1">{helperText}</p>}
//     </div>
//   );
// };



import React, { useContext, useState, useEffect } from "react";
import { FaUserEdit, FaSave, FaTimes, FaEnvelope, FaUser, FaCheckCircle, FaCamera } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
  const { user, loading, updateUserProfile } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const BACKEND_URL = "http://localhost:5000";
  const IMGBB_KEY = "fef551d0252d6e6b41362bdb5b2b0f99";

  useEffect(() => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  }, [user]);

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => setShowSuccess(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const uploadToImgbb = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setPhotoURL(data.data.url);
  };

  const saveToMongoDB = async () => {
    await fetch(`${BACKEND_URL}/updateUser/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: displayName,
        photoURL: photoURL,
        email: user.email,
      }),
    });
  };

  const handleSave = async () => {
    setError(null);

    if (!displayName) {
      setError("Display Name cannot be empty.");
      return;
    }

    setUpdating(true);

    try {
      await updateUserProfile({ displayName, photoURL });
      await saveToMongoDB();

      setIsEditing(false);
      setShowSuccess(true);
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center p-12 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
          <FaUser className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to view and edit your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in-down">
          <FaCheckCircle className="text-xl" />
          <div>
            <p className="font-semibold">Success!</p>
            <p className="text-sm opacity-90">Profile updated successfully</p>
          </div>
          <div className="w-full bg-white/20 h-1 absolute bottom-0 left-0 animate-progress"></div>
        </div>
      )}

      <div className="max-w-full mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <FaUser className="inline-block mr-3 align-text-bottom" />   Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            Your essential account information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sticky lg:top-8">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
                    <img
                      src={
                        photoURL ||
                        `https://ui-avatars.com/api/?name=${displayName || "User"}&background=4F46E5&color=ffffff&size=128&bold=true&font-size=0.5`
                      }
                      alt="Profile"
                      className="w-full h-full rounded-3xl object-cover border-4 border-white transition-all duration-300"
                    />
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-3 shadow cursor-pointer">
                      <FaCamera className="text-gray-700" />
                      <input type="file" onChange={uploadToImgbb} className="hidden" />
                    </label>
                  )}
                </div>

                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                  {displayName || "No Name Set"}
                </h2>

                <div className="space-y-3 pt-4 border-t border-gray-200 mx-auto max-w-xs">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FaEnvelope className="text-indigo-500 flex-shrink-0" />
                    <span className="truncate text-sm">{user.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-indigo-500 flex-shrink-0" />
                    <span className="font-medium text-gray-800 text-sm">
                      Joined:{" "}
                      {user.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                <h3 className="text-3xl font-bold text-gray-800">Update Authentication Details</h3>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-7 py-3 rounded-full font-semibold flex items-center gap-3 shadow-lg"
                  >
                    <FaUserEdit className="text-xl" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={handleCancel}
                      disabled={updating}
                      className="bg-gray-300 text-gray-700 px-7 py-3 rounded-full font-semibold flex items-center gap-3"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={updating}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-7 py-3 rounded-full font-semibold flex items-center gap-3"
                    >
                      <FaSave />
                      {updating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="mb-8 bg-red-100 border border-red-300 rounded-xl p-5">
                  <p className="text-red-700 text-base font-medium">⚠️ Error: {error}</p>
                </div>
              )}

              <div className="space-y-8">
                <ProfileInputField
                  icon={<FaUser />}
                  label="Display Name"
                  value={displayName}
                  isEditing={isEditing}
                  onChange={(e) => setDisplayName(e.target.value)}
                />

                <ProfileInputField
                  icon={<FaCamera />}
                  label="Photo URL"
                  value={photoURL}
                  isEditing={isEditing}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />

                <ProfileInputField
                  icon={<FaEnvelope />}
                  label="Email Address (Read-only)"
                  value={user.email}
                  isEditing={false}
                  readOnlyValue={user.email}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes progress {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Profile;

const ProfileInputField = ({
  icon,
  label,
  value,
  isEditing,
  onChange,
  placeholder,
  type = "text",
  helperText,
  readOnlyValue,
}) => {
  const isReadOnly = !isEditing || readOnlyValue;
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
        {icon}
        {label}
      </label>
      {isReadOnly ? (
        <div
          className={`w-full ${readOnlyValue
            ? "bg-gray-100/70 text-gray-600"
            : "bg-gray-50/50 text-gray-800 font-semibold"
            } border-2 border-transparent rounded-2xl px-6 py-4`}
        >
          {readOnlyValue || value || "Not set"}
        </div>
      ) : (
        <input
          type={type}
          className="w-full bg-white/50 border-2 border-gray-200 focus:border-indigo-500 rounded-2xl px-6 py-4 text-lg font-semibold text-gray-800"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {helperText && <p className="text-xs text-gray-500 mt-2 ml-1">{helperText}</p>}
    </div>
  );
};
