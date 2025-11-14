import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { FaWhatsapp } from 'react-icons/fa';

const Mainlayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
const whatsappLink = `https://wa.me/8801335494935?text=Hello%2C%20I%20am%20interested%20in%20your%20services.`;



    if (isLoading) {
        return (
            <div className=" flex flex-col items-center justify-center min-h-screen bg-base-200 text-black gap-6">
                {/* <img
                    src="https://i.ibb.co.com/LdJDQ7kg/download-25.png"
                    alt="Logo"
                    className="w-40 h-40 object-contain animate-pulse"
                /> */}
                {/* <h1 className="text-3xl font-semibold tracking-wide italic">Loading Tech Works...</h1> */}
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="font-inter">
            <Navbar />
            <Outlet />
            <Footer />

            {/* Scroll to Top Button (Bottom Right) */}
            <div className="fixed bottom-6 right-6 z-50">
                {showScrollToTop && (
                    <button
                        onClick={handleScrollToTopClick}
                        className="
                            bg-indigo-600 text-white w-12 h-12 rounded-lg shadow-xl 
                            hover:bg-indigo-500 transition-all duration-300 
                            transform hover:-translate-y-1 hover:shadow-2xl 
                            flex items-center justify-center focus:outline-none 
                            focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50
                        "
                        aria-label="Scroll to Top"
                    >
                        <ArrowUpIcon className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* WhatsApp Floating Button with Pop-up Animation (Bottom Left) */}
            <div className="fixed bottom-6 left-6 z-50">
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                >
                    <div className="
                        bg-[#25D366] text-white w-14 h-14 rounded-full 
                        shadow-2xl shadow-[#25d366]/60 
                        hover:bg-[#128C7E] transition-all duration-300 
                        transform hover:scale-110 flex items-center justify-center
                        focus:outline-none
                    ">
                        <FaWhatsapp className="w-7 h-7" />
                    </div>
                    {/* Pop-up/Ping Animation (Requires 'ping-slow' in tailwind.config.js) */}
                    <span className="
                        absolute top-0 left-0 w-full h-full rounded-full 
                        bg-[#25D366] opacity-75 animate-ping-slow z-[-1]
                    "></span>
                </a>
            </div>
        </div>
    );
};

export default Mainlayout;
