import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.8
      }
    }
  };

  const formItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.6
      }
    })
  };

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, label: "Facebook", color: "hover:text-[#1877F2]" },
    { icon: <FiTwitter className="w-5 h-5" />, label: "Twitter", color: "hover:text-[#1DA1F2]" },
    { icon: <FiInstagram className="w-5 h-5" />, label: "Instagram", color: "hover:text-[#E4405F]" },
    { icon: <FiLinkedin className="w-5 h-5" />, label: "LinkedIn", color: "hover:text-[#0A66C2]" }
  ];

  const contactInfo = [
    { icon: <FiMail className="w-5 h-5" />, text: "sheikhtasmia25@gmail.com" },
    { icon: <FiPhone className="w-5 h-5" />, text: "+880 1335-494935" },
    { icon: <FiMapPin className="w-5 h-5" />, text: "Mirpur, Dhaka, Bangladesh" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ST Tech Works</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Let's create something extraordinary together. Reach out for collaborations, inquiries, or just to say hello!
          </motion.p>
        </motion.div>

        
            <motion.div
              className="mt-10 rounded-xl overflow-hidden shadow-md border border-gray-200"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <iframe
                title="Sheikh Tasmia Location - Mirpur, Dhaka"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.837240932881!2d90.36027831598554!3d23.8073134845677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1d915066277%3A0xcc3bcff9cbf82d0f!2sMirpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              />
              <div className="bg-white p-3 text-center">
                <p className="text-sm font-medium text-gray-700">📍 Mirpur, Dhaka - 1216</p>
              </div>
            </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Info Section */}
          <motion.div
            className="lg:w-2/5 bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
            variants={itemVariants}
          >
            <motion.div
              className="flex flex-col items-center mb-10"
              variants={itemVariants}
            >
              <motion.div 
                className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-6 shadow-inner border-4 border-white"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <span className="text-white text-2xl font-bold">
                    <img className="w-[100px]" src="https://i.ibb.co/HDPgsNx3/download-13.png" alt="" />
                  </span>
                </div>
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">ST Tech Works</h3>
              <p className="text-gray-600 text-center">
                Digital Creator & Developer based in Dhaka, Bangladesh
              </p>
            </motion.div>

            

            <motion.div className="space-y-5" variants={itemVariants}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mt-0.5 flex-shrink-0 text-indigo-600">{info.icon}</div>
                  <p className="text-gray-700">{info.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <h4 className="text-lg font-medium text-gray-800 mb-5">Connect With Me</h4>
              <div className="flex justify-center space-x-5">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    aria-label={social.label}
                    className={`text-gray-500 ${social.color} transition-colors p-2 rounded-full bg-gray-50 hover:bg-white shadow-sm`}
                    variants={itemVariants}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            className="lg:w-3/5 bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
            variants={itemVariants}
          >
            <motion.h3
              className="text-3xl font-bold text-gray-900 mb-8"
              variants={itemVariants}
            >
              Send a Message
            </motion.h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "name", placeholder: "Your Name", type: "text" },
                  { name: "email", placeholder: "Email Address", type: "email" },
                  { name: "phone", placeholder: "Phone Number", type: "tel" },
                  { name: "subject", placeholder: "Subject", type: "text" }
                ].map((field, i) => (
                  <motion.div
                    key={field.name}
                    custom={i}
                    variants={formItemVariants}
                    className="relative"
                  >
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300 outline-none bg-gray-50 focus:bg-white"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.div
                custom={4}
                variants={formItemVariants}
                className="relative"
              >
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Your Message..."
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300 outline-none bg-gray-50 focus:bg-white resize-none"
                ></textarea>
              </motion.div>

              <motion.div
                custom={5}
                variants={formItemVariants}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  <span>Send Message</span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;