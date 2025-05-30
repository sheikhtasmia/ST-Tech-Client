import React, { useEffect, useState } from "react";

const HRRecruitmentBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative h-[600px] max-sm:h-[440px] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div
        className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl md:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          HR & <span className="text-blue-300">Recruitment Services</span>
        </h1>
        <p className="text-blue-100 text-sm md:text-xl mb-14 max-w-3xl leading-relaxed">
          Discover the right talent with a people-first approach. We align hiring strategies with your business goals to build stronger, smarter teams.
        </p>
      </div>
    </section>
  );
};

export default HRRecruitmentBanner;
