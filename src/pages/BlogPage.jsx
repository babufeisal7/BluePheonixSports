import React, { useState, useEffect } from 'react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Fetch blog posts and categories from db.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        
        setBlogs(data.blogs);  // Assuming your db.json has a 'blogs' key
        setCategories(['All', ...new Set(data.blogs.map(blog => blog.category))]); // Extract categories from the blog posts
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);  // Reset to first page when category changes
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || blog.category === selectedCategory)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

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
                ${selectedCategory === category ? 'bg-blue text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{blog.date}</p>
              <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
              <button className="bg-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(filteredBlogs.length / postsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue text-white' : 'bg-gray-200'}`}
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
