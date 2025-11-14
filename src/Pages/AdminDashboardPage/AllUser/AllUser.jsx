import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user');
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        try {
            const res = await axiosSecure.patch(`/user/admin/${user._id}`, {
                role: "admin"
            });

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is now Admin!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Already Admin',
                    text: `${user.name} is already an admin`
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update role'
            });
        }
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/user/${user._id}`);

                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f7fe] to-[#e0e7ff] px-4 py-10 md:px-10">
            <div className="max-w-full mx-auto">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">👥 All Users</h1>
                    <p className="text-xl text-gray-600">
                        Total Users: <span className="text-blue-600 font-semibold">{users.length}</span>
                    </p>
                </div>

                <div className="bg-white/30 backdrop-blur-md shadow-xl rounded-2xl overflow-x-auto border border-white/40">
                    <table className="w-full text-sm md:text-base text-left table-auto">
                        <thead className="bg-white/50 border-b border-white/40 text-gray-700 uppercase tracking-wider text-xs">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="transition hover:bg-white/60 border-b border-white/20">
                                    <td className="px-6 py-4 font-semibold text-gray-800">{index + 1}</td>
                                    <td className="px-6 py-4 text-gray-700">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>

                                    <td className="px-6 py-4">
                                        {user.role === 'admin' ? (
                                            <span className="text-green-600 font-semibold">Admin</span>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-md hover:scale-105 transition-transform"
                                            >
                                                <FaUser />
                                                Make Admin
                                            </button>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="flex items-center gap-2 px-3 py-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
                                        >
                                            <FaTrashAlt />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllUser;
