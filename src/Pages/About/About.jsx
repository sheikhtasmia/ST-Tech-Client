import React, { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaUsers,
  FaRocket,
  FaStar,
  FaAward,
  FaHandshake,
  FaHeart,
  FaSearch,
  FaLightbulb,
  FaEye,
  FaLayerGroup
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

const TeamCard = ({ photo, name, role, linkedin, description, portfolio, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative w-full bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col lg:flex-row h-full">
        <div className="lg:w-2/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={photo || "https://via.placeholder.com/400x500"}
            alt={name}
            className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <FaRocket className="text-blue-600 text-xs" />
              {role}
            </span>
          </div>
        </div>

        <div className="lg:w-3/5 p-8 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {name}
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {description || "Passionate about creating innovative digital solutions and driving technological excellence."}
          </p>

          <div className="flex gap-4 pt-4">
            {linkedin && (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaLinkedin className="text-white" />
                <span className="text-sm font-semibold">Connect</span>
              </motion.a>
            )}
            {portfolio && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                <FiExternalLink />
                <span className="text-sm font-semibold">Portfolio</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonTeamCard = () => (
  <div className="w-full bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col lg:flex-row h-full min-h-[350px] animate-pulse">
    <div className="lg:w-2/5 bg-gray-200 h-64 lg:h-full"></div>
    <div className="lg:w-3/5 p-8 flex flex-col justify-center space-y-6">
      <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
      </div>
      <div className="flex gap-4 pt-4">
        <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
      </div>
    </div>
  </div>
);

const About = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, projectsRes] = await Promise.all([
          fetch("http://localhost:5000/members"),
          fetch("http://localhost:5000/projects"),
        ]);
        if (!membersRes.ok || !projectsRes.ok) throw new Error("Failed to fetch data");
        const membersData = await membersRes.json();
        const projectsData = await projectsRes.json();
        setMembers(membersData);
        setFilteredMembers(membersData);
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = members;
    if (selectedRole !== "All") result = result.filter(m => m.role === selectedRole);
    if (searchTerm) {
      result = result.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredMembers(result);
  }, [searchTerm, selectedRole, members]);

  const roles = ["All", ...new Set(members.map(m => m.role))];

  const stats = [
    { icon: FaAward, value: projects.length > 0 ? `${projects.length}+` : "0", label: "Projects Completed" },
    { icon: FaUsers, value: members.length > 0 ? `${members.length}+` : "0", label: "Team Members" },
    { icon: FaHandshake, value: "98%", label: "Client Satisfaction" },
    { icon: FaStar, value: "5+", label: "Years Experience" },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 font-sans">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-24 pb-16 px-6 text-center bg-gray-50"
      >
        <div className="max-w-full mx-auto">
          <span className="bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 inline-block shadow-md">
            Innovating the Digital Future
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Empowering Your Vision with <br />
            <span className="text-blue-600">STechNest</span> Solutions
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            STechNest is a dynamic digital agency transforming ideas into powerful digital experiences. 
            We combine creativity, technology, and AI-driven solutions to solve complex problems and empower businesses.
          </p>
        </div>
      </motion.section>

      <section className="py-20 px-6 max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <FaLightbulb className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-500 leading-relaxed">Deliver high-quality digital solutions and empower businesses with cutting-edge technology.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <FaEye className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed">To be a leading innovator in digital experiences, AI-driven solutions, and automation for modern enterprises.</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <FaLayerGroup className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Services</h3>
            <p className="text-gray-500 leading-relaxed">Web & Mobile Development, AI Automation, UI/UX Design, Digital Strategy, and consulting.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50/50">
        <div className="max-w-full mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4 group-hover:bg-blue-600 transition-all duration-300">
                <stat.icon className="text-2xl text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-left">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black">Meet Our Team</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search name or role..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-6 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none cursor-pointer focus:ring-2 focus:ring-blue-100 font-medium"
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole}
            >
              {roles.map((role, idx) => (
                <option key={idx} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            [...Array(4)].map((_, index) => <SkeletonTeamCard key={index} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredMembers.map((member, index) => (
                <TeamCard
                  key={member._id}
                  photo={member.photo}
                  name={member.name}
                  role={member.role}
                  description={member.description}
                  linkedin={member.linkedin}
                  portfolio={member.portfolio}
                  index={index}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
        
        {!loading && filteredMembers.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 mt-10">
            <p className="text-gray-400">No team members found.</p>
          </div>
        )}
      </section>

      <section className="py-24 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-black mb-8">Ready to Build the Future With Us?</h3>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/careers"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-4 rounded-2xl font-bold text-lg shadow-xl"
          >
            <span>View Open Positions</span>
            <FiArrowRight />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default About;