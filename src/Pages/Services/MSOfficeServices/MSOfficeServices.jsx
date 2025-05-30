import React, { useState } from "react";
import {
  FileTextIcon,
  TableIcon,
  PresentationIcon,
  Settings2Icon,
  DatabaseIcon,
  ClipboardCheckIcon,
} from "lucide-react";
import MSOfficeBanner from "../AllBanner/MSOfficeBanner/MSOfficeBanner";

const msOfficeServices = [
  {
    title: "Word Document Design",
    icon: FileTextIcon,
    description:
      "We create polished, professional Word documents — from business proposals to branded reports.",
    tech: ["MS Word", "Office Templates", "Track Changes"],
  },
  {
    title: "Excel Automation",
    icon: TableIcon,
    description:
      "Build dynamic spreadsheets with formulas, dashboards, data validation, and automation.",
    tech: ["MS Excel", "Macros", "Power Query", "VLOOKUP"],
  },
  {
    title: "PowerPoint Presentations",
    icon: PresentationIcon,
    description:
      "Visually stunning slides for internal meetings, investor decks, or training presentations.",
    tech: ["PowerPoint", "SmartArt", "Slide Master", "Morph"],
  },
  {
    title: "Mail Merge & Templates",
    icon: Settings2Icon,
    description:
      "Speed up operations with automated mailing systems using Word, Excel, and Outlook.",
    tech: ["Mail Merge", "Excel Lists", "Outlook"],
  },
  {
    title: "Access Database Design",
    icon: DatabaseIcon,
    description:
      "Set up relational databases in MS Access for client data, sales records, inventory, and more.",
    tech: ["MS Access", "Forms", "Queries", "Reports"],
  },
  {
    title: "Documentation & Manuals",
    icon: ClipboardCheckIcon,
    description:
      "Create user manuals, SOPs, and how-to guides using Word and PowerPoint — clear and brand-aligned.",
    tech: ["Word", "PowerPoint", "PDF Export"],
  },
];

const MSOfficeServices = () => {
  const [hovered, setHovered] = useState(null);

  return (
<div>
    <MSOfficeBanner></MSOfficeBanner>
        <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 px-6 md:px-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          MS Office Services
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Professional, efficient, and fully customized Microsoft Office solutions to streamline your business documentation and presentations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {msOfficeServices.map(({ title, icon: Icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-8 rounded-xl bg-white shadow-md cursor-pointer relative transition-all duration-500
                ${isHovered ? "scale-105 bg-indigo-50 shadow-2xl z-10" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm bg-gray-100" : ""}
              `}
            >
              <div
                className={`mb-4 transition-transform duration-500 ${
                  isHovered ? "scale-125 rotate-6" : ""
                }`}
              >
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>

              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-indigo-700" : "text-gray-900"
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
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium"
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

export default MSOfficeServices;
