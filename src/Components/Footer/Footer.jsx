import React from 'react';
import {
    FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaFacebookF,
    FaLinkedinIn, FaTwitter, FaInstagram
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 pt-10 border-t border-gray-200 relative">
            {/* Decorative gradient top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500" />

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
                
                {/* Quick Links Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-blue-600 inline-block mb-4">
                        Quick Links
                    </h2>
                    <div className="flex flex-col gap-3 text-sm text-gray-700">
                        {[
                            { name: 'Home', icon: '🏠', to: '/' },
                            { name: 'About Us', icon: '👤', to: '/about' },
                            { name: 'Services', icon: '🛠️', to: '/services' },
                            { name: 'Careers', icon: '🎯', to: '/careers' },
                            { name: 'Contact', icon: '📞', to: '/contact' },
                            { name: 'Blog', icon: '📝', to: '/blog' },
                        ].map((item, i) => (
                            <Link
                                key={i}
                                to={item.to}
                                className="relative pl-6 py-1 group transition-all duration-300 hover:text-blue-600"
                            >
                                <span className="absolute left-0 top-1 group-hover:scale-125 transition-transform">{item.icon}</span>
                                <span
                                    className="relative after:block after:absolute after:bottom-0 after:left-0 after:w-0 
                                    after:h-[2px] after:bg-blue-600 group-hover:after:w-full after:transition-all after:duration-300"
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact & Social Media Section */}
                <div className="flex flex-col gap-6 col-span-2">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <FaPhoneAlt className="text-blue-600 mt-1" />
                            <div>
                                <p className="text-xs text-blue-600">Call Any Time</p>
                                <p className="font-medium text-gray-900">+880 1335-494935</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-blue-600 mt-1" />
                            <div>
                                <p className="text-xs text-blue-600">Address</p>
                                <p>Dhaka, Bangladesh</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaPaperPlane className="text-blue-600 mt-1" />
                            <div>
                                <p className="text-xs text-blue-600">Say Hello</p>
                                <p>sheikhtasmia25@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-4 mt-4">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-800 transition"
                            >
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Newsletter or Additional Widget Section */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 border-b-2 border-blue-600 inline-block mb-4">
                        Newsletter
                    </h2>
                    <p className="mb-3 text-sm text-gray-600">Stay updated with our latest news</p>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-700 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-200 mt-10 pt-4 text-xs text-gray-500 text-center flex flex-col md:flex-row justify-between items-center px-4 max-w-7xl mx-auto">
                <p className="mb-2 md:mb-0">
                    © 2025 <span className="font-semibold text-gray-800">ST Tech Work</span> | Design By <span className="font-semibold text-gray-800">Egens Lab</span>
                </p>
                <div className="flex gap-4">
                    <a href="#" className="hover:underline hover:text-blue-600 transition">Support Policy</a>
                    <a href="#" className="hover:underline hover:text-blue-600 transition">Terms & Conditions</a>
                    <a href="#" className="hover:underline hover:text-blue-600 transition">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
