import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBasketballBall, 
  FaRegCalendarAlt, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaStar, 
  FaArrowRight,
  FaChevronRight,
  FaQuoteLeft,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa';
import { IoMdTime, IoIosBasketball } from 'react-icons/io';
import { GiBasketballJersey, GiTrophy } from 'react-icons/gi';

const BasketballProgramPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const coaches = [
    {
      id: 1,
      name: 'Coach Marcus Johnson',
      role: 'Head Coach',
      description: 'Former Division I player with 12 years coaching experience. Specializes in offensive strategy and player development.',
      imgSrc: '/coach1.jpg',
      achievements: ['NCAA Tournament appearance', 'Developed 5 D1 players', 'Coach of the Year 2020']
    },
    {
      id: 2,
      name: 'Coach Elena Rodriguez',
      role: 'Skills Coach',
      description: 'WNBA veteran specializing in guard development and shooting mechanics.',
      imgSrc: '/coach3.jpg',
      achievements: ['WNBA Champion 2015', '3-point shooting specialist', 'Led league in assists 2013']
    },
    {
      id: 3,
      name: 'Coach Derek Williams',
      role: 'Strength Coach',
      description: 'Certified performance specialist with focus on basketball-specific athleticism.',
      imgSrc: '/coach2.jpg',
      achievements: ['NSCA Certified', 'Worked with NBA combine athletes', 'Injury prevention expert']
    },
    {
      id: 4,
      name: 'Coach Sarah Chen',
      role: 'Youth Development',
      description: 'Specializes in fundamental skill building for young players.',
      imgSrc: '/coach1.jpg',
      achievements: ['10+ years youth coaching', 'Positive Coaching Alliance certified', 'Player-first philosophy']
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The individual attention to detail in my game has taken me to another level. Best decision I ever made.",
      author: "Tyler S.",
      role: "High School Starter",
      rating: 5,
      playerImage: "/basketball4.jpg",
      sport: "basketball",
      achievement: "Received D2 scholarship offer"
    },
    {
      id: 2,
      quote: "Not only has my game improved, but I've made lifelong friends through this program.",
      author: "Maya P.",
      role: "U14 Player",
      rating: 5,
      playerImage: "/basketball4.jpg",
      sport: "basketball",
      achievement: "Team captain 2 years running"
    },
    {
      id: 3,
      quote: "Coach Marcus transformed my understanding of the game. My basketball IQ has improved dramatically.",
      author: "Jamal R.",
      role: "College Prospect",
      rating: 5,
      playerImage: "/basketball4.jpg",
      sport: "basketball",
      achievement: "Led state in assists"
    },
    {
      id: 4,
      quote: "The strength training program helped me increase my vertical by 6 inches in one season!",
      author: "Aisha T.",
      role: "Varsity Player",
      rating: 4,
      playerImage: "/basketball4.jpg",
      sport: "basketball",
      achievement: "All-Conference selection"
    },
    {
      id: 5,
      quote: "As a parent, I've seen incredible growth in my son's confidence and skills. Worth every penny.",
      author: "David K.",
      role: "Parent",
      rating: 5,
      playerImage: "/coach3.jpg"
    }
  ];

  const programLevels = [
    {
      name: "Youth Fundamentals (Ages 8-11)",
      description: "Focus on basic skills, coordination, and love for the game",
      features: ["Twice weekly sessions", "Small group instruction", "Fun competitions"]
    },
    {
      name: "Middle School Development (Ages 12-14)",
      description: "Transition to more advanced concepts and team play",
      features: ["Position-specific training", "Game situation drills", "Strength fundamentals"]
    },
    {
      name: "High School Prep (Ages 15-18)",
      description: "College-style training for serious players",
      features: ["Advanced skill work", "Film study", "Recruitment support"]
    },
    {
      name: "Adult Leagues",
      description: "Competitive play for all skill levels",
      features: ["Seasonal leagues", "Officiated games", "Skill clinics"]
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Open Tryouts - Spring Season",
      date: "March 15, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Main Court"
    },
    {
      id: 2,
      title: "Shooting Clinic with Coach Elena",
      date: "March 22, 2024",
      time: "5:30 PM - 7:30 PM",
      location: "Court 2"
    },
    {
      id: 3,
      title: "Parent Information Session",
      date: "March 10, 2024",
      time: "6:00 PM - 7:00 PM",
      location: "Conference Room"
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-50"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-[500px] object-cover"
          poster="/basketball4.jpg"
        >
          <source src="/basketballvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Elevate Your Game
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl drop-shadow-md"
          >
            Premier basketball development for players at all levels
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/register"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                Our Basketball Development Program takes a holistic approach to player development, focusing on technical skills, 
                basketball IQ, physical conditioning, and mental toughness. We believe in developing complete players who 
                excel in all facets of the game.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaBasketballBall className="mr-2" /> What Makes Us Different
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <span>Small coach-to-player ratios (max 8:1)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <span>Video analysis and performance tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <span>College recruitment support for elite players</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <span>Nutrition and mental performance workshops</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <IoMdTime className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Training Schedule</h4>
                    <p>Monday & Wednesday: 5:00pm - 7:00pm</p>
                    <p>Saturday: 10:00am - 12:00pm (optional skills session)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Season</h4>
                    <p>Year-round with seasonal leagues and tournaments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p>Blue Phoenix Sports Complex - Court 1</p>
                    <p className="text-blue-200 mt-1">1200 Sports Way, Springfield</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaDollarSign />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Fees</h4>
                    <p>$225/month (discounts for siblings and annual payment)</p>
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
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
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
              Our coaching staff brings a wealth of playing and coaching experience at the highest levels of basketball.
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
                        onError={e => (e.target.src = '/coach1.jpg')}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                        <p className="text-orange-300 font-medium">{coach.role}</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-700 mb-4 flex-grow">{coach.description}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Notable Achievements:</h4>
                        <ul className="space-y-1">
                          {coach.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-orange-500 mr-2">•</span>
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
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <FaRegCalendarAlt className="mr-2 text-orange-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <IoMdTime className="mr-2 text-orange-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      <span>{event.location}</span>
                    </div>
                    <button className="mt-4 text-orange-600 font-medium hover:text-orange-700 flex items-center">
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
                    { day: 'Monday', time: '5:00 PM - 7:00 PM', activity: 'Skills Training & Drills', level: 'All Levels' },
                    { day: 'Tuesday', time: '4:30 PM - 6:30 PM', activity: 'Strength & Conditioning', level: 'High School+' },
                    { day: 'Wednesday', time: '5:00 PM - 7:00 PM', activity: 'Team Concepts & Scrimmages', level: 'All Levels' },
                    { day: 'Thursday', time: '4:30 PM - 6:30 PM', activity: 'Shooting Clinic', level: 'Middle School+' },
                    { day: 'Friday', time: 'Rest Day', activity: 'Optional Open Gym', level: '' },
                    { day: 'Saturday', time: '10:00 AM - 12:00 PM', activity: 'Game Situations & Competitions', level: 'All Levels' }
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
                <div className="text-5xl font-bold text-blue-800 mb-2">27+</div>
                <div className="text-lg font-medium">Players recruited to college programs</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">96%</div>
                <div className="text-lg font-medium">Player satisfaction rate</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">15</div>
                <div className="text-lg font-medium">Tournament championships last season</div>
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
                      src="/photo9.jpg" 
                      alt="Success story" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      onError={e => (e.target.src = '/photo9.jpg')}
                    />
                    <div>
                      <h4 className="font-bold">Jason Miller</h4>
                      <p className="text-gray-600">D2 Scholarship Recipient</p>
                      <div className="mt-1">{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "The program's focus on my weaknesses and consistent feedback helped me earn a scholarship. 
                    Coach Marcus' connections were invaluable during recruitment."
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start mb-4">
                    <img 
                      src="/photo5.jpg" 
                      alt="Success story" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      onError={e => (e.target.src = '/photo5.jpg')}
                    />
                    <div>
                      <h4 className="font-bold">Sophia Nguyen</h4>
                      <p className="text-gray-600">Led State in 3P%</p>
                      <div className="mt-1">{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Coach Elena rebuilt my shot from the ground up. Went from 28% to 42% from three in one season. 
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
                <span className="relative z-10">Success Stories</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 opacity-70 -rotate-1"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our players and parents about their Blue Phoenix experience
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
                            e.target.src = '/coach1.jpg';
                          }}
                        />
                        {testimonial.sport && (
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-md">
                            <IoIosBasketball className="h-5 w-5" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Game to the Next Level?</h2>
          <p className="text-xl mb-8">
            Join the area's most comprehensive basketball development program today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Now <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <p className="mt-6 text-blue-200">
            Have questions? Call us at (555) 123-4567 or email info@bluephoenixhoops.com
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default BasketballProgramPage;