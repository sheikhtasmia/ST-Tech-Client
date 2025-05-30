import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  LayersIcon,
  ZapIcon,
  CloudIcon,
} from "lucide-react";
import WebDevBanner from "../AllBanner/WebDevBanner/WebDevBanner";

const services = [
  {
    title: "Frontend Development",
    icon: <CodeIcon className="w-8 h-8 text-blue-600" />,
    description:
      "Interactive and modern UI using React.js, Tailwind CSS, and responsive design principles.",
    tech: ["React.js", "Tailwind", "Next.js", "Framer Motion"],
  },
  {
    title: "Backend Development",
    icon: <ServerIcon className="w-8 h-8 text-blue-600" />,
    description:
      "Powerful and secure RESTful APIs and backend logic using Node.js and Express.",
    tech: ["Node.js", "Express", "JWT", "Bcrypt"],
  },
  {
    title: "Database Management",
    icon: <DatabaseIcon className="w-8 h-8 text-blue-600" />,
    description:
      "Efficient NoSQL database architecture using MongoDB and Mongoose.",
    tech: ["MongoDB", "Mongoose", "Mongo Atlas"],
  },
  {
    title: "Fullstack Integration",
    icon: <LayersIcon className="w-8 h-8 text-blue-600" />,
    description:
      "End-to-end fullstack apps combining frontend, backend, and database with perfect sync.",
    tech: ["MERN Stack", "MVC Pattern", "REST API"],
  },
  {
    title: "API Integration",
    icon: <CloudIcon className="w-8 h-8 text-blue-600" />,
    description:
      "Seamless integration of third-party APIs such as payment gateways, auth, and more.",
    tech: ["Stripe", "Firebase", "OAuth", "Google APIs"],
  },
  {
    title: "Optimization & Deployment",
    icon: <ZapIcon className="w-8 h-8 text-blue-600" />,
    description:
      "Deploying apps with Vercel, Render, or Netlify with blazing-fast performance.",
    tech: ["Vercel", "Netlify", "Cloudflare", "Lighthouse"],
  },
];

const WebDevelopment = () => {
  const [hovered, setHovered] = useState(null);

  return (
   <div>
    <WebDevBanner></WebDevBanner>
     <section className="bg-white min-h-screen py-20 px-6 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-full mx-auto text-center mb-16"
      >
        <h2 className="text-4xl max-sm:text-xl font-extrabold text-gray-900 mb-4">
          Web Development Services
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          From frontend design to backend logic, we offer full-cycle development using the latest technologies and beautiful UI/UX.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-full mx-auto">
        {services.map(({ title, icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <motion.div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative group p-8 rounded-xl bg-gray-50 shadow-md cursor-pointer
                transition-all duration-500 overflow-hidden
                ${isHovered ? "scale-105 z-20 shadow-2xl bg-white" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm saturate-150 bg-blue-50" : ""}
              `}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-4"
                animate={isHovered ? { scale: 1.2, rotate: [0, 10, -10, 0] } : { scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-blue-700" : "text-gray-900"
                }`}
              >
                {title}
              </motion.h3>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-2">
                {tech.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
   </div>
  );
};

export default WebDevelopment;
