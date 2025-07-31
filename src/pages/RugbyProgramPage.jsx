import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaRegCalendarAlt, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaStar, 
  FaArrowRight,
  FaChevronRight,
  FaQuoteLeft
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiRugbyConversion, GiTrophy } from 'react-icons/gi';

const RugbyProgramPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const coaches = [
    {
      id: 1,
      name: 'Coach David Wilson',
      role: 'Head Coach',
      description: 'Former professional rugby player with 15 years coaching experience. Specializes in forward play and set pieces.',
      imgSrc: '/coach2.jpg',
      achievements: ['National Championship winner', 'Developed 10 professional players', 'Coach of the Year 2019']
    },
    {
      id: 2,
      name: 'Coach Sarah O\'Connor',
      role: 'Backs Coach',
      description: 'International rugby veteran specializing in backline attack and defensive systems.',
      imgSrc: '/coach1.jpg',
      achievements: ['50 international caps', 'Backline play specialist', 'Led league in try assists']
    },
    {
      id: 3,
      name: 'Coach James Tanaka',
      role: 'Strength Coach',
      description: 'Certified performance specialist with focus on rugby-specific conditioning.',
      imgSrc: '/coach3.jpg',
      achievements: ['World Rugby certified', 'Worked with national team athletes', 'Injury prevention expert']
    },
    {
      id: 4,
      name: 'Coach Emma Patel',
      role: 'Youth Development',
      description: 'Specializes in fundamental skill building for young rugby players.',
      imgSrc: '/coach2.jpg',
      achievements: ['12+ years youth coaching', 'World Rugby Level 3 certified', 'Player-first philosophy']
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The physical and technical development I've experienced here is unmatched. My game has transformed completely.",
      author: "Michael T.",
      role: "Club Player",
      rating: 5,
      playerImage: "/photo8.jpg",
      sport: "rugby",
      achievement: "Club Player of the Year"
    },
    {
      id: 2,
      quote: "Not only has my rugby improved, but I've gained confidence and leadership skills that help in all areas of life.",
      author: "Olivia P.",
      role: "U18 Player",
      rating: 5,
      playerImage: "/photo9.jpg",
      sport: "rugby",
      achievement: "Team captain"
    },
    {
      id: 3,
      quote: "Coach Wilson's understanding of the game is incredible. My rugby IQ has improved dramatically.",
      author: "Samuel R.",
      role: "Academy Prospect",
      rating: 5,
      playerImage: "/photo11.jpg",
      sport: "rugby",
      achievement: "Academy MVP"
    },
    {
      id: 4,
      quote: "The strength training program helped me increase my power and endurance significantly in one season!",
      author: "Jessica L.",
      role: "Women's Team Captain",
      rating: 4,
      playerImage: "/photo12.jpg",
      sport: "rugby",
      achievement: "Regional representative"
    }
  ];

  const programLevels = [
    {
      name: "Junior Rugby (Ages 8-12)",
      description: "Focus on basic skills, teamwork, and enjoyment of the game",
      features: ["Twice weekly sessions", "Non-contact introduction", "Fun rugby activities"]
    },
    {
      name: "Youth Rugby (Ages 13-16)",
      description: "Development of core skills and introduction to contact rugby",
      features: ["Position-specific training", "Game situation drills", "Strength fundamentals"]
    },
    {
      name: "Senior Academy (Ages 17-21)",
      description: "High performance training for serious players",
      features: ["Advanced skill work", "Video analysis", "Professional pathway support"]
    },
    {
      name: "Adult Rugby",
      description: "Competitive play for all skill levels",
      features: ["Men's and Women's teams", "League competitions", "Social rugby options"]
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Open Trials - Summer Season",
      date: "June 10, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Main Field"
    },
    {
      id: 2,
      title: "Tackle Technique Clinic",
      date: "June 17, 2024",
      time: "5:30 PM - 7:30 PM",
      location: "Field 2"
    },
    {
      id: 3,
      title: "Parent Information Session",
      date: "June 5, 2024",
      time: "6:00 PM - 7:00 PM",
      location: "Clubhouse"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`${i < rating ? "text-yellow-400" : "text-gray-300"} w-5 h-5`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-75"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-[500px] object-cover"
          poster="/photo9.jpg"
        >
          <source src="/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Rugby Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl drop-shadow-md"
          >
            Premier rugby development for players at all levels
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Now <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/schedule-tour"
              className="bg-transparent hover:bg-white hover:text-blue-800 text-white font-bold py-3 px-8 rounded-full inline-flex items-center border-2 border-white transition-all duration-300 shadow-lg"
            >
              Schedule a Visit
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Program Navigation Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap border-b border-gray-200 mb-12"
      >
        {['overview', 'levels', 'coaches', 'schedule', 'results'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 font-medium text-lg transition-colors duration-200 relative ${activeTab === tab ? 'text-blue-800' : 'text-gray-600 hover:text-blue-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div 
                layoutId="tabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-800 rounded-t"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <div className="mb-16">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Program Philosophy</h2>
              <p className="text-lg mb-6">
                Our Rugby Development Program takes a comprehensive approach to player development, focusing on technical skills, 
                game understanding, physical conditioning, and teamwork. We believe in developing complete rugby players who 
                excel in all facets of the game while upholding the values of sportsmanship.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <GiRugbyConversion className="mr-2" /> What Makes Us Different
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <span>Small coach-to-player ratios (max 6:1)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <span>Video analysis and performance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <span>Professional pathway support for elite players</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <span>Nutrition and injury prevention workshops</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <IoMdTime className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Training Schedule</h4>
                    <p>Tuesday & Thursday: 5:30pm - 7:30pm</p>
                    <p>Saturday: 9:00am - 11:00am (match days vary)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Season</h4>
                    <p>August - May with summer 7s program</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p>Green Dragon Rugby Club - Pitch 1</p>
                    <p className="text-blue-200 mt-1">1500 Rugby Lane, Springfield</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaDollarSign />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Fees</h4>
                    <p>$250/month (discounts for siblings and annual payment)</p>
                    <p className="text-blue-200 mt-1">Scholarships available based on need</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'levels' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-8">Program Levels</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programLevels.map((level, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4">
                    <h3 className="text-xl font-bold text-center">{level.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{level.description}</p>
                    <ul className="space-y-2">
                      {level.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 w-full bg-green-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'coaches' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Meet Our Coaching Staff</h2>
            <p className="max-w-3xl text-lg mb-8">
              Our coaching staff brings a wealth of playing and coaching experience at the highest levels of rugby.
              Each coach specializes in specific areas of player development to provide comprehensive training.
            </p>
            
            <Slider {...settings}>
              {coaches.map(coach => (
                <div key={coach.id} className="px-3 h-full focus:outline-none">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                    <div className="h-64 bg-gray-200 overflow-hidden relative">
                      <img
                        src={coach.imgSrc}
                        alt={coach.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        onError={e => (e.target.src = '/coach2.jpg')}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                        <p className="text-red-300 font-medium">{coach.role}</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-700 mb-4 flex-grow">{coach.description}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-green-800 mb-2">Notable Achievements:</h4>
                        <ul className="space-y-1">
                          {coach.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span className="text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        )}

        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Upcoming Events</h2>
              <div className="space-y-6">
                {upcomingEvents.map(event => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ x: 5 }}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <FaRegCalendarAlt className="mr-2 text-red-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <IoMdTime className="mr-2 text-red-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <button className="mt-4 text-red-600 font-medium hover:text-red-700 flex items-center">
                      More details <FaArrowRight className="ml-1" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Weekly Schedule</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-200">
                  {[
                    { day: 'Monday', time: 'Rest Day', activity: 'Recovery Session', level: 'Optional' },
                    { day: 'Tuesday', time: '5:30 PM - 7:30 PM', activity: 'Skills & Drills', level: 'All Levels' },
                    { day: 'Wednesday', time: '4:30 PM - 6:30 PM', activity: 'Strength & Conditioning', level: 'U16+' },
                    { day: 'Thursday', time: '5:30 PM - 7:30 PM', activity: 'Team Play & Scrimmages', level: 'All Levels' },
                    { day: 'Friday', time: 'Rest Day', activity: 'Optional Skills Session', level: '' },
                    { day: 'Saturday', time: '9:00 AM - 11:00 AM', activity: 'Match Days/Game Prep', level: 'All Teams' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 hover:bg-blue-50 transition-colors duration-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-lg">{item.day}</h3>
                          <p className="text-gray-600">{item.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.activity}</p>
                          {item.level && <p className="text-sm text-gray-500">{item.level}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Results Speak for Themselves</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">18+</div>
                <div className="text-lg font-medium">Players signed to professional contracts</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">95%</div>
                <div className="text-lg font-medium">Player satisfaction rate</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">12</div>
                <div className="text-lg font-medium">League championships last season</div>
              </motion.div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Success Stories</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start mb-4">
                    <img 
                      src="/image1.jpg" 
                      alt="Success story" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      onError={e => (e.target.src = '/image2.jpg')}
                    />
                    <div>
                      <h4 className="font-bold">Thomas Wilson</h4>
                      <p className="text-gray-600">Professional Rugby Player</p>
                      <div className="mt-1">{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "The program's focus on my weaknesses and consistent feedback helped me earn a professional contract. 
                    Coach David's connections were invaluable during recruitment."
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start mb-4">
                    <img 
                      src="/image3.jpg" 
                      alt="Success story" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      onError={e => (e.target.src = '/image4.jpg')}
                    />
                    <div>
                      <h4 className="font-bold">Emma Johnson</h4>
                      <p className="text-gray-600">National Team Selection</p>
                      <div className="mt-1">{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Coach Sarah transformed my understanding of backline play. Went from club player to national team in two seasons. 
                    The video analysis was a game-changer."
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="my-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              <span className="relative inline-block">
                <span className="relative z-10">Rugby Community Voices</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-green-100 opacity-70 -rotate-1"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from players and parents about their rugby journey with us
            </p>
          </div>

          <Slider {...testimonialSettings} className="pb-10">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-4">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-8 h-full flex flex-col">
                    {/* Player image and info */}
                    <div className="flex items-center mb-6">
                      <div className="relative mr-5">
                        <img 
                          src={testimonial.playerImage} 
                          alt={testimonial.author}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          onError={(e) => {
                            e.target.src = '/photo6.jpg';
                          }}
                        />
                        {testimonial.sport && (
                          <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full shadow-md">
                            <GiRugbyConversion className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">{testimonial.author}</h4>
                        <p className="text-gray-600">{testimonial.role}</p>
                        <div className="mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial quote */}
                    <div className="relative flex-grow mb-6">
                      <FaQuoteLeft className="absolute top-0 left-0 text-blue-100 text-4xl" />
                      <blockquote className="text-gray-700 text-lg pl-10 relative z-10">
                        {testimonial.quote}
                      </blockquote>
                    </div>

                    {/* Achievement badge */}
                    {testimonial.achievement && (
                      <div className="mt-auto">
                        <div className="bg-blue-50 rounded-lg px-4 py-3 flex items-start">
                          <GiTrophy className="text-yellow-500 text-xl mt-1 mr-3 flex-shrink-0" />
                          <span className="text-blue-800 font-medium">
                            {testimonial.achievement}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>

        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 rounded-xl shadow-xl mb-8"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Rugby to the Next Level?</h2>
          <p className="text-xl mb-8">
            Join the region's most comprehensive rugby development program today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Now <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <p className="mt-6 text-blue-200">
            Have questions? Call us at (555) 123-4567 or email info@greendragonrugby.com
          </p>
        </div>
      </motion.section>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-50 rounded-xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-2">Stay Updated</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Sign up for our newsletter to receive training tips, program updates, and special offers.
        </p>
        <div className="flex max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RugbyProgramPage;