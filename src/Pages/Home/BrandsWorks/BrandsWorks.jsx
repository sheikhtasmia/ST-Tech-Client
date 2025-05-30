import React from "react";

const brands = [
  "https://i.ibb.co/KjmDFG2J/Whats-App-Image-2025-05-27-at-22-24-10-95316a13.jpg",
  "https://i.ibb.co/1G3NF4yf/Whats-App-Image-2025-05-27-at-22-24-10-549cd78d.jpg",
  "https://i.ibb.co/LDvy2rp8/Whats-App-Image-2025-05-27-at-22-24-10-16c9f817.jpg",
  "https://i.ibb.co/qMKz2G9C/Whats-App-Image-2025-05-27-at-22-25-08-5b56658b.jpg",
  "https://i.ibb.co/PvS9CxSF/Whats-App-Image-2025-05-27-at-22-25-25-d7b7471c.jpg",
  "https://i.ibb.co/NdzcRM5B/Whats-App-Image-2025-05-27-at-22-26-00-3a04d3ea.jpg",
];

const BrandsWorks = () => {
  return (
    <div className="md:mt-10 mt-3 mb-3 md:mb-10 overflow-hidden px-4">
      <div className="text-center mb-6">
        <h1 className="md:text-2xl text-lg font-semibold">
          WE WORKED WITH GLOBAL LARGEST BRAND
        </h1>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap hover:pause-animation">
          {[...brands, ...brands].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Brand ${index + 1}`}
              className="h-10 sm:h-16 md:h-20 lg:h-20 mx-4 sm:mx-6 rounded-full object-fill"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 8s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default BrandsWorks;
    