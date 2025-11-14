import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaFacebookF, FaGlobe, FaUsers, FaRocket, FaAward, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Portfolio = () => {
    const axiosPublic = useAxiosPublic();
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState({
        totalProjects: 0,
        happyClients: 0,
        experience: 0,
        completed: 0
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axiosPublic.get('/projects');
                setProjects(res.data);

                // Stats update
                setStats({
                    totalProjects: res.data.length,
                    happyClients: res.data.filter(p => p.status === 'completed').length,
                    experience: new Date().getFullYear() - 2020,
                    completed: res.data.filter(p => p.status === 'completed').length
                });
            } catch (error) {
                console.error('Error loading projects:', error);
            }
        };

        fetchProjects();
    }, [axiosPublic]);

    // Stats Counter animation
    const Counter = ({ value, duration = 2 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const end = value;
            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }, [value, duration]);

        return count;
    };

    return (
        <div className="min-h-screen w-full">
            {/* Hero Section */}
            <section className="relative py-6 bg-gray-200 overflow-hidden">
                <div className="relative max-w-full mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-2xl md:text-5xl font-black text-black mb-6 leading-tight">
                            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Portfolio</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-900 max-w-4xl mx-auto leading-relaxed mb-12"
                        >
                            Where innovative design meets cutting-edge development.
                            Explore our journey of transforming ideas into digital masterpieces.
                        </motion.p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20 max-w-xl mx-auto"
                    >
                        {[
                            { icon: FaCode, value: stats.totalProjects, label: 'Projects Completed', suffix: '+', color: 'from-cyan-400 to-blue-500' },
                            { icon: FaRocket, value: stats.experience, label: 'Years Experience', suffix: '+', color: 'from-purple-400 to-pink-500' },
                        ].map((stat, index) => (
                            <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center group">
                                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                    <stat.icon className="text-2xl text-white" />
                                </div>
                                <div className="text-4xl font-bold text-gray-900 mb-2">
                                    <Counter value={stat.value} />{stat.suffix}
                                </div>
                                <div className="text-gray-900 text-sm font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 py-20 max-w-full mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Work</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Each project tells a unique story of collaboration, innovation, and success
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative"
                        >
                            {/* Thumbnail with overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.thumbnail || project.brandLogo}
                                    alt={project.brandName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Floating Brand Logo */}
                                {project.brandLogo && (
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-md p-2 flex items-center justify-center w-14 h-14">
                                        <img
                                            src={project.brandLogo}
                                            alt="Brand Logo"
                                            className="w-10 h-10 object-contain rounded-md"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {project.brandName}
                                        </h3>
                                        <p className="text-gray-500 font-semibold text-sm line-clamp-2">
                                            {project.Description}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {project.facebook && (
                                            <a
                                                href={project.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                                            >
                                                <FaFacebookF />
                                            </a>
                                        )}
                                        {project.website && (
                                            <a
                                                href={project.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                                            >
                                                <FaGlobe />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Gradient Border */}
                            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="text-8xl mb-6">🚀</div>
                        <h3 className="text-3xl font-bold text-gray-600 mb-4">Amazing Projects Coming Soon</h3>
                        <p className="text-gray-500 max-w-md mx-auto text-lg">
                            We're crafting something extraordinary. Stay tuned for our latest work!
                        </p>
                    </motion.div>
                )}
            </section>

            {/* CTA */}
            <section className="px-6 py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6"
                    >
                        Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Journey</span>?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto"
                    >
                        Let's collaborate to create something amazing that drives your business forward.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1">
                            Start Your Project
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20">
                            View Our Process
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
