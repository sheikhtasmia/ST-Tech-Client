import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Providers/AuthProvider';
import { CiMenuFries } from "react-icons/ci";
import { FiLogOut, FiGrid } from 'react-icons/fi';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                setUserDropdownOpen(false);
                navigate('/login');
            })
            .catch(error => console.log(error));
    };

    const navLinks = [
        { name: 'Home', to: '/' },
        {
            name: 'Services',
            dropdown: [
                { name: 'Web Development', to: '/services/web-development' },
                { name: 'Digital & Organic Marketing', to: '/services/digital-marketing' },
                { name: 'SEO', to: '/services/seo' },
                { name: 'Data Analysis', to: '/services/data-analysis' },
                { name: 'Graphics Design ', to: '/services/GraphicsDesign' },
                { name: 'Content Writing ', to: '/services/ContentWriting' },
                { name: 'HR & Recruitment  ', to: '/services/Recruitment' },
                { name: 'MSOffice Services  ', to: '/services/MSOfficeServices' },
            ]
        },
        { name: 'Portfolio', to: '/portfolio' },
        { name: 'About', to: '/about' },
        { name: 'Contact Us', to: '/contact' }
    ];

    const activeClass = "text-blue-600 font-semibold shadow-md shadow-blue-400";

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-full mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="flex-shrink-0">
                        <img src="https://i.ibb.co.com/LdJDQ7kg/download-25.png" alt="Logo" className="w-[200px] max-sm:w-[140px]" />
                    </NavLink>

                    <ul className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-gray-700">
                        {navLinks.map((link, idx) =>
                            link.dropdown ? (
                                <motion.li key={idx} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group relative">
                                    <div className="flex items-center cursor-pointer px-4 py-3 hover:text-blue-600 transition select-none">
                                        <span>{link.name}</span>
                                        <svg className="ml-1 w-4 h-4 text-gray-500 group-hover:text-blue-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    <ul className="absolute left-0 top-full hidden group-hover:flex flex-col bg-base-200 text-black rounded-md shadow-md py-2 w-60 z-50">
                                        {link.dropdown.map((item, i) => (
                                            <li key={i}>
                                                <NavLink to={item.to} className={({ isActive }) =>
                                                    "px-4 py-3 hover:bg-blue-300 block transition " + (isActive ? activeClass : "")}>
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.li>
                            ) : (
                                <motion.li key={idx} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                                    <NavLink to={link.to} className={({ isActive }) =>
                                        "px-4 py-2 rounded-md hover:text-blue-600 transition " + (isActive ? activeClass : "")}>
                                        {link.name}
                                    </NavLink>
                                </motion.li>
                            )
                        )}

                        {/* USER PROFILE OR LOGIN */}
                        <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }}
                            className="relative"
                        >
                            {user ? (
                                <div
                                    className="relative"
                                    onMouseEnter={() => setUserDropdownOpen(true)}
                                    onMouseLeave={() => setUserDropdownOpen(false)}
                                >
                                    {/* User Image */}
                                    <img
                                        src={user.photoURL || 'https://i.ibb.co/2kRY7QW/default-user.png'}
                                        alt={user.displayName || 'User'}
                                        className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-blue-600"
                                    />

                                    {/* Dropdown on hover */}
                                    <AnimatePresence>
                                        {userDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-gray-800 font-medium"
                                            >
                                                <p className="px-4 py-2 border-b border-gray-200">{user.displayName || "User Name"}</p>
                                                <NavLink
                                                    to="/dashboard"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 transition"
                                                >
                                                    <FiGrid className="text-blue-600" />
                                                    Dashboard
                                                </NavLink>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FiLogOut />
                                                        Logout
                                                    </div>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `relative inline-block overflow-hidden px-6 py-2 rounded-md font-semibold transition-colors duration-500 group ${isActive ? 'bg-blue-600 text-white' : 'bg-black text-white'}`
                                    }
                                >
                                    <span className="absolute inset-0 w-full h-full transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 bg-blue-600" />
                                    <span className="relative z-10">Login</span>
                                </NavLink>
                            )}
                        </motion.li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-10">
                        
                                <li>
                                    {user ? (
                                        <div className="relative" onMouseEnter={() => setUserDropdownOpen(true)} onMouseLeave={() => setUserDropdownOpen(false)}>
                                            <img
                                                src={user.photoURL || 'https://i.ibb.co/2kRY7QW/default-user.png'}
                                                alt={user.displayName || 'User'}
                                                className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-blue-600"
                                            />
                                            <AnimatePresence>
                                                {userDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-gray-800 font-medium"
                                                    >
                                                        <p className="px-4 py-2 border-b border-gray-200">{user.displayName || "User Name"}</p>
                                                        <NavLink
                                                            to="/dashboard"
                                                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 transition"
                                                            onClick={() => setMenuOpen(false)}
                                                        >
                                                            <FiGrid className="text-blue-600" />
                                                            Dashboard
                                                        </NavLink>
                                                        <button
                                                            onClick={() => {
                                                                handleLogout();
                                                                setMenuOpen(false);
                                                                setUserDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <FiLogOut />
                                                                Logout
                                                            </div>
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <NavLink to="/login" onClick={() => setMenuOpen(false)} className="bg-blue-500 text-white text-center rounded-md px-4 py-2 hover:bg-blue-700 transition block">
                                            Login
                                        </NavLink>
                                    )}
                                </li>

                        <button onClick={toggleMenu} className="text-gray-700">
                            
                            <CiMenuFries size={20}></CiMenuFries>
                        </button>
                    </div>

                    
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-50 shadow-lg px-6 py-8"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex-shrink-0">
                                    <img src="https://i.ibb.co.com/LdJDQ7kg/download-25.png" alt="Logo" className="w-[140px]" />
                                </NavLink>
                                <button onClick={toggleMenu} className="text-2xl text-gray-700">✕</button>
                            </div>

                            <ul className="flex flex-col gap-4 text-[16px] font-medium text-gray-800">
                                {navLinks.map((link, idx) => (
                                    <motion.li key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.07 }}>
                                        {link.dropdown ? (
                                            <details className="group" onClick={(e) => e.stopPropagation()}>
                                                <summary className="cursor-pointer py-2 px-2 rounded hover:bg-gray-100 transition flex justify-between items-center">
                                                    {link.name}
                                                    <svg className="w-4 h-4 text-gray-500 group-open:text-blue-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </summary>
                                                <ul className="ml-4 mt-2 space-y-2">
                                                    {link.dropdown.map((item, i) => (
                                                        <li key={i}>
                                                            <NavLink to={item.to} onClick={() => setMenuOpen(false)} className={({ isActive }) =>
                                                                "block px-2 py-1 hover:bg-blue-100 rounded transition " + (isActive ? activeClass : "")}>
                                                                {item.name}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        ) : (
                                            <NavLink to={link.to} onClick={() => setMenuOpen(false)} className={({ isActive }) =>
                                                "block px-2 py-2 hover:bg-blue-100 rounded transition " + (isActive ? activeClass : "")}>
                                                {link.name}
                                            </NavLink>
                                        )}
                                    </motion.li>
                                ))}

                            </ul>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} onClick={toggleMenu} className="fixed inset-0 bg-black z-40" />
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
