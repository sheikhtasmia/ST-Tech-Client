import React, { useEffect, useState } from "react";

const DigitalOrganicBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative h-[600px] max-sm:h-[440px] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/digital-marketing-promotion-products-social-260nw-2474127871.jpg')",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/75 opacity-80 z-0" />

      {/* Content */}
      <div
        className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg tracking-wide">
          Digital & <span className="text-green-300">Organic Marketing</span>
        </h1>
        <p className="text-green-100 text-lg md:text-xl mb-14 max-w-3xl leading-relaxed">
          Empower your brand with integrated digital strategies and organic growth
          techniques — tailored for sustainable success and authentic connections.
        </p>
      </div>

     
    </section>
  );
};

export default DigitalOrganicBanner;
