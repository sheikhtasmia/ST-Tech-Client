import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navLinks = [
        { name: 'Home', to: '/' },
        {
            name: 'Services',
            dropdown: [
                { name: 'Web Development', to: '/services/web-development' },
                { name: 'Digital & Organic Marketing', to: '/services/digital-marketing' },
                { name: 'SEO', to: '/services/seo' },
                { name: 'Data Analysis', to: '/services/data-analysis' }
            ]
        },
        { name: 'Portfolio', to: '/portfolio' },
        { name: 'About', to: '/about' },
        { name: 'Contact Us', to: '/contact' }
    ];

    const activeClass = "text-blue-600 font-semibold shadow-md shadow-blue-400";

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 p-5">
            <div className="max-w-full mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0">
                        <img src="https://i.ibb.co/HDPgsNx3/download-13.png" alt="Logo" className="w-[110px]" />
                    </NavLink>

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-gray-700">
                        {navLinks.map((link, idx) =>
                            link.dropdown ? (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="flex items-center cursor-pointer px-4 py-3 hover:text-blue-600 transition select-none">
                                        <span>{link.name}</span>
                                        <svg
                                            className="ml-1 w-4 h-4 text-gray-500 group-hover:text-blue-600 transition"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    <ul className="absolute left-0 top-full hidden group-hover:flex flex-col bg-base-200 text-black rounded-md shadow-md py-2 w-60 z-50">
                                        {link.dropdown.map((item, i) => (
                                            <li key={i}>
                                                <NavLink
                                                    to={item.to}
                                                    className={({ isActive }) =>
                                                        "px-4 py-5 hover:bg-blue-300 block transition " + (isActive ? activeClass : "")
                                                    }
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.li>
                            ) : (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                            "px-4 py-2 rounded-md hover:text-blue-600 transition " + (isActive ? activeClass : "")
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </motion.li>
                            )
                        )}
                        <motion.li
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }}
                        >
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `relative inline-block overflow-hidden px-6 py-2 rounded-md font-semibold transition-colors duration-500 group ${isActive ? 'bg-blue-600 text-white' : 'bg-black text-white'
                                    }`
                                }
                            >
                                <span
                                    className="absolute inset-0 w-full h-full transform scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 bg-blue-600"
                                    aria-hidden="true"
                                ></span>
                                <span className="relative z-10">Login</span>
                            </NavLink>
                        </motion.li>
                    </ul>


                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Slide-in Menu */}
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
                                    <img src="https://i.ibb.co/HDPgsNx3/download-13.png" alt="Logo" className="w-[100px]" />
                                </NavLink>
                                <button onClick={toggleMenu} className="text-2xl text-gray-700">✕</button>
                            </div>

                            <ul className="flex flex-col gap-4 text-[16px] font-medium text-gray-800">
                                {navLinks.map((link, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.07 }}
                                    >
                                        {link.dropdown ? (
                                            <details className="group" onClick={(e) => e.stopPropagation()}>
                                                <summary className="cursor-pointer py-2 px-2 rounded hover:bg-gray-100 transition flex justify-between items-center">
                                                    {link.name}
                                                    <svg
                                                        className="w-4 h-4 text-gray-500 group-open:text-blue-600 transition"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </summary>
                                                <ul className="ml-4 mt-2 space-y-2">
                                                    {link.dropdown.map((item, i) => (
                                                        <li key={i}>
                                                            <NavLink
                                                                to={item.to}
                                                                onClick={() => setMenuOpen(false)}
                                                                className={({ isActive }) =>
                                                                    "block px-2 py-1 hover:bg-blue-100 rounded transition " + (isActive ? activeClass : "")
                                                                }
                                                            >
                                                                {item.name}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        ) : (
                                            <NavLink
                                                to={link.to}
                                                onClick={() => setMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    "block px-2 py-2 hover:bg-blue-100 rounded transition " + (isActive ? activeClass : "")
                                                }
                                            >
                                                {link.name}
                                            </NavLink>
                                        )}
                                    </motion.li>
                                ))}
                                <li>
                                    <NavLink
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="bg-blue-500 text-white text-center rounded-md px-4 py-2 hover:bg-blue-700 transition block"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Background overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black z-40"
                        />
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
