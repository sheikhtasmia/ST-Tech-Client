import React from 'react';
import { GoProjectRoadmap } from 'react-icons/go';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    icon: <GoProjectRoadmap size={40} className="text-blue-600" />,
    count: 100,
    suffix: '+',
    desc: 'Projects Completed',
  },
  {
    icon: <IoCheckmarkDoneCircleOutline size={40} className="text-green-600" />,
    count: 98,
    suffix: '%',
    desc: 'Customer Satisfaction',
  },
  {
    icon: <MdOutlineDateRange size={40} className="text-purple-600" />,
    count: 3,
    suffix: ' Mins',
    desc: 'Average Answer Time',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const CreativeWork = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.section
      className="px-6 md:px-12 py-20 max-w-full mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
        {/* Left Content */}
        <div className="lg:w-2/3 space-y-6">
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-4 py-1 rounded-full inline-block shadow-sm">
            Empowering Innovation 🚀
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            We are a Startup agency working with young talents on delivering unique ideas and creative work.
          </h2>

          <p className="text-lg text-gray-700">
            Where innovation meets passion in a journey that started with a simple idea and a shared dream. Founded in recent year, we embarked on a mission to bring the new innovation and introduce the technology. From humble beginnings to our current aspirations, every step has been fueled by a relentless commitment.
          </p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-10 w-full lg:w-1/3"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-5">
              {stat.icon}
              <div>
                <p className="text-xl font-semibold text-gray-900">
                  {inView ? (
                    <CountUp end={stat.count} duration={20} />
                  ) : (
                    '0'
                  )}
                  {stat.suffix}
                </p>
                <p className="text-gray-600">{stat.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CreativeWork;
