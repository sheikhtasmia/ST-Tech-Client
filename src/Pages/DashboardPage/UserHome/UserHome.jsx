import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Briefcase, CheckCircle, MessageSquare, Loader2 } from 'lucide-react';
import { AuthContext } from '../../../Providers/AuthProvider';

const API_ENDPOINT_WORKS = 'http://localhost:5000/api/works';

const UserHome = () => {
    const { user, loading: authLoading } = useContext(AuthContext);

    const [stats, setStats] = useState({
        totalSubmittedWorks: 0,
        pendingWorks: 0,
        approvedWorks: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userEmail = user?.email;

    useEffect(() => {
        if (authLoading) {
            setLoading(true);
            return;
        }
        if (!userEmail) {
            setError("অনুগ্রহ করে লগইন করুন।");
            setLoading(false);
            return;
        }

        const fetchUserStats = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_ENDPOINT_WORKS}?email=${userEmail}`);
                const works = response.data;

                const totalSubmittedWorks = works.length;
                const pendingWorks = works.filter(work => work.status === 'pending').length;
                const approvedWorks = works.filter(work => work.status === 'approved').length;

                setStats({
                    totalSubmittedWorks,
                    pendingWorks,
                    approvedWorks,
                });

            } catch (err) {
                console.error("Error fetching user stats:", err);
                setError("কাজের ডেটা লোড করতে ব্যর্থ হয়েছে। সার্ভার বা API এন্ডপয়েন্ট চেক করুন।");
            } finally {
                setLoading(false);
            }
        };

        fetchUserStats();
    }, [userEmail, authLoading]);

    const LoadingState = () => (
        <div className="p-8 flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="ml-3 text-lg text-blue-600">ডেটা লোড হচ্ছে...</p>
        </div>
    );

    if (authLoading || loading) {
        return <LoadingState />;
    }

    if (!user || error) {
        return (
            <div className="p-8 text-center bg-red-50 text-red-700 rounded-xl shadow max-w-xl mx-auto mt-10">
                <h2 className="text-2xl font-bold">অ্যাক্সেস প্রত্যাখ্যান</h2>
                <p className="mt-2 text-lg">{error || "অনুগ্রহ করে প্রথমে লগইন করুন।"}</p>
            </div>
        );
    }

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white rounded-2xl p-6 shadow-[0_6px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-300 border border-gray-200 backdrop-blur-xl">
            <div className="flex items-center space-x-5">
                <div className={`p-3 rounded-xl bg-${color}-50`}>
                    <Icon className={`w-8 h-8 text-${color}-600`} />
                </div>
                <div>
                    <p className="text-3xl font-extrabold text-gray-900">{value}</p>
                    <h2 className="text-sm font-semibold text-gray-500 tracking-wider mt-1">{title}</h2>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 sm:p-10 bg-gray-50 min-h-screen font-sans text-gray-900">
            
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-3xl shadow-2xl mb-12">
                <h1 className="text-4xl font-extrabold">স্বাগতম, {user.displayName || 'ইউজার'} 👋</h1>
                <p className="text-md mt-2 opacity-80">{userEmail}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto">
                
                <StatCard
                    title="মোট জমা দেওয়া কাজ"
                    value={stats.totalSubmittedWorks}
                    icon={Briefcase}
                    color="blue"
                />

                <StatCard
                    title="অনুমোদিত কাজ"
                    value={stats.approvedWorks}
                    icon={CheckCircle}
                    color="green"
                />

            </div>
        </div>
    );
};

export default UserHome;
