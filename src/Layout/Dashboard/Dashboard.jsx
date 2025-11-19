import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- React Icons Placeholders (Assumes react-icons/fa is installed) ---
import {
  FaChartBar,
  FaUsers,
  FaUserPlus,
  FaBook,
  FaTimes,
  FaHome,
  FaCog,
  FaRegArrowAltCircleLeft,
  FaBars,
  FaClock,
  FaCalendarAlt,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaRegArrowAltCircleRight,
  FaMoneyBillWave,
  FaSitemap,
  FaCalendarCheck,
  FaSignOutAlt, // Assuming you need this for Sign Out
  FaUser,
  FaFolderOpen,
  FaPlusCircle,
  FaClipboardList,
} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

// You will need to import your actual AuthContext and useAdmin hook

import useAdmin from "../../hooks/useAdmin";
import { AuthContext } from "../../providers/AuthProvider";

// --- UserDropdown Component (Adopted from the first block, needs FaSignOutAlt) ---
const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (action) => {
    setIsOpen(false);
    if (action === "logout") {
      onLogout();
    }
  };

  const dropdownItems = [
    { label: "Profile", Icon: FaUserCircle, action: "/dashboard/profile" },
    { label: "Settings", Icon: FaCog, action: "/dashboard/settings" },
  ];

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 cursor-pointer transition-colors"
      >
        <img
          src={user.photoURL || "https://i.ibb.co/ZYW3VTp/default-avatar.png"}
          alt={user.displayName || "User"}
          className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 shadow-sm"
        />
        <div className="hidden lg:block text-left pr-2">
          <p className="text-sm font-semibold text-gray-900 leading-none">
            {user.displayName ? user.displayName.split(" ")[0] : "User"}
          </p>
          <p className="text-xs text-gray-500">
            {user.isAdmin ? "Administrator" : "User"}{" "}
            {/* Assuming isAdmin logic */}
          </p>
        </div>
        <FaChevronDown
          className={`w-3 h-3 text-gray-400 hidden lg:block transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-blue-600">
                {user.email || "No Email"}
              </p>
            </div>

            <div className="py-1">
              {dropdownItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.action}
                  onClick={() => handleLinkClick(item.action)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <item.Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => handleLinkClick("logout")}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Initial desktop check for default state
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
        setMobileSidebarOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    const timeInterval = setInterval(
      () => setCurrentDateTime(new Date()),
      1000
    );

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out successfully"))
      .catch((error) => console.error("Logout error:", error));
  };

  const getNavItemClasses = (path) => {
    const isActive = location.pathname === path;
    const baseClasses =
      "group relative flex items-center p-3 rounded-lg transition-all duration-200 overflow-hidden";
    const activeClasses = "bg-blue-600 text-white shadow-md shadow-blue-500/30";
    const inactiveClasses =
      "text-gray-700 hover:bg-blue-50 hover:text-blue-700";
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  const adminNavItems = [
    {
      path: "/dashboard/adminhome",
      Icon: FaChartBar,
      label: "Dashboard Overview",
    },
    { path: "/dashboard/addmember", Icon: FaUserPlus, label: "Add Member" },
    { path: "/dashboard/manageuser", Icon: FaUsers, label: "Manage Members" },
    {
      path: "/dashboard/addportfolio",
      Icon: FaFolderOpen,
      label: "Add Project",
    },
    {
      path: "/dashboard/manage-portfolio",
      Icon: FaPlusCircle,
      label: "Manage Project",
    },
    { path: "/dashboard/alluser", Icon: FaPlusCircle, label: "All User" },
    { path: "/dashboard/All-work", Icon: FaPlusCircle, label: "All works" },
  ];

  const userNavItems = [
    { path: "/dashboard/userhome", Icon: FaHome, label: "User Home" },
    { path: "/dashboard/work", Icon: FaClipboardList, label: "Add Works" },
    { path: "/dashboard/see-work", Icon: FaClipboardList, label: "My works" },
    { path: "/dashboard/profile", Icon: FaUser, label: "My Profile" },
  ];

  const finalNavItems = isAdmin ? adminNavItems : userNavItems;

  const quickLinks = [
    { path: "/", Icon: FaHome, label: "Back to Home" },
    { path: "/dashboard/settings", Icon: FaCog, label: "Settings" },
  ];

  const isDesktop = window.innerWidth >= 768;
  const isSidebarExpanded = isDesktop ? sidebarOpen : mobileSidebarOpen;

  const mockUser = {
    displayName: user?.displayName || "Admin User",
    email: user?.email || "admin@example.com",
    photoURL:
      user?.photoURL ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    isAdmin: isAdmin,
  };

  return (
    <div className="flex h-screen font-sans bg-white overflow-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          width: isDesktop
            ? sidebarOpen
              ? 280
              : 80
            : mobileSidebarOpen
            ? 280
            : 0,
          x: isDesktop ? 0 : mobileSidebarOpen ? 0 : -280,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed md:relative z-50 bg-white shadow-2xl md:shadow-lg border-r border-gray-200 h-full flex flex-col overflow-hidden ${
          !isSidebarExpanded && isDesktop ? "items-center" : ""
        }`}
      >
        <div
          className={`flex items-center ${
            isSidebarExpanded ? "justify-between px-6" : "justify-center"
          } p-4 border-b border-gray-200 min-h-[80px]`}
        >
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-3 origin-left"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="w-40 h-16 ">
                  {/* Your Logo Image */}
                  <img
                    className="w-full h-full "
                    src="https://i.ibb.co.com/LdJDQ7kg/download-25.png"
                    alt="St-Tech Logo"
                  />
                </motion.div>
                <div>
                  {/* <p className="text-xs text-blue-600 font-medium">{isAdmin ? 'Admin' : 'User'} Panel</p> */}
                </div>
              </motion.div>
            )}

            {/* Collapsed Logo */}
            {!isSidebarExpanded && isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              ></motion.div>
            )}
          </AnimatePresence>

          {/* Modern Collapse/Expand Button (Desktop) */}
          {isDesktop && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: sidebarOpen ? 0 : 360 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                sidebarOpen
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/50"
              }`}
              title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {sidebarOpen ? (
                <FaRegArrowAltCircleLeft className="w-5 h-5 text-gray-700" />
              ) : (
                <FaRegArrowAltCircleRight className="w-5 h-5 text-white" />
              )}
            </motion.button>
          )}

          {/* Mobile Close Button */}
          {!isDesktop && mobileSidebarOpen && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hidden">
          <AnimatePresence>
            {isSidebarExpanded && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3"
              >
                {isAdmin ? "ADMIN MENU" : "USER MENU"}
              </motion.p>
            )}
          </AnimatePresence>

          {finalNavItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)} // Close on mobile click
                className={({ isActive }) =>
                  getNavItemClasses(isActive ? item.path : null)
                } // Use null to get inactive class
              >
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-gray-500 group-hover:text-blue-700"
                  }`}
                >
                  <item.Icon className="w-5 h-5" />
                </span>
                <AnimatePresence>
                  {isSidebarExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="relative z-10 flex-1 ml-4"
                    >
                      <span
                        className={`font-medium text-sm transition-colors ${
                          location.pathname === item.path
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.div>
          ))}

          {/* SYSTEM Links */}
          <div className="pt-6 mt-6 border-t border-gray-200 space-y-1">
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3"
                >
                  SYSTEM
                </motion.p>
              )}
            </AnimatePresence>

            {quickLinks.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={item.path} className={getNavItemClasses(item.path)}>
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "text-white"
                        : "text-gray-500 group-hover:text-blue-700"
                    }`}
                  >
                    <item.Icon className="w-5 h-5" />
                  </span>
                  <AnimatePresence>
                    {isSidebarExpanded && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="relative z-10 flex-1 ml-4"
                      >
                        <span
                          className={`font-medium text-sm transition-colors ${
                            location.pathname === item.path
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Header/Top Bar */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-md border-b border-gray-200 p-4 sticky top-0 z-30"
        >
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
              >
                <FaBars className="w-5 h-5" />
              </motion.button>

              {/* Time & Date Display */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center p-2 px-3 bg-gray-100 rounded-full min-w-0"
              >
                <div className="flex items-center text-sm font-medium text-gray-700 truncate">
                  <FaClock className="w-4 h-4 text-blue-500 mr-2 sm:mr-0" />
                  <span className="truncate">
                    {currentDateTime.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="hidden sm:flex items-center space-x-2 text-sm font-medium text-gray-700 border-l border-gray-300 pl-3 ml-3">
                  <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                  <span>
                    {currentDateTime.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* User Profile Section (Right Side) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaBell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </motion.button>

              {/* User Profile with Dropdown */}
              <UserDropdown user={mockUser} onLogout={handleLogout} />
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6 lg:p-8 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
