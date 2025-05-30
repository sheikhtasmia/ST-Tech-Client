import React, { useEffect, useState } from "react";

const MSOfficeBanner = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            className="relative h-[600px] max-sm:h-[460px] w-full bg-cover bg-center flex items-center justify-center text-center"
            style={{
                backgroundImage:
                    "url('https://t4.ftcdn.net/jpg/05/34/92/09/360_F_534920982_Qa6PETZ5l0gX4zKlCyvy4oCgAPrIorz5.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Content */}
            <div
                className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"
                    }`}
            >
                <h1 className="text-2xl md:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
                    Microsoft Office <span className="text-yellow-300">Solutions</span>
                </h1>
                <p className="text-yellow-100 text-sm md:text-xl mb-14 max-w-3xl leading-relaxed">
                    Boost productivity with expert Microsoft Office training, support, and optimization services tailored for individuals and teams.
                </p>
            </div>
        </section>
    );
};

export default MSOfficeBanner;
