import React, { useState } from "react";
import {
  BarChart2Icon,
  PieChartIcon,
  LineChartIcon,
  DatabaseIcon,
  SlidersHorizontalIcon,
  AreaChartIcon,
} from "lucide-react";
import DataAnalysisBanner from "../AllBanner/DataAnalysisBanner/DataAnalysisBanner";

const analysisServices = [
  {
    title: "Exploratory Data Analysis",
    icon: BarChart2Icon,
    description:
      "Reveal hidden patterns and trends using statistical summaries and visualizations.",
    tech: ["Pandas", "Matplotlib", "Seaborn", "NumPy"],
  },
  {
    title: "Data Visualization",
    icon: PieChartIcon,
    description:
      "Transform raw data into impactful charts and graphs for meaningful insight.",
    tech: ["Tableau", "Power BI", "Plotly", "D3.js"],
  },
  {
    title: "Predictive Modeling",
    icon: LineChartIcon,
    description:
      "Use statistical and machine learning techniques to forecast future trends.",
    tech: ["Scikit-learn", "XGBoost", "TensorFlow", "Python"],
  },
  {
    title: "Data Cleaning & Preparation",
    icon: DatabaseIcon,
    description:
      "Ensure data quality with cleaning, transformation, and preprocessing workflows.",
    tech: ["Python", "Pandas", "SQL", "OpenRefine"],
  },
  {
    title: "Dashboard Development",
    icon: AreaChartIcon,
    description:
      "Build interactive dashboards to monitor KPIs and business metrics in real-time.",
    tech: ["Power BI", "Looker Studio", "Dash", "Streamlit"],
  },
  {
    title: "Statistical Analysis",
    icon: SlidersHorizontalIcon,
    description:
      "Perform hypothesis testing, correlation, regression, and deeper statistical insights.",
    tech: ["R", "Python", "SPSS", "Excel"],
  },
];

const DataAnalysis = () => {
  const [hovered, setHovered] = useState(null);

  return (
 <div>
    <DataAnalysisBanner></DataAnalysisBanner>
       <section className="bg-gray-50 min-h-screen py-20 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl max-sm:text-xl font-extrabold text-gray-900 mb-4">
          Data Analysis Services
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Turn your raw data into actionable insights. Our analytics team delivers statistical clarity, visual storytelling, and predictive intelligence.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {analysisServices.map(({ title, icon: Icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative group p-8 rounded-xl bg-white shadow-md cursor-pointer transition-all duration-500 overflow-hidden ${
                isHovered ? "scale-105 z-20 shadow-2xl" : ""
              } ${
                isAnyHovered && !isHovered
                  ? "opacity-40 blur-sm saturate-150 bg-green-50"
                  : ""
              }`}
            >
              {/* Icon with hover animation */}
              <div
                className={`mb-4 transform transition-transform duration-500 ${
                  isHovered ? "scale-125 rotate-6" : ""
                }`}
              >
                <Icon className="w-8 h-8 text-green-600" />
              </div>

              <h3
                className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-green-700" : "text-gray-900"
                }`}
              >
                {title}
              </h3>

              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-2">
                {tech.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
 </div>
  );
};

export default DataAnalysis;
