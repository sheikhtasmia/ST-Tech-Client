import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import video from '../../../assets/video/snapsave-app_1228874228808840_hd.mp4';

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
          <div className="relative w-full max-w-3xl">
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-5 -right-5 md:top-2 md:right-2 z-50 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition"
            >
              &times;
            </button>
            <video
              src={video}
              controls
              autoPlay
              className="w-full max-h-[80vh] rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Banner Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-4 py-1 rounded-full inline-block shadow-sm">
            Empowering Innovation 🚀
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Crafting Powerful Digital Solutions for Visionary Brands
          </h1>

          <div className="text-xl md:text-2xl font-semibold text-blue-700 pt-2">
            <TypeAnimation
              sequence={[
                'Web Design & Development', 2000,
                'SEO', 2000,
                'Graphics Design', 2000,
                'Content Writing', 2000,
                'Digital & Organic Marketing', 2000,
                'HR & Recruitment', 2000,
                'MS Office Services', 2000,
                'Data Analysis', 2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            As a creative tech agency, we blend design, strategy, and code to help forward-thinking brands thrive in the digital era. Your success is our mission.
          </p>

          <div className="pt-6">
            <button
              onClick={() => setShowVideo(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-xl"
            >
              Let’s Build Something Great
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-1/2"
        >
          <img
            src="https://i.ibb.co/1JLBFGvj/494634935-122120625842804194-8825482722617541848-n.jpg"
            alt="Creative team brainstorming"
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </motion.div>
      </section>
    </>
  );
};

export default Banner;
