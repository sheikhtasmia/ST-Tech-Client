import React, { useState } from "react";
import {
  SearchCheckIcon,
  BarChartIcon,
  BrainCircuitIcon,
  FileSearchIcon,
  BotIcon,
  GlobeIcon,
} from "lucide-react";
import SeoBanner from "../AllBanner/SeoBanner/SeoBanner";

const seoServices = [
  {
    title: "AI-Powered Keyword Research",
    icon: SearchCheckIcon,
    description:
      "Leverage artificial intelligence to discover high-ranking, low-competition keywords tailored to your niche.",
    tech: ["ChatGPT", "Ahrefs", "Surfer SEO", "Keyword AI"],
  },
  {
    title: "Content Optimization",
    icon: FileSearchIcon,
    description:
      "Use machine learning to fine-tune your content for search intent, readability, and semantic relevance.",
    tech: ["GPT-4", "Yoast", "Grammarly", "SEMRush"],
  },
  {
    title: "Technical SEO & Site Health",
    icon: GlobeIcon,
    description:
      "Improve crawlability, indexing, and mobile performance through advanced technical audits.",
    tech: ["Google Search Console", "Screaming Frog", "Lighthouse"],
  },
  {
    title: "SEO Automation",
    icon: BotIcon,
    description:
      "Automate tasks like meta tag generation, internal linking, and on-page checks using AI bots.",
    tech: ["Python Bots", "Zapier", "OpenAI", "RankMath"],
  },
  {
    title: "AI Analytics & Reporting",
    icon: BarChartIcon,
    description:
      "AI-powered dashboards and predictive analytics help visualize trends and forecast rankings.",
    tech: ["Google Analytics", "Tableau", "Power BI", "GA4"],
  },
  {
    title: "Smart Link Building Strategy",
    icon: BrainCircuitIcon,
    description:
      "AI identifies the best link opportunities, guest post targets, and niche directories for authority growth.",
    tech: ["BuzzSumo", "Moz", "GPT-4", "Ahrefs"],
  },
];

const SEO = () => {
  const [hovered, setHovered] = useState(null);

  return (
  <div>
    <SeoBanner></SeoBanner>
      <section className="bg-white py-20 px-6 md:px-20 min-h-screen">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="md:text-4xl text-2xl  font-bold text-gray-900 mb-4">
          AI-Enhanced SEO Services
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Elevate your online visibility with our AI-driven SEO strategies, from keyword discovery to ranking analytics — all powered by the latest technology.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {seoServices.map(({ title, icon: Icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-8 rounded-xl bg-gray-50 shadow-md cursor-pointer relative transition-all duration-500 overflow-hidden
                ${isHovered ? "scale-105 bg-white shadow-2xl z-10" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm bg-green-50" : ""}
              `}
            >
              {/* Icon with animation only */}
              <div
                className={`mb-4 transform transition-transform duration-500 ${
                  isHovered ? "scale-125 rotate-6" : ""
                }`}
              >
                <Icon className="w-8 h-8 text-green-600" />
              </div>

              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
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

export default SEO;
