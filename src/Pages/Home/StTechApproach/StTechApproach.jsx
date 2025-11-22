"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "STEP 01",
    title: "Discovery & Consultation",
    image: "https://zenfy-wp.egenslab.com/wp-content/uploads/2024/03/approach-img1.png",
    description:
      "Foren your case studies issoni crucial touris then attention of your audience.",
    points: [
      {
        label: "Brainstorming",
        detail: "Collaborate to generate and refine innovative ideas.",
      },
      {
        label: "Problem Identification",
        detail: "Identify market gaps and challenges your startup.",
      },
    ],
  },
  {
    step: "STEP 02",
    title: "Planning and strategy",
    image: "https://zenfy-wp.egenslab.com/wp-content/uploads/2024/03/approach-img2-2.png",
    description:
      "Strategic planning for optimal results in a concise, effective approach.",
    points: [
      {
        label: "Collaborating",
        detail: "Work together to produce and improve creative concepts.",
      },
      {
        label: "Resource Allocation",
        detail:
          "Optimize planning by efficiently allocating resources and ensuring a streamlined approach.",
      },
    ],
  },
  {
    step: "STEP 03",
    title: "Design & Development",
    image: "https://zenfy-wp.egenslab.com/wp-content/uploads/2024/03/approach-img3-1.png",
    description:
      "Crafting seamless experiences through innovative design and development.",
    points: [
      {
        label: "Generating ideas",
        detail:
          "Come up with and work through creative ideas together.",
      },
      {
        label: "Prototyping Excellence",
        detail:
          "Transform ideas into tangible prototypes and user-centric design.",
      },
    ],
  },
  {
    step: "STEP 04",
    title: "Quality Assurance",
    image: "https://zenfy-wp.egenslab.com/wp-content/uploads/2024/03/approach-img4.png",
    description:
      "Ensuring excellence through meticulous testing and validation processes.",
    points: [
      {
        label: "Idea generation",
        detail: "Collaborate together to generate and develop creative ideas.",
      },
      {
        label: "Continuous Testing",
        detail:
          "Rigorous quality assurance through ongoing testing ensures robust solutions.",
      },
    ],
  },
];

export default function StTechApproach() {
  return (
    <div>
      <h1 className="md:mx-32 mx-10 text-black md:text-5xl text-2xl font-semibold mb-10">
        The STechNest Approach
      </h1>
      <div className="bg-white py-16 px-4 md:px-12">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-between relative flex-wrap">
            {/* Dotted line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 border-t-2 border-dotted border-gray-300 z-0" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10 flex flex-col items-center text-center md:w-1/4 mb-16 md:mb-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              >
                {/* Image */}
                <div className="w-52 h-52 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-white">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Dot below */}
                <div className="w-3 h-3 bg-black rounded-full mb-6 z-10" />

                {/* Card content */}
                <div className="bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-lg p-6 text-left group overflow-hidden relative h-[300px] w-full">
                  <div className="transition-transform duration-[3000ms] ease-linear group-hover:-translate-y-[100px] space-y-5">
                    <p className="text-sm text-blue-600 font-semibold">{step.step}</p>
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    <ul className="text-sm text-gray-800 space-y-2">
                      {step.points.map((point, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">{point.label}:</span>{" "}
                          {point.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
