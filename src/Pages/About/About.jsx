import React, { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaUsers,
  FaRocket,
  FaStar,
  FaAward,
  FaHandshake,
  FaHeart,
  FaRobot,
  FaTools,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { ROOT } from "../../constant/motherUrl";

const TeamCard = ({ photo, name, role, linkedin, portfolio, description, index }) => (
 <motion.div
  initial={{ opacity: 0, y: 50, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.9 }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
    delay: index * 0.1
  }}
  whileHover={{ y: -8, transition: { duration: 0.3 } }}
  className="group relative w-full bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
>
  {/* Hover Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

  <div className="relative flex flex-col lg:flex-row h-full">
    {/* Image Section */}
    <div className="lg:w-2/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img
        src={photo || "/api/placeholder/400/500"}
        alt={name}
        className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-xl"
        loading="lazy"
      />

      {/* Role Badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
          <FaRocket className="text-blue-600 text-xs" />
          {role}
        </span>
      </div>
    </div>

    {/* Info Section */}
    <div className="lg:w-3/5 p-6 flex flex-col justify-start space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">{name}</h3>

      {description && (
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      )}
      <div className="flex gap-4 pt-2 flex-wrap">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <FaLinkedin /> Connect
          </a>
        )}
        {portfolio && (
          <a
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            <FiExternalLink /> Portfolio
          </a>
        )}
      </div>
    </div>
  </div>
</motion.div>
)
const About = () => {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, projectsRes] = await Promise.all([
          fetch(`${ROOT}/members`),
          fetch(`${ROOT}/projects`),
        ]);

        if (!membersRes.ok || !projectsRes.ok) throw new Error("Failed to fetch data");

        const membersData = await membersRes.json();
        const projectsData = await projectsRes.json();

        setMembers(membersData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { icon: FaAward, value: projects.length > 0 ? `${projects.length}+` : "0", label: "Projects Completed" },
    { icon: FaUsers, value: members.length > 0 ? `${members.length}+` : "0", label: "Team Members" },
    { icon: FaHandshake, value: "98%", label: "Client Satisfaction" },
    { icon: FaStar, value: "5+", label: "Years Experience" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 font-sans overflow-hidden">
      
{/* About Section */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative py-20 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
>
  <div className="max-w-6xl mx-auto space-y-16">
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto space-y-4">
      <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
        <FaRocket className="text-yellow-400" /> About STechNest
      </span>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-snug md:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-600">
        Innovating the Digital Future
      </h1>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
        STechNest is a dynamic digital agency transforming ideas into powerful digital experiences. 
        We combine creativity, technology, and AI-driven solutions to solve complex problems and empower businesses.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto shadow-inner">
          <FaHeart className="text-red-500 text-3xl" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">Our Mission</h3>
        <p className="text-gray-600 text-center">
          Deliver high-quality digital solutions and empower businesses with cutting-edge technology.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto shadow-inner">
          <FaRocket className="text-blue-600 text-3xl" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">Our Vision</h3>
        <p className="text-gray-600 text-center">
          To be a leading innovator in digital experiences, AI-driven solutions, and automation for modern enterprises.
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
      >
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto shadow-inner">
          <FaTools className="text-gray-700 text-3xl" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">Our Services</h3>
        <p className="text-gray-600 text-center">
          Web & Mobile Development, AI Automation, UI/UX Design, Digital Strategy, and consulting for modern enterprises.
        </p>
      </motion.div>
    </div>
  </div>
</motion.section>


        {/* Dynamic Stats */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16 px-6 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <stat.icon className="text-2xl text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>


   {/* Team Members */}
      <section className="py-20 px-6">
        <div className="max-w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-blue-600">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get to know the brilliant minds who turn complex challenges
              into elegant digital solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl animate-pulse shadow-lg"
                />
              ))
            ) : error ? (
              <div className="col-span-full text-center py-16">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : members.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Team Members Found
                </h3>
                <p className="text-gray-600">
                  We're currently building our dream team. Check back soon!
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {members.map((member, index) => (
                  <TeamCard
                    key={member._id}
                    photo={member.photo}
                    name={member.name}
                    role={member.role}
                    linkedin={member.linkedin}
                    portfolio={member.portfolio}
                    description={member.description || ""}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden"
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build the Future With Us?
          </h3>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Got passion, talent, and big ideas? STechNest is your space to grow, create, and make real impact. Let’s build the future together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/careers"
              className="group bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3"
            >
              <span>View Open Positions</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Send Your CV
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
