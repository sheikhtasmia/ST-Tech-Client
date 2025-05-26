import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Mainlayout = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-black gap-6">
                {/* Logo */}
                <img
                    src="https://i.ibb.co/HDPgsNx3/download-13.png"
                    alt="Logo"
                    className="w-36 h-36  object-contain animate-pulse"
                />
                {/* Title */}
                <h1 className="text-3xl font-semibold tracking-wide italic">Loading  Tech Works...</h1>
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="font-inter">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Mainlayout;
