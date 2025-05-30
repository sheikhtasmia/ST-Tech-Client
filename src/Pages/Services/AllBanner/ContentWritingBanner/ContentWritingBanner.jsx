import React, { useEffect, useState } from "react";

const ContentWritingBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative h-[600px] max-sm:h-[440px] w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content */}
      <div
        className={`relative z-10 px-6 max-w-4xl mx-auto text-white flex flex-col items-center transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          Expert <span className="text-yellow-300">Content Writing</span>
        </h1>
        <p className="text-yellow-100 text-lg md:text-xl mb-14 max-w-3xl leading-relaxed">
          Words that inform, inspire, and influence. We craft high-quality, SEO-friendly content
          tailored to your audience and aligned with your brand voice.
        </p>
      </div>
    </section>
  );
};

export default ContentWritingBanner;
