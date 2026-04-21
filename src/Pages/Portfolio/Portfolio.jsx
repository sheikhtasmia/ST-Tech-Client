import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaFacebookF, FaGlobe, FaRocket, FaCode, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
    const axiosPublic = useAxiosPublic();
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");
    const [stats, setStats] = useState({
        totalProjects: 0,
        experience: 0
    });

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get('/projects');
                setProjects(res.data);
                setFilteredProjects(res.data);
                setStats({
                    totalProjects: res.data.length,
                    experience: new Date().getFullYear() - 2020
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [axiosPublic]);

    useEffect(() => {
        let result = [...projects];
        if (searchTerm) {
            result = result.filter(p => 
                p.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.Description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        result.sort((a, b) => {
            const dateA = a._id;
            const dateB = b._id;
            return sortOrder === "newest" ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
        });
        setFilteredProjects(result);
    }, [searchTerm, sortOrder, projects]);

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

    const ProjectSkeleton = () => (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
            <div className="aspect-[16/10] bg-gray-200"></div>
            <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <section className="relative py-20 bg-gray-100 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight">
                            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Portfolio</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                            Where innovative design meets cutting-edge development. Explore our journey of transforming ideas into digital masterpieces.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-12 mt-10"
                    >
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                <FaCode className="text-xl text-white" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900"><Counter value={stats.totalProjects} />+</div>
                            <div className="text-gray-500 text-sm font-medium">Projects Done</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                <FaRocket className="text-xl text-white" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900"><Counter value={stats.experience} />+</div>
                            <div className="text-gray-500 text-sm font-medium">Years Experience</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-full mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search projects..." 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-2 bg-gray-50 p-1 rounded-xl w-full md:w-auto">
                        <button 
                            onClick={() => setSortOrder("newest")}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm transition-all ${sortOrder === 'newest' ? 'bg-white shadow-sm text-blue-600 font-medium' : 'text-gray-500'}`}
                        >
                            Newest
                        </button>
                        <button 
                            onClick={() => setSortOrder("oldest")}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm transition-all ${sortOrder === 'oldest' ? 'bg-white shadow-sm text-blue-600 font-medium' : 'text-gray-500'}`}
                        >
                            Oldest
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        [...Array(6)].map((_, i) => <ProjectSkeleton key={i} />)
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="group bg-white rounded-3xl border border-gray-100 hover:border-blue-200 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                                        <img
                                            src={project.thumbnail}
                                            alt={project.brandName}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <img 
                                                src={project.brandLogo} 
                                                className="w-10 h-10 object-contain bg-white/90 backdrop-blur-md rounded-xl p-1.5 shadow-sm border border-white/20" 
                                                alt="" 
                                            />
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl text-gray-800">{project.brandName}</h3>
                                            <div className="flex gap-2">
                                                {project.facebook && (
                                                    <a href={project.facebook} target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                                        <FaFacebookF size={12} />
                                                    </a>
                                                )}
                                                {project.website && (
                                                    <a href={project.website} target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-900 hover:text-white transition-all">
                                                        <FaGlobe size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                            {project.Description}
                                        </p>
                                    </div>
                                    <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {!loading && filteredProjects.length === 0 && (
                    <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-gray-500">No projects found matching your search.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Portfolio;