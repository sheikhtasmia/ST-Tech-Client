import React from 'react';
import { FaRegLightbulb, FaTools, FaHandshake } from 'react-icons/fa';

const steps = [
  {
    id: 1,
    icon: <FaRegLightbulb className="text-3xl text-white" />,
    title: 'Understanding Your Vision',
    desc: 'Tailored solutions for your unique needs, delivering personalized results that elevate your experience and expectation.',
    points: [
      'Sustainability and Responsibility',
      'Customer-Centric Approach',
      'Businesses can partner with affiliates',
    ],
  },
  {
    id: 2,
    icon: <FaTools className="text-3xl text-white" />,
    title: 'Collaborative Planning',
    desc: 'Streamline teamwork with Collaborative Planning, fostering efficiency and synergy in achieving shared goals seamlessly.',
    points: [
      'Empowered Communication',
      'Strategic Alignment',
      'Flexibility and Feedback Loops',
    ],
  },
  {
    id: 3,
    icon: <FaHandshake className="text-3xl text-white" />,
    title: 'Customized Solutions',
    desc: 'Tailored solutions for your unique needs, delivering personalized results that elevate your experience and expectation.',
    points: [
      'Adaptive Delivery Model',
      'Result-Focused Implementation',
      'Ongoing Support & Evolution',
    ],
  },
  {
    id: 4,
    icon: <FaRegLightbulb className="text-3xl text-white" />,
    title: 'Innovative Execution',
    desc: 'Implement creative and cutting-edge methods that ensure your goals are met with precision and flair.',
    points: [
      'Creative Strategy Integration',
      'Emerging Technologies',
      'Bold Problem Solving',
    ],
  },
  {
    id: 5,
    icon: <FaTools className="text-3xl text-white" />,
    title: 'Performance Optimization',
    desc: 'Continual enhancement of strategies and systems to achieve peak operational effectiveness.',
    points: [
      'KPI Tracking & Insights',
      'Efficiency Upgrades',
      'Agile Process Tweaks',
    ],
  },
  {
    id: 6,
    icon: <FaHandshake className="text-3xl text-white" />,
    title: 'Long-Term Partnership',
    desc: 'Build trust with ongoing collaboration that helps your vision grow beyond expectations.',
    points: [
      'Scalable Support Plans',
      'Relationship-Driven Service',
      'Shared Success Philosophy',
    ],
  },
];

const OperationalBlueprint = () => {
  const extendedSteps = [...steps, ...steps]; // For infinite scroll effect

  return (
    <div className="bg-white py-16 px-4 sm:px-8 overflow-hidden">
      <div className="text-start mb-12">
        <p className="text-blue-600 font-semibold tracking-widest">✴ HOW WE DO ✴</p>
        <h2 className="text-4xl font-bold text-gray-900">Our Operational Blueprint</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Auto-scrolling animation */}
        <div className="animate-marquee flex w-max gap-6">
          {extendedSteps.map((step, index) => (
            <div
              key={index}
              className="group flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-md border border-gray-200 relative overflow-hidden"
            >
              {/* Top border animation on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-x" />

              <div className="relative z-10">
                <div className="bg-blue-600 rounded-full p-5 w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.desc}</p>
                <ul className="space-y-2 text-gray-700 text-left">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✔</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperationalBlueprint;
