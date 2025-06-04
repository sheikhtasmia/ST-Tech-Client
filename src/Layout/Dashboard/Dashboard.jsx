import React, { useState, useContext } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  FaHome,
  FaPlusCircle,
  FaFolderOpen,
  FaUserCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider'; // Adjust if needed

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-md"
      >
        {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        ${collapsed ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-2xl flex flex-col transition-all duration-300
        fixed md:static h-auto z-40 transform ease-in-out
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-lg">
                <img 
                  className="w-8 h-8 rounded-lg object-contain" 
                  src="https://i.ibb.co/HDPgsNx3/download-13.png" 
                  alt="Logo" 
                />
              </div>
              <h2 className="text-lg font-bold tracking-tight">St-Tech Panel</h2>
            </div>
          )}
          <button 
            onClick={toggleSidebar}
            className="hidden md:block text-indigo-200 hover:text-white transition"
          >
            <FaBars />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-indigo-700">
          {user ? (
            <div className="relative group w-fit ">
              <img 
                src={user.photoURL || 'https://i.ibb.co/ZYW3VTp/default-avatar.png'} 
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform duration-300 group-hover:scale-105"
              />
              {/* Name Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1 bg-white text-indigo-800 text-xs font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 whitespace-nowrap">
                {user.displayName || 'User'}
              </div>
            </div>
          ) : (
            <Link 
              to="/login"
              className="block text-center bg-white text-indigo-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-indigo-100 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-4 space-y-1 mt-2">
          {[
            { to: '/dashboard/userhome', icon: <FaHome size={18} />, label: 'User Home' },
            { to: '/dashboard/userWork', icon: <FaPlusCircle size={18} />, label: 'Add Work' },
            { to: '/dashboard/work', icon: <FaFolderOpen size={18} />, label: 'My Work' },
            { to: '/dashboard/profile', icon: <FaUserCircle size={18} />, label: 'My Profile' },
          ].map(({ to, icon, label }) => (
            <NavLink 
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group 
                ${isActive 
                  ? 'bg-white text-indigo-700 shadow-lg' 
                  : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`${isActive ? 'text-indigo-600' : 'text-indigo-300'} group-hover:text-white`}>
                    {icon}
                  </span>
                  {!collapsed && (
                    <span className="font-medium">{label}</span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="p-4 text-center text-xs text-indigo-300 border-t border-indigo-700">
            © 2025 St-Tech-Works
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`flex-1 min-h-screen p-2 transition-all duration-300
        ${collapsed ? 'md:ml-20' : 'md:ml-20'} 
        ${mobileOpen ? 'ml-64' : 'ml-0 md:ml-0'}`}>
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-2 min-h-[calc(100vh-2rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
