import React, { useEffect, useState } from "react";

const GraphicsDesignBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative h-[600px] max-sm:h-[440px] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxiCZKP-Wbm2CdTP458FR0P4nIDnXRBoH7CQ&s')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-0" />

      {/* Content */}
      <div
        className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl md:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Creative <span className="text-pink-400">Graphics Design</span>
        </h1>
        <p className="text-pink-100 text-sm md:text-xl mb-14 max-w-3xl leading-relaxed">
          We bring your brand to life with compelling visuals. From logos to full brand identities,
          our design solutions are crafted to captivate, communicate, and convert.
        </p>
      </div>
    </section>
  );
};

export default GraphicsDesignBanner;
