import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, Trash2, AlertTriangle, ExternalLink, User, Calendar, Tag } from 'lucide-react';

// API Endpoints
const API_ENDPOINT = 'http://localhost:5000/api/works';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-emerald-500 border-emerald-600';
            case 'error':
                return 'bg-rose-500 border-rose-600';
            case 'info':
                return 'bg-blue-500 border-blue-600';
            default:
                return 'bg-gray-500 border-gray-600';
        }
    };

    return (
        <div className={`fixed top-6 right-6 z-50 ${getStyles()} text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 backdrop-blur-sm bg-opacity-95 transform animate-slide-in`}>
            <div className="flex items-center space-x-3">
                <div className="flex-1">
                    <p className="font-semibold text-sm">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, workName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-rose-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Confirm Deletion</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Are you sure you want to delete <strong>"{workName}"</strong>? This action cannot be undone and all associated data will be permanently removed.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition duration-200 border border-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-rose-600 hover:to-rose-700 transition duration-200 shadow-lg"
                        >
                            Delete Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
    const getStyles = () => {
        const baseStyles = "px-4 py-2 rounded-full text-sm font-semibold capitalize flex items-center space-x-2";

        switch (status?.toLowerCase()) {
            case 'approved':
                return `${baseStyles} bg-emerald-50 text-emerald-700 border border-emerald-200`;
            case 'rejected':
                return `${baseStyles} bg-rose-50 text-rose-700 border border-rose-200`;
            case 'pending':
            default:
                return `${baseStyles} bg-amber-50 text-amber-700 border border-amber-200`;
        }
    };

    const getIcon = () => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return <div className="w-2 h-2 bg-emerald-500 rounded-full" />;
            case 'rejected':
                return <div className="w-2 h-2 bg-rose-500 rounded-full" />;
            default:
                return <div className="w-2 h-2 bg-amber-500 rounded-full" />;
        }
    };

    return (
        <span className={getStyles()}>
            {getIcon()}
            <span>{status || 'pending'}</span>
        </span>
    );
};

// Date Formatter
const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Mobile Card Component
const WorkCard = ({ work, onDelete }) => (
    <div className="bg-white p-6 mb-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 lg:hidden">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-900">{work.workName}</h3>
            <StatusBadge status={work.status} />
        </div>

        <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm">
                <Tag className="w-4 h-4 text-indigo-500" />
                <span className="font-medium text-gray-700">{work.workCategory}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                    <span className="font-medium text-gray-700">{work.submitterName}</span>
                    <span className="text-gray-500 ml-2">({work.submitterEmail})</span>
                </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{formatDate(work.submissionDate)}</span>
            </div>

            {work.workLink && (
                <a
                    href={work.workLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Project</span>
                </a>
            )}

            {work.workDetails && (
                <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed">{work.workDetails}</p>
                </div>
            )}
        </div>

        <button
            onClick={() => onDelete(work)}
            className="mt-6 w-full py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-700 rounded-xl hover:from-rose-50 hover:to-rose-100 hover:border-rose-200 hover:text-rose-700 transition-all duration-200 flex items-center justify-center font-semibold"
        >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Project
        </button>
    </div>
);

const AllWorks = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workToDelete, setWorkToDelete] = useState(null);

    // Fetch works function
    const fetchWorks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_ENDPOINT);
            setWorks(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching works:", err);

            let userFriendlyError = "Unable to connect to the server. Please check if the server is running and the endpoint is correct.";

            if (err.response) {
                userFriendlyError = err.response.data.message || `Server error: Status ${err.response.status}`;
            } else if (err.request) {
                userFriendlyError = `Server offline or incorrect endpoint: ${API_ENDPOINT}`;
            }

            setError(userFriendlyError);
            showToast(`Failed to load projects: ${userFriendlyError}`, 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    // Toast helper function
    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    // Delete handlers
    const handleDelete = (work) => {
        setWorkToDelete(work);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWorkToDelete(null);
    };

    const confirmDelete = async () => {
        if (!workToDelete) return;

        const id = workToDelete._id;
        closeModal();

        showToast('Deleting project...', 'info');

        try {
            await axios.delete(`${API_ENDPOINT}/${id}`);
            await fetchWorks();
            showToast('Project successfully deleted!', 'success');
        } catch (err) {
            console.error("Error deleting work:", err);
            showToast(`Failed to delete project: ${err.response?.data?.message || 'Server error'}`, 'error');
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchWorks();
    }, [fetchWorks]);

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg m-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-indigo-600 text-lg font-semibold">Loading projects...</p>
                    <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-700 px-6 py-8 rounded-2xl mx-auto max-w-4xl mt-6 shadow-lg">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Connection Error</h3>
                    <p className="mb-4">{error}</p>
                    <button
                        onClick={fetchWorks}
                        className="bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 transition duration-200 font-semibold"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (works.length === 0) {
        return (
            <div className="text-center p-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl mx-auto max-w-4xl mt-6 shadow-lg">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Tag className="w-10 h-10 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">No Projects Found</h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                    There are no submitted projects at the moment. As an admin, you'll see projects here once users start submitting their work.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            {/* Header */}
            <div className="max-w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent mb-3">
                      Team Members  Project Submissions
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Admin dashboard to manage all submitted projects
                    </p>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span>Approved: {works.filter(w => w.status === 'approved').length}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <span>Pending: {works.filter(w => w.status === 'pending').length}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                            <span>Rejected: {works.filter(w => w.status === 'rejected').length}</span>
                        </div>
                    </div>
                </div>

                {/* Toast Notification */}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}

                {/* Mobile/Tablet View */}
                <div className="lg:hidden space-y-4">
                    {works.map((work) => (
                        <WorkCard key={work._id} work={work} onDelete={handleDelete} />
                    ))}
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-8 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Project Details
                                    </th>
                                    <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Submitted By
                                    </th>
                                    <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-6 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {works.map((work) => (
                                    <tr key={work._id} className="hover:bg-blue-50 transition-colors duration-150">
                                        <td className="px-8 py-6">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm mb-1">{work.workName}</h3>
                                                {work.workDetails && (
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{work.workDetails}</p>
                                                )}
                                                {work.workLink && (
                                                    <a
                                                        href={work.workLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        <span>View Project</span>
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                                <Tag className="w-3 h-3" />
                                                <span>{work.workCategory}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div>
                                                <div className="font-medium text-gray-900 text-sm">{work.submitterName}</div>
                                                <div className="text-gray-500 text-xs truncate max-w-[160px]">{work.submitterEmail}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <StatusBadge status={work.status} />
                                        </td>
                                        <td className="px-6 py-6 text-sm text-gray-600">
                                            {formatDate(work.submissionDate)}
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <button
                                                onClick={() => handleDelete(work)}
                                                className="inline-flex items-center space-x-2 text-gray-400 hover:text-rose-500 transition-colors duration-200 p-2 hover:bg-rose-50 rounded-lg"
                                                title="Delete project"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmDelete}
                    workName={workToDelete?.workName || "this project"}
                />
            </div>
        </div>
    );
};

export default AllWorks;