import React, { useState } from "react";
import {
  PaletteIcon,
  PenToolIcon,
  LayoutTemplateIcon,
  BrushIcon,
  ApertureIcon,
  ImageIcon,
} from "lucide-react";
import GraphicsDesignBanner from "../AllBanner/GraphicsDesignBanner/GraphicsDesignBanner";

const designServices = [
  {
    title: "Brand Identity Design",
    icon: PaletteIcon,
    description:
      "Create powerful and memorable brand visuals including logos, colors, and typography that define your presence.",
    tech: ["Figma", "Illustrator", "Coolors", "Fontjoy"],
  },
  {
    title: "UI/UX Design",
    icon: PenToolIcon,
    description:
      "Design intuitive, user-centered interfaces and prototypes that elevate digital product experiences.",
    tech: ["Figma", "Adobe XD", "Sketch", "InVision"],
  },
  {
    title: "Social Media Graphics",
    icon: BrushIcon,
    description:
      "Craft visually engaging content for Instagram, Facebook, and other platforms that drive engagement.",
    tech: ["Canva", "Photoshop", "Crello", "Pixelied"],
  },
  {
    title: "Presentation Design",
    icon: LayoutTemplateIcon,
    description:
      "Design modern, professional slide decks that communicate ideas clearly and impress audiences.",
    tech: ["Google Slides", "Keynote", "Pitch", "PowerPoint"],
  },
  {
    title: "Motion Graphics",
    icon: ApertureIcon,
    description:
      "Animate logos, social reels, and explainer videos with smooth motion and captivating transitions.",
    tech: ["After Effects", "Premiere Pro", "Lottie", "Spline"],
  },
  {
    title: "Creative Photo Editing",
    icon: ImageIcon,
    description:
      "Transform raw photos into stunning visuals with advanced editing, color grading, and retouching.",
    tech: ["Lightroom", "Photoshop", "Snapseed", "Luminar"],
  },
];

const GraphicsDesign = () => {
  const [hovered, setHovered] = useState(null);

  return (
   <div>
    <GraphicsDesignBanner></GraphicsDesignBanner>
     <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 px-6 md:px-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Creative Graphics Design
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          From branding to motion graphics, we blend imagination with technology to deliver pixel-perfect designs tailored to your vision.
        </p>
      </div>

      {/* Design Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {designServices.map(({ title, icon: Icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-8 rounded-xl bg-white shadow-md cursor-pointer relative transition-all duration-500
                ${isHovered ? "scale-105 bg-purple-50 shadow-2xl z-10" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm bg-purple-100" : ""}
              `}
            >
              {/* Icon with animation */}
              <div
                className={`mb-4 transform transition-transform duration-500 ${
                  isHovered ? "scale-125 rotate-6" : ""
                }`}
              >
                <Icon className="w-8 h-8 text-purple-600" />
              </div>

              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-purple-700" : "text-gray-900"
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
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
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

export default GraphicsDesign;
