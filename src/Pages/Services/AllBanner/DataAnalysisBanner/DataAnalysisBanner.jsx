import React, { useEffect, useState } from "react";

const DataAnalysisBanner = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            className="relative h-[600px] max-sm:h-[440px] w-full bg-cover bg-center flex items-center justify-center text-center"
            style={{
                backgroundImage:
                    "url('https://static.vecteezy.com/system/resources/thumbnails/002/910/315/small/analytics-data-analysis-strategy-statistic-concept-photo.jpg')",
            }}
        >
            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-0" />

            {/* Content */}
            <div
                className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"
                    }`}
            >
                <h1 className="text-2xl md:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
                    Data <span className="text-cyan-400">Analysis Services</span>
                </h1>
                <p className="text-cyan-100 text-sm md:text-xl mb-14 max-w-3xl leading-relaxed">
                    Transform raw data into actionable insights. Our advanced data analytics solutions help
                    you make informed decisions, predict trends, and drive measurable business growth.
                </p>
            </div>
        </section>
    );
};

export default DataAnalysisBanner;
