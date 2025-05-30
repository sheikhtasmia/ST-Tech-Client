import React, { useState } from "react";
import {
  ActivityIcon,
  BarChartIcon,
  GlobeIcon,
  TrendingUpIcon,
  AtSignIcon,
  SearchIcon,
} from "lucide-react";
import DigitalOrganicBanner from "../AllBanner/DigitalOrganicBanner/DigitalOrganicBanner";

const services = [
  {
    title: "SEO Optimization",
    icon: <SearchIcon className="w-8 h-8 text-green-600" />,
    description:
      "Improve your search engine rankings and drive organic traffic through powerful SEO strategies.",
    tech: ["On-page SEO", "Technical SEO", "Google Analytics", "Keyword Research"],
  },
  {
    title: "Content Marketing",
    icon: <ActivityIcon className="w-8 h-8 text-green-600" />,
    description:
      "Engage your audience with blog posts, case studies, and social media content that convert.",
    tech: ["Copywriting", "Blogs", "Case Studies", "Video Scripts"],
  },
  {
    title: "Email Campaigns",
    icon: <AtSignIcon className="w-8 h-8 text-green-600" />,
    description:
      "Nurture leads with well-designed email flows using automation and segmented lists.",
    tech: ["Mailchimp", "Klaviyo", "A/B Testing", "Personalization"],
  },
  {
    title: "Social Media Marketing",
    icon: <GlobeIcon className="w-8 h-8 text-green-600" />,
    description:
      "Boost your online presence through targeted content and paid social ad campaigns.",
    tech: ["Facebook Ads", "Instagram Reels", "LinkedIn", "Meta Pixel"],
  },
  {
    title: "Analytics & Reporting",
    icon: <BarChartIcon className="w-8 h-8 text-green-600" />,
    description:
      "Track performance and ROI through real-time analytics, dashboards, and optimization insights.",
    tech: ["Google Analytics", "Hotjar", "Funnel Analysis", "GA4"],
  },
  {
    title: "Growth Strategy",
    icon: <TrendingUpIcon className="w-8 h-8 text-green-600" />,
    description:
      "Custom marketing strategies tailored to your brand’s goals with long-term impact.",
    tech: ["Brand Positioning", "Funnels", "CRM Setup", "Conversion Optimization"],
  },
];

const DigitalMarketing = () => {
  const [hovered, setHovered] = useState(null);

  return (
 <div>
    <DigitalOrganicBanner></DigitalOrganicBanner>
       <section className="bg-white min-h-screen py-20 px-6 md:px-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Digital & Organic Marketing
        </h2>
        <p className="text-gray-600 text-lg">
          We help your brand grow online through data-driven strategies, SEO, content, social media, and automation.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-full mx-auto">
        {services.map(({ title, icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative group p-8 rounded-xl bg-gray-50 shadow-md cursor-pointer
                transition-all duration-500 overflow-hidden
                ${isHovered ? "scale-105 z-20 shadow-2xl bg-white" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm saturate-150 bg-green-50" : ""}
              `}
            >
              {/* Icon */}
              <div className="mb-4">
                {icon}
              </div>

              {/* Title */}
              <h3
                className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-green-700" : "text-gray-900"
                }`}
              >
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>

              {/* Technologies */}
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

export default DigitalMarketing;
