import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPortfolio = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            // ✅ Upload Brand Logo
            const logoFile = new FormData();
            logoFile.append('image', data.image[0]);
            const logoRes = await axiosPublic.post(image_hosting_api, logoFile);
            const logoUrl = logoRes.data.data.display_url;

            // ✅ Upload Project Thumbnail
            const thumbFile = new FormData();
            thumbFile.append('image', data.thumbnail[0]);
            const thumbRes = await axiosPublic.post(image_hosting_api, thumbFile);
            const thumbnailUrl = thumbRes.data.data.display_url;

            // ✅ Prepare project data
            const newProject = {
                brandName: data.brandName,
                facebook: data.facebook,
                website: data.website,
                Description: data.Description,
                brandLogo: logoUrl,
                thumbnail: thumbnailUrl,
                createdAt: new Date(),
            };

            // ✅ Save to database
            const res = await axiosPublic.post('/projects', newProject);

            if (res.data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Project added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while adding the project.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Header */}
            <header className="w-full px-6 py-4 shadow-sm border-b bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src="https://i.ibb.co/HDPgsNx3/download-13.png"
                        alt="Logo"
                        className="h-10 w-10"
                    />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        ST Tech | Add Project
                    </h1>
                </div>
            </header>

            {/* Form Section */}
            <section className="w-full flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
                        Add New Project
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
                        {/* Upload Brand Logo */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Upload Brand Logo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image", { required: "Brand logo is required" })}
                                className="w-full text-sm text-gray-700 file:bg-blue-600 file:hover:bg-blue-700 file:border-none file:px-4 file:py-2 file:rounded-md file:text-white file:font-medium bg-gray-50 border border-gray-300 rounded-md p-2"
                            />
                            {errors.image && (
                                <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>
                            )}
                        </div>

                        {/* Upload Project Thumbnail */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Upload Project Thumbnail
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("thumbnail", { required: "Thumbnail is required" })}
                                className="w-full text-sm text-gray-700 file:bg-green-600 file:hover:bg-green-700 file:border-none file:px-4 file:py-2 file:rounded-md file:text-white file:font-medium bg-gray-50 border border-gray-300 rounded-md p-2"
                            />
                            {errors.thumbnail && (
                                <p className="text-xs text-red-500 mt-1">{errors.thumbnail.message}</p>
                            )}
                        </div>

                        {/* Text Inputs */}
                        {[
                            { name: "brandName", label: "Brand Name", placeholder: "e.g. Meta Inc." },
                            { name: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/brand" },
                            { name: "website", label: "Website URL", placeholder: "https://brand.com" },
                            { name: "Description", label: "Description", placeholder: "Write details here..." },
                        ].map((field) => (
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
                                {errors[field.name] && (
                                    <p className="text-xs text-red-500 mt-1">{errors[field.name].message}</p>
                                )}
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="text-start pt-4">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-3 rounded-lg shadow-md text-sm sm:text-base"
                            >
                                Add Project
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddPortfolio;
