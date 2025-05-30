import React, { useState } from "react";
import {
  FileTextIcon,
  PenSquareIcon,
  NotebookPenIcon,
  Edit3Icon,
  MessageSquareQuoteIcon,
  SpellCheckIcon,
} from "lucide-react";
import ContentWritingBanner from "../AllBanner/ContentWritingBanner/ContentWritingBanner";

const contentServices = [
  {
    title: "SEO Blog Writing",
    icon: FileTextIcon,
    description:
      "Craft in-depth, SEO-optimized blog content tailored to your niche to boost traffic and engagement.",
    tech: ["Surfer SEO", "ChatGPT", "Ahrefs", "Grammarly"],
  },
  {
    title: "Website Copywriting",
    icon: PenSquareIcon,
    description:
      "Persuasive landing page and website copy that turns visitors into loyal customers with every scroll.",
    tech: ["Notion", "Jarvis AI", "Frase", "Hemingway"],
  },
  {
    title: "Social Media Captions",
    icon: NotebookPenIcon,
    description:
      "Create punchy, platform-specific captions that align with your brand voice and increase interaction.",
    tech: ["Canva", "Copy.ai", "Buffer", "Later"],
  },
  {
    title: "Email Newsletter Writing",
    icon: MessageSquareQuoteIcon,
    description:
      "Design compelling newsletters with strong hooks, visuals, and CTAs to build audience loyalty.",
    tech: ["Mailchimp", "BeeFree", "ConvertKit", "Notion"],
  },
  {
    title: "Content Editing & Proofreading",
    icon: Edit3Icon,
    description:
      "Refine tone, clarity, and flow to elevate your content to a polished, professional standard.",
    tech: ["Grammarly", "ProWritingAid", "Hemingway", "Slick Write"],
  },
  {
    title: "Brand Voice Development",
    icon: SpellCheckIcon,
    description:
      "Define a consistent brand tone across all platforms to build recognition and trust.",
    tech: ["Notion", "Tone Analyzer", "Style Guides", "GPT-4"],
  },
];

const ContentWriting = () => {
  const [hovered, setHovered] = useState(null);

  return (
  <div>
    <ContentWritingBanner></ContentWritingBanner>
      <section className="bg-gradient-to-b from-white via-sky-50 to-white py-20 px-6 md:px-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Expert Content Writing
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Connect, convert, and communicate your brand through professionally written content tailored to your audience and goals.
        </p>
      </div>

      {/* Content Writing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {contentServices.map(({ title, icon: Icon, description, tech }, i) => {
          const isHovered = hovered === i;
          const isAnyHovered = hovered !== null;

          return (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`p-8 rounded-xl bg-white shadow-md cursor-pointer relative transition-all duration-500
                ${isHovered ? "scale-105 bg-blue-50 shadow-2xl z-10" : ""}
                ${isAnyHovered && !isHovered ? "opacity-40 blur-sm bg-sky-100" : ""}
              `}
            >
              {/* Icon */}
              <div
                className={`mb-4 transform transition-transform duration-500 ${
                  isHovered ? "scale-125 rotate-6" : ""
                }`}
              >
                <Icon className="w-8 h-8 text-blue-600" />
              </div>

              <h3
                className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  isHovered ? "text-blue-700" : "text-gray-900"
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
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium"
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

export default ContentWriting;
