import React, { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: "The Rise of Rugby at Blue Phoenix",
    date: "November 10, 2024",
    category: "Rugby",
    excerpt: "Discover how Blue Phoenix Rugby Club has risen in ranks...",
    image: "/public/image1.jpg",
  },
  {
    id: 2,
    title: "Top 5 Training Tips for Young Athletes",
    date: "October 25, 2024",
    category: "Training",
    excerpt: "Improve your game with these essential tips...",
    image: "/public/image2.jpg",
  },
  {
    id: 3,
    title: "Upcoming Rugby Events You Don’t Want to Miss",
    date: "October 15, 2024",
    category: "Rugby",
    excerpt: "Join us at our upcoming rugby events...",
    image: "/public/image3.jpg",
  },
  {
    id: 4,
    title: "Football Training: Building Strong Foundations",
    date: "September 30, 2024",
    category: "Football",
    excerpt: "Learn the fundamentals of football and improve your skills...",
    image: "/public/image4.jpg",
  },
  {
    id: 5,
    title: "Basketball Drills for Beginners",
    date: "September 22, 2024",
    category: "Basketball",
    excerpt: "Master these essential basketball drills to improve your game...",
    image: "/public/image5.jpg",
  },
  {
    id: 6,
    title: "Swimming Techniques for Better Performance",
    date: "September 10, 2024",
    category: "Swimming",
    excerpt: "Enhance your swimming skills with these advanced techniques...",
    image: "/public/image6.jpg",
  },
  {
    id: 7,
    title: "Healthy Eating for Athletes",
    date: "August 25, 2024",
    category: "Health",
    excerpt: "Fuel your body with the best foods for peak performance...",
    image: "/public/image7.jpg",
  },
  {
    id: 8,
    title: "The Importance of Mental Health in Sports",
    date: "August 10, 2024",
    category: "Health",
    excerpt: "Taking care of your mental health is as important as physical fitness...",
    image: "/public/image8.jpg",
  },
  {
    id: 9,
    title: "Upcoming Sports Events at Blue Phoenix",
    date: "July 25, 2024",
    category: "Events",
    excerpt: "Check out the upcoming sports events you should be a part of...",
    image: "/public/image9.jpg",
  },
  // Add more blog posts as needed
];

const categories = ["All", "Rugby", "Football", "Basketball", "Swimming", "Events", "Health"];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredPosts = blogPosts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || post.category === selectedCategory)
    );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 py-10 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Our Blog</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with the latest news, tips, and stories from Blue Phoenix Rugby Club.
        </p>
      </div>
      
      {/* Search and Category Filter on Same Line */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-full text-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`py-2 px-4 text-sm rounded-full transition-all duration-300 
                ${selectedCategory === category ? "bg-blue text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{post.date}</p>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <button className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === i + 1 ? "bg-blue text-white" : "bg-gray-200"}`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
