import React from "react";
import { FiBookOpen, FiDownloadCloud } from "react-icons/fi";

const Resources = () => {
  const guides = [
    {
      title: "Training Schedule Overview",
      link: "#",
      author: "Coach Daniel",
      role: "Coach",
      datePosted: "2025-07-05",
    },
    {
      title: "Team Code of Conduct",
      link: "#",
      author: "Admin Team",
      role: "Admin",
      datePosted: "2025-07-01",
    },
    {
      title: "Injury Prevention Tips",
      link: "#",
      author: "Dr. Sarah",
      role: "Medic",
      datePosted: "2025-06-28",
    },
  ];

  const downloads = [
    {
      name: "Injury Recovery Protocol",
      file: "#",
      author: "Dr. Sarah",
      role: "Medic",
      datePosted: "2025-06-25",
    },
    {
      name: "Training Plan Template",
      file: "#",
      author: "Coach Daniel",
      role: "Coach",
      datePosted: "2025-07-02",
    },
  ];

  const getRoleBadge = (role) => {
    const base = "text-xs px-2 py-0.5 rounded-full font-medium";
    switch (role) {
      case "Coach":
        return `${base} bg-blue-100 text-blue-700`;
      case "Medic":
        return `${base} bg-green-100 text-green-700`;
      case "Admin":
        return `${base} bg-gray-200 text-gray-700`;
      default:
        return `${base} bg-gray-100 text-gray-500`;
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Resources</h2>

      {/* Guides Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 justify-center">
          <FiBookOpen className="text-blue-500" /> Guides & Materials
        </h3>
        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="p-4 border rounded hover:shadow-sm transition cursor-pointer"
              tabIndex={0}
              onClick={() => window.open(guide.link, "_blank")}
              onKeyDown={(e) => {
                if (e.key === "Enter") window.open(guide.link, "_blank");
              }}
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h4 className="text-md font-semibold text-blue-600 truncate max-w-[70%] sm:max-w-[85%]">
                  {guide.title}
                </h4>
                <span className={getRoleBadge(guide.role)}>{guide.role}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">
                Posted by {guide.author} on{" "}
                {new Date(guide.datePosted).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Downloads Section */}
      <div>
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 justify-center">
          <FiDownloadCloud className="text-green-500" /> Downloads
        </h3>
        <div className="space-y-4">
          {downloads.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h4 className="text-md font-semibold text-green-600 truncate max-w-[70%] sm:max-w-[85%]">
                  <a href={item.file} download>
                    {item.name}
                  </a>
                </h4>
                <span className={getRoleBadge(item.role)}>{item.role}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1 truncate">
                Posted by {item.author} on{" "}
                {new Date(item.datePosted).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
