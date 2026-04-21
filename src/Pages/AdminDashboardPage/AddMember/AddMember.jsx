import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddMember = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);

            const imageRes = await axiosPublic.post(image_hosting_api, imageFile);
            const imageUrl = imageRes.data.data.display_url;

            const newMember = {
                name: data.name,
                role: data.role,
                description: data.description,
                linkedin: data.linkedin,
                portfolio: data.portfolio,
                photo: imageUrl,
                createdAt: new Date()
            };

            const res = await axiosPublic.post('/members', newMember);

            if (res.data.insertedId) {
                reset();
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white">
            <section className="w-full flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
                        Add New Team Member
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
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

                        {[
                            { name: "name", label: "Member Name", placeholder: "e.g. Sarah Khan" },
                            { name: "role", label: "Member Role", placeholder: "e.g. Backend Developer" },
                            { name: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/username" },
                            { name: "portfolio", label: "Portfolio URL", placeholder: "https://yourwebsite.com" },
                        ].map(field => (
                            <div key={field.name} className="relative">
                                <input
                                    type="text"
                                    placeholder=" "
                                    {...register(field.name, { required: `${field.label} is required` })}
                                    className="peer w-full bg-gray-50 text-gray-900 text-sm sm:text-base px-4 pt-6 pb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <label className="absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
                                    {field.label}
                                </label>
                                {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name].message}</p>}
                            </div>
                        ))}

                        <div className="relative">
                            <textarea
                                placeholder=" "
                                {...register("description", { required: "Description is required" })}
                                className="peer w-full bg-gray-50 text-gray-900 text-sm sm:text-base px-4 pt-6 pb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                            />
                            <label className="absolute left-4 top-2 text-gray-500 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600">
                                Member Description
                            </label>
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="text-start pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-3 rounded-lg shadow-md text-sm sm:text-base flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : 'Add Member'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddMember;