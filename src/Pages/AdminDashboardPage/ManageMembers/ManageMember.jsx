import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ManageMember = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await axiosPublic.get('/members');
            setMembers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Member?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete',
            customClass: { popup: 'rounded-2xl' }
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('access-token');
                await axiosPublic.delete(`/members/${id}`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                Swal.fire({ title: 'Deleted!', icon: 'success', customClass: { popup: 'rounded-2xl' } });
                fetchMembers();
            } catch (err) {
                Swal.fire('Error!', 'Failed to delete.', 'error');
            }
        }
    };

    const handleUpdate = async (member) => {
        const { value: formValues } = await Swal.fire({
            title: 'Update Profile',
            html: `
                <div class="space-y-3">
                    <input id="sw-name" class="swal2-input !m-0 !w-full" placeholder="Name" value="${member.name}">
                    <input id="sw-role" class="swal2-input !m-0 !w-full" placeholder="Role" value="${member.role}">
                    <input id="sw-linkedin" class="swal2-input !m-0 !w-full" placeholder="LinkedIn URL" value="${member.linkedin || ''}">
                    <input id="sw-portfolio" class="swal2-input !m-0 !w-full" placeholder="Portfolio URL" value="${member.portfolio || ''}">
                    <textarea id="sw-desc" class="swal2-textarea !m-0 !w-full !h-24" placeholder="Short Bio">${member.description || ''}</textarea>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            confirmButtonColor: '#3b82f6',
            customClass: { popup: 'rounded-2xl' },
            preConfirm: () => ({
                name: document.getElementById('sw-name').value,
                role: document.getElementById('sw-role').value,
                linkedin: document.getElementById('sw-linkedin').value,
                portfolio: document.getElementById('sw-portfolio').value,
                description: document.getElementById('sw-desc').value,
            })
        });

        if (formValues) {
            try {
                const token = localStorage.getItem('access-token');
                const res = await axiosPublic.patch(`/members/${member._id}`, formValues, {
                    headers: { authorization: `Bearer ${token}` }
                });

                // backend logic modifiedCount er jaygay matchedCount check korsi 
                if (res.data.matchedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Updated successfully',
                        timer: 1500,
                        showConfirmButton: false,
                        customClass: { popup: 'rounded-2xl' }
                    });
                    fetchMembers();
                }
            } catch (err) {
                Swal.fire('Error!', 'Update failed.', 'error');
            }
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="max-w-full mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Manage Members</h2>
                    <div className="text-sm font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-lg">
                        Total: {members.length}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Member</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 text-center font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="3" className="text-center p-10 text-gray-400">Loading members...</td></tr>
                            ) : (
                                members.map(member => (
                                    <tr key={member._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={member.photo} className="w-10 h-10 rounded-full object-cover shadow-sm" alt="" />
                                                <span className="font-medium text-gray-800">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{member.role}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleUpdate(member)} className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition text-sm font-medium">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(member._id)} className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition text-sm font-medium">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMember;