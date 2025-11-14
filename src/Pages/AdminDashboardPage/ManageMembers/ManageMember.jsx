import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageMember = () => {
    const [members, setMembers] = useState([]);

    // Load members on mount
    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/members'); // Replace with your backend
            setMembers(res.data);
        } catch (err) {
            console.error('Error fetching team members:', err);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the team member!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/members/${id}`);
                Swal.fire('Deleted!', 'Team member has been deleted.', 'success');
                fetchMembers(); // Refresh data
            } catch (err) {
                Swal.fire('Error!', 'Failed to delete member.', 'error');
            }
        }
    };

    const handleUpdate = (member) => {
        // You can open a modal here or redirect
        console.log("Update member:", member);
        Swal.fire('Update Clicked', `You clicked update for ${member.name}`, 'info');
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Team Members</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 border-b">Photo</th>
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Role</th>
                            <th className="p-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member._id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="p-3 border-b font-medium">{member.name}</td>
                                <td className="p-3 border-b">{member.role}</td>
                                <td className="p-3 border-b text-center space-x-2">
                                    <button
                                        onClick={() => handleUpdate(member)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {members.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No team members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMember;
