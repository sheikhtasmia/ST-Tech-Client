import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMember = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // 1. Upload Image
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);

            const imageRes = await axiosPublic.post(image_hosting_api, imageFile);
            const imageUrl = imageRes.data.data.display_url;

            // 2. Prepare new member data with description
            const newMember = {
                name: data.name,
                role: data.role,
                linkedin: data.linkedin,
                portfolio: data.portfolio,
                description: data.description, // ✅ Added description
                photo: imageUrl,
                createdAt: new Date()
            };

            // 3. Save to backend
            const res = await axiosPublic.post('/members', newMember);

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Member added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while adding the member.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    };

    return (
        <div className="min-h-screen w-full bg-white">
            <header className="w-full px-6 py-4 shadow-sm border-b flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                    <img src="https://i.ibb.co/HDPgsNx3/download-13.png" alt="Logo" className="h-10 w-10" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">ST Tech | Add Member</h1>
                </div>
            </header>

            <section className="w-full flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
                        Add New Team Member
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
                        {/* Upload Photo */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image", { required: "Photo is required" })}
                                className="w-full text-sm text-gray-700 file:bg-blue-600 file:hover:bg-blue-700 file:border-none file:px-4 file:py-2 file:rounded-md file:text-white file:font-medium bg-gray-50 border border-gray-300 rounded-md p-2"
                            />
                            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
                        </div>

                        {/* Input Fields */}
                        {[
                            { name: "name", label: "Member Name", placeholder: "e.g. Sarah Khan" },
                            { name: "role", label: "Member Role", placeholder: "e.g. Backend Developer" },
                            { name: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/username" },
                            { name: "portfolio", label: "Portfolio URL", placeholder: "https://yourwebsite.com" },
                            { name: "description", label: "Description", placeholder: "Brief intro about the member" }, // ✅ Description field
                        ].map(field => (
                            <div key={field.name} className="relative">
                                {field.name !== "description" ? (
                                    <input
                                        type="text"
                                        placeholder=" "
                                        {...register(field.name, { required: `${field.label} is required` })}
                                        className="peer w-full bg-gray-50 text-gray-900 text-sm sm:text-base px-4 pt-6 pb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                ) : (
                                    <textarea
                                        placeholder=" "
                                        {...register(field.name, { required: `${field.label} is required` })}
                                        className="peer w-full bg-gray-50 text-gray-900 text-sm sm:text-base px-4 pt-6 pb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                                    />
                                )}

                                <label className="absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
                                    {field.label}
                                </label>
                                {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name].message}</p>}
                            </div>
                        ))}

                        <div className="text-start pt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-3 rounded-lg shadow-md text-sm sm:text-base"
                            >
                                Add Member
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddMember;
