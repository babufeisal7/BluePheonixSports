import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const sharedClasses = {
  card: 'bg-card rounded-lg shadow-md p-4 transition-transform transform hover:scale-105',
  primaryText: 'text-primary hover:text-primary/80 transition-colors text-sm',
  primaryBtn: 'bg-primary text-primary-foreground hover:bg-primary/80 mt-2 p-2 rounded transition-colors text-sm',
  sidebar: 'bg-card p-4 rounded-lg w-[342.4px]',
  sidebarItem: 'flex items-start space-x-4 text-primary hover:text-primary/80 transition-colors border-b border-gray-300 pb-4 mb-4 text-sm',
  searchInput: 'border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary transition-shadow duration-200 text-sm',
  tagsSection: 'mt-4',
  tagItem: 'inline-block px-3 py-1 mr-1 mb-1 bg-blue-200 text-blue-800 rounded-full text-xs border border-blue-300',
  socialIcons: 'flex space-x-4 mt-4',
  socialIcon: 'text-blue-600 hover:text-blue-800 transition-colors duration-300',
  pagination: 'flex justify-center space-x-4 mt-6',
  titleRecentPosts: 'text-base font-semibold mb-2 text-secondary',
  titleTags: 'text-base font-semibold mb-2 text-secondary',
};


const Sidebar = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={sharedClasses.sidebar}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search posts..."
        className={sharedClasses.searchInput}
      />
      <h2 className={sharedClasses.titleRecentPosts}>Recent Posts</h2>
      <ul>
        {filteredPosts.map((post, index) => (
          <li key={index} className={sharedClasses.sidebarItem}>
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover mr-4"
            />
            <div>
              <h3 className="text-base font-bold">
                <a href={post.url} className="hover:underline text-primary">{post.title}</a>
              </h3>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={sharedClasses.tagsSection}>
        <h3 className={sharedClasses.titleTags}>Tags</h3>
        <span className={sharedClasses.tagItem}>Rugby</span>
        <span className={sharedClasses.tagItem}>Football</span>
        <span className={sharedClasses.tagItem}>Events</span>
        <span className={sharedClasses.tagItem}>Health</span>
        <span className={sharedClasses.tagItem}>Fitness</span>
      </div>
      <div className={sharedClasses.socialIcons}>
        <a href="https://facebook.com" className={sharedClasses.socialIcon} aria-label="Facebook">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" className={sharedClasses.socialIcon} aria-label="Twitter">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" className={sharedClasses.socialIcon} aria-label="Instagram">
          <FaInstagram size={24} />
        </a>
      </div>
    </aside>
  );
};


const MainContent = ({ posts }) => {
  return (
    <main className="w-full md:w-3/4 p-6">
      <h1 className="text-4xl font-bold mb-4 text-primary">Blog</h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <article key={index} className={sharedClasses.card}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-4 text-accent">
              <a href={post.url} className="hover:underline text-primary">{post.title}</a>
            </h2>
            
            <p className="text-muted-foreground">{post.content}</p>
            <a href={post.url} className={sharedClasses.primaryBtn}>Read More</a>
            <p className="text-sm text-gray-500 mb-2">{post.date} | {post.category}</p>
            <div className="flex items-center mt-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-primary">{post.author}</p>
                <p className="text-sm text-gray-500">{post.role}</p>
              </div>
            </div>
            
          </article>
        ))}
      </div>
    </main>
  );
};

MainContent.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      authorImage: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 ${i === currentPage ? 'bg-primary text-primary-foreground' : 'bg-gray-700 text-black'} rounded hover:bg-primary hover:text-primary-foreground transition-all duration-300`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={sharedClasses.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/80 disabled:bg-gray-300 transition-colors duration-300"
      >
        Previous
      </button>
      {getPaginationButtons()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/80 disabled:bg-gray-700 transition-colors duration-300"
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const BlogComponent = () => {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const blogPosts = [
    {
      date: "Aug 11, 2024",
      category: "Rugby",
      title: "The Evolution of Rugby Training Techniques",
      content: "Discover the latest advancements in rugby training techniques and how they are transforming the game at Blue Phoenix Sports.",
      author: "James Anderson",
      role: "Rugby Coach",
      image: "/photo8.jpg",
      authorImage: "/coach3.jpg",
      url: "/blog/rugby-training-techniques",
    },
    {
      date: "Aug 10, 2024",
      category: "Football",
      title: "Enhancing Performance Through Football Tactics",
      content: "Learn about innovative football tactics and strategies being implemented at Blue Phoenix Sports to maximize team performance.",
      author: "Sarah Williams",
      role: "Football Strategist",
      image: "/football6.jpg",
      authorImage: "/coach2.jpg",
      url: "/blog/football-tactics",
    },
    {
      date: "Aug 09, 2024",
      category: "Events",
      title: "Upcoming Blue Phoenix Sports Tournaments and Events",
      content: "Stay informed about our upcoming tournaments and events at Blue Phoenix Sports, and find out how you can participate.",
      author: "Michael Lee",
      role: "Event Coordinator",
      image: "/photo13.jpg",
      authorImage: "/coach2.jpg",
      url: "/blog/upcoming-tournaments",
    },
    {
      date: "Aug 08, 2024",
      category: "Health",
      title: "Nutrition Tips for Peak Athletic Performance",
      content: "Explore essential nutrition tips to enhance athletic performance and overall health for athletes at Blue Phoenix Sports.",
      author: "Emma Clark",
      role: "Nutritionist",
      image: "/nutrition.jpg",
      authorImage: "/coach3.jpg",
      url: "/blog/nutrition-tips",
    },
    {
      date: "Aug 07, 2024",
      category: "Fitness",
      title: "Core Muscle Strength: Key to Athletic Success",
      content: "Understand the importance of core muscle strength and how it benefits athletes in various sports at Blue Phoenix Sports.",
      author: "Robert King",
      role: "Fitness Trainer",
      image: "/strength.jpg",
      authorImage: "/coach1.jpg",
      url: "/blog/core-muscle-strength",
    },
    {
      date: "Aug 05, 2024",
      category: "Rugby",
      title: "The Future of Rugby: Innovations and Trends",
      content: "An in-depth look at the future of rugby, including new technologies and trends shaping the sport at Blue Phoenix Sports.",
      author: "Alice Thompson",
      role: "Rugby Analyst",
      image: "/rugby4.jpg",
      authorImage: "/coach2.jpg",
      url: "/blog/future-of-rugby",
    },
    {
      date: "Aug 04, 2024",
      category: "Football",
      title: "Building a Winning Football Team: Strategies and Insights",
      content: "Explore strategies for building a winning football team, with insights and advice from Blue Phoenix Sports experts.",
      author: "David Lee",
      role: "Football Coach",
      image: "/football5.jpg",
      authorImage: "/coach3.jpg",
      url: "/blog/building-winning-football-team",
    },
    {
      date: "Aug 03, 2024",
      category: "Basketball",
      title: "Basketball Skills Development: Tips and Techniques",
      content: "Learn essential basketball skills and techniques to enhance your performance on the court at Blue Phoenix Sports.",
      author: "Sophia Brown",
      role: "Basketball Coach",
      image: "/basketball4.jpg",
      authorImage: "/coach1.jpg",
      url: "/blog/basketball-skills-development",
    },
    {
      date: "Aug 02, 2024",
      category: "Fitness",
      title: "Maximizing Your Workout: Effective Fitness Routines",
      content: "Discover effective fitness routines to maximize your workout and achieve your fitness goals at Blue Phoenix Sports.",
      author: "Liam Harris",
      role: "Personal Trainer",
      image: "/keeper.jpg",
      authorImage: "/coach3.jpg",
      url: "/blog/maximizing-your-workout",
    },
    {
      date: "Aug 01, 2024",
      category: "Health",
      title: "Mental Health in Sports: Strategies for Success",
      content: "Understand the importance of mental health in sports and learn strategies to maintain a healthy mindset at Blue Phoenix Sports.",
      author: "Olivia Green",
      role: "Sports Psychologist",
      image: "/vegetables.jpg",
      authorImage: "/coach1.jpg",
      url: "/blog/mental-health-in-sports",
    },
    
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const currentPosts = blogPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <div className="flex flex-1">
        <MainContent posts={currentPosts} />
        <Sidebar posts={blogPosts} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogComponent;
