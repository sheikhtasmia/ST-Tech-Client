import React, { useEffect, useState } from "react";

const SeoBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative h-[600px] max-sm:h-[440px] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/026/268/060/non_2x/business-people-use-seo-tools-unlocking-online-potential-boost-visibility-attract-organic-traffic-and-dominate-search-engine-rankings-with-strategic-optimization-techniques-digital-marketing-photo.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-0" />

      {/* Content */}
      <div
        className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl md:text-5xl font-extrabold mb-6 drop-shadow-lg tracking-wide">
          SEO Optimization <span className="text-yellow-400">Services</span>
        </h1>
        <p className="text-yellow-200 text-sm md:text-xl mb-14 max-w-3xl leading-relaxed">
          Boost your online visibility and rank higher on search engines with our
          cutting-edge SEO strategies, tailored to drive organic traffic and grow your business.
        </p>
      </div>
    </section>
  );
};

export default SeoBanner;
