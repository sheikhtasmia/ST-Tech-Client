import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaCode,
  FaSearch,
  FaPaintBrush,
  FaPenNib,
  FaBullhorn,
  FaUsersCog,
  FaFileWord,
  FaChartLine,
} from 'react-icons/fa';

const steps = [
  {
    id: 1,
    title: 'Web Design & Development',
    description: 'We craft responsive, fast, and user-centric websites and web applications tailored to your brand.',
    icon: <FaCode className="text-gray-800 text-2xl" />,
  },
  {
    id: 2,
    title: 'SEO',
    description: 'Boost your online presence with expert SEO strategies that improve search rankings and drive traffic.',
    icon: <FaSearch className="text-gray-800 text-2xl" />,
  },
  {
    id: 3,
    title: 'Graphics Design',
    description: 'Designing visually compelling graphics and brand identities that make a lasting impact.',
    icon: <FaPaintBrush className="text-gray-800 text-2xl" />,
  },
  {
    id: 4,
    title: 'Content Writing',
    description: 'Creating persuasive and engaging content tailored to your target audience and business goals.',
    icon: <FaPenNib className="text-gray-800 text-2xl" />,
  },
  {
    id: 5,
    title: 'Digital & Organic Marketing',
    description: 'Driving brand growth through strategic digital campaigns and organic audience engagement.',
    icon: <FaBullhorn className="text-gray-800 text-2xl" />,
  },
  {
    id: 6,
    title: 'HR & Recruitment',
    description: 'Streamlining hiring processes and sourcing top talent to meet your business needs.',
    icon: <FaUsersCog className="text-gray-800 text-2xl" />,
  },
  {
    id: 7,
    title: 'MS Office Services',
    description: 'Professional document creation, data management, and reporting using the full MS Office suite.',
    icon: <FaFileWord className="text-gray-800 text-2xl" />,
  },
  {
    id: 8,
    title: 'Data Analysis',
    description: 'Transforming raw data into actionable insights through advanced analytics and visualization.',
    icon: <FaChartLine className="text-gray-800 text-2xl" />,
  },
];


const ProcessFlow = () => {
  return (
    <div className="relative bg-white text-gray-900 py-24 px-6 md:px-20 overflow-hidden">
      {/* Dot Dot Background using Image */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/0jRkBG51/Screenshot-2025-05-26-160147.png')] bg-repeat opacity-30 z-0" />

      {/* Soft Rings for Decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="animate-ping w-[900px] h-[900px] rounded-full border border-gray-300/20 absolute" />
        <div className="animate-pulse w-[600px] h-[600px] rounded-full border border-gray-300/30 absolute" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-24">
        {steps.map((step, index) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: '-100px' });

          return (
            <motion.div
              ref={ref}
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.3, duration: 0.6, ease: 'easeOut' }}
              className={`relative w-full flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              {/* Curved Line */}
              {index > 0 && (
                <div
                  className={`hidden md:block absolute top-[-80px] ${
                    index % 2 === 0 ? 'left-16' : 'right-16'
                  } w-16 h-20 border-l-2 border-b-2 border-gray-400 rounded-bl-xl ${
                    index % 2 !== 0 ? 'rotate-180' : ''
                  }`}
                />
              )}

              {/* Step Circle */}
              <div
                className={`absolute -top-6 md:top-0 md:translate-y-[-50%] ${
                  index % 2 === 0 ? 'left-0 md:left-16' : 'right-0 md:right-16'
                } flex items-center justify-center bg-blue-600 w-10 h-10 rounded-full font-bold text-white z-20 shadow-lg`}
              >
                {step.id}
              </div>

              {/* Card */}
              <div
                className={`bg-white rounded-xl p-6 shadow-xl max-w-lg w-full border border-gray-200 transition-transform hover:scale-[1.02] duration-300 ${
                  index % 2 === 0 ? 'md:ml-20' : 'md:mr-20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full shadow-inner">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessFlow;
