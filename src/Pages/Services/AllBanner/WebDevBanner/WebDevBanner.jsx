import React, { useEffect, useState } from "react";

const WebDevBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative h-[700px] max-sm:h-[600px] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-0" />


      {/* Content */}
      <div
        className={`relative z-10 px-6 max-w-full mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] tracking-wide">
          Web Development <span className="text-indigo-400"> Services</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-14 max-w-3xl leading-relaxed">
          From modern frontend design to powerful backend systems — we craft scalable, secure,
          and lightning-fast digital experiences tailored to your business needs.
        </p>
      </div>

   
    </section>
  );
};

export default WebDevBanner;
