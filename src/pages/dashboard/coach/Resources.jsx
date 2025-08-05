import React, { useState } from "react";

const resourceCategories = [
  { id: "all", name: "All Resources" },
  { id: "guide", name: "Guides" },
  { id: "plan", name: "Plans" },
  { id: "material", name: "Materials" },
  { id: "video", name: "Videos" },
];

const sampleResources = [
  {
    id: 1,
    title: "Training Schedule Overview",
    type: "guide",
    date: "2025-07-05",
    downloads: 124,
    image: "/pro11.jpg",
    description: "Comprehensive guide to seasonal training schedules and periodization",
  },
  {
    id: 2,
    title: "Nutrition Plan - Summer 2025",
    type: "plan",
    date: "2025-06-28",
    downloads: 89,
    image: "/strength.jpg",
    description: "Tailored nutrition strategies for summer training conditions",
  },
  {
    id: 3,
    title: "Coaching Strategies Handbook",
    type: "material",
    date: "2025-07-01",
    downloads: 56,
    image: "/football1.jpg",
    description: "Advanced coaching techniques and session planning",
  },
  {
    id: 4,
    title: "Recovery Techniques Video Series",
    type: "video",
    date: "2025-07-10",
    downloads: 203,
    image: "/photo9.jpg",
    description: "5-part video series on post-training recovery methods",
  },
];

const getTypeIcon = (type) => {
  switch (type) {
    case "guide":
      return "📘";
    case "plan":
      return "📋";
    case "material":
      return "📚";
    case "video":
      return "🎬";
    default:
      return "📄";
  }
};

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedResource, setExpandedResource] = useState(null);

  const filteredResources = sampleResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleResourceExpand = (id) => {
    setExpandedResource(expandedResource === id ? null : id);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Training Resources</h2>
          <p className="text-gray-600">
            Access training guides, nutrition plans, coaching materials, and instructional videos
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
        {resourceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 bg-gray-200">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                  {getTypeIcon(resource.type)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{resource.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{resource.type}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {resource.downloads} downloads
                  </span>
                </div>
                
                <p className="text-gray-600 mt-2 text-sm">
                  {expandedResource === resource.id 
                    ? resource.description 
                    : `${resource.description.substring(0, 80)}...`}
                </p>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">
                    Added on {new Date(resource.date).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleResourceExpand(resource.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {expandedResource === resource.id ? "Show Less" : "Read More"}
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;