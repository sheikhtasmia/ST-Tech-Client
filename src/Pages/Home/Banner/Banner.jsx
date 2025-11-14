import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import video from '../../../assets/video/snapsave-app_1228874228808840_hd.mp4';
import teamworkLottie from "../../../../public/banner lottie/Business team.json";
import Lottie from 'lottie-react';

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      {/* Enhanced Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative  rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-3 -right-3 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600 transition-all duration-300 hover:scale-110"
            >
              &times;
            </button>
            <video
              src={video}
              controls
              autoPlay
              className="w-[600px] h-[600px] rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Modern Banner Section */}
      <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 md:py-20 px-6 md:px-12 ">
        <div className=" flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 space-y-6 lg:space-y-3"
          >
            {/* Premium Badge */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Premier Digital Solutions Agency
            </motion.span>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl  font-bold text-gray-900 leading-tight"
            >
              Transform Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </motion.h1>

            {/* Animated Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl font-semibold text-gray-700 min-h-[60px]"
            >
              <span className="text-gray-500">We specialize in </span>
              <TypeAnimation
                sequence={[
                  'Web Design & Development',
                  2000,
                  'SEO Optimization',
                  2000,
                  'Graphics Design',
                  2000,
                  'Content Writing',
                  2000,
                  'Digital Marketing',
                  2000,
                  'HR & Recruitment',
                  2000,
                  'MS Office Services',
                  2000,
                  'Data Analysis',
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
                className="text-blue-600"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl"
            >
              We are a creative tech agency that combines cutting-edge design,
              strategic thinking, and innovative technology to help businesses
              excel in the digital landscape. Your growth is our commitment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={() => setShowVideo(true)}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <span>Watch Our Story</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button className="border-2 border-gray-300 text-gray-700 px-5 py-2 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Get Free Consultation
              </button>
            </motion.div>


          </motion.div>

          {/* Right Lottie Animation - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="max-w-md lg:max-w-2xl"
            >
              <Lottie
                animationData={teamworkLottie}
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Banner;