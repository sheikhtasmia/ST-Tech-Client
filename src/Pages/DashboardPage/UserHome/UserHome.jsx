import React, { useContext } from 'react';
import { Briefcase, CheckCircle, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../../providers/AuthProvider';

const UserHome = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null; // If not logged in, render nothing

  return (
    <div className="p-4 bg-gray-50 min-h-screen dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold mb-1">
          Welcome back, {user.displayName || 'User'}!
        </h1>
        <p className="text-sm text-blue-100">
          Here’s what’s happening in your workspace today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Briefcase className="w-10 h-10 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Ongoing Projects</h2>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
            <div>
              <h2 className="text-lg font-semibold">Completed Tasks</h2>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <MessageSquare className="w-10 h-10 text-yellow-500" />
            <div>
              <h2 className="text-lg font-semibold">New Messages</h2>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
