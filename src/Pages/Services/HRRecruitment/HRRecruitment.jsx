import React, { useState } from "react";
import {
  UsersIcon,
  BriefcaseIcon,
  UserCheckIcon,
  SearchIcon,
  BadgeCheckIcon,
  ShieldCheckIcon,
} from "lucide-react";
import HRRecruitmentBanner from "../AllBanner/HRRecruitmentBanner/HRRecruitmentBanner";

const hrServices = [
  {
    title: "Talent Acquisition",
    icon: UsersIcon,
    description:
      "Find and attract top-tier candidates using advanced sourcing strategies, screening, and outreach.",
    tech: ["LinkedIn", "Indeed", "HireEZ", "ZoomInfo"],
  },
  {
    title: "Candidate Screening",
    icon: SearchIcon,
    description:
      "Filter resumes and conduct initial interviews to ensure only the best-fit candidates reach your team.",
    tech: ["Greenhouse", "Google Forms", "TestGorilla", "ChatGPT"],
  },
  {
    title: "Recruitment Strategy",
    icon: BriefcaseIcon,
    description:
      "Develop data-driven hiring plans tailored to your business goals, market, and growth stage.",
    tech: ["BambooHR", "Workable", "Notion", "Airtable"],
  },
  {
    title: "Employee Onboarding",
    icon: UserCheckIcon,
    description:
      "Ensure seamless onboarding with structured documentation, training materials, and system setups.",
    tech: ["Notion", "Loom", "Trello", "Slack"],
  },
  {
    title: "HR Compliance & Policy",
    icon: ShieldCheckIcon,
    description:
      "Set up HR policies and documentation that align with legal standards and company culture.",
    tech: ["DocuSign", "Google Docs", "HR Toolkit", "HRIS"],
  },
  {
    title: "Background Checks",
    icon: BadgeCheckIcon,
    description:
      "Perform thorough background checks to ensure candidate reliability and workplace safety.",
    tech: ["Checkr", "HireRight", "Truework", "Zinc"],
  },
];

const HRRecruitment = () => {
  const [hovered, setHovered] = useState(null);

  return (
  <div>
    <HRRecruitmentBanner></HRRecruitmentBanner>
      <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 px-6 md:px-20">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          HR & Recruitment Solutions
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Streamline your hiring process and build strong, reliable teams with
          our modern HR solutions tailored for scaling businesses.
        </p>
      </div>

      {/* HR Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {hrServices.map(({ title, icon: Icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-8 rounded-xl bg-white shadow-md cursor-pointer relative transition-all duration-500
                ${isHovered ? "scale-105 bg-emerald-50 shadow-2xl z-10" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm bg-gray-100" : ""}
              `}
            >
              {/* Icon */}
              <div
                className={`mb-4 transform transition-transform duration-500 ${
                  isHovered ? "scale-125 rotate-6" : ""
                }`}
              >
                <Icon className="w-8 h-8 text-emerald-600" />
              </div>

              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-emerald-700" : "text-gray-900"
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
                    className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium"
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

export default HRRecruitment;
