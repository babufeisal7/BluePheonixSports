import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSwimmer, 
  FaRegCalendarAlt, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaStar, 
  FaArrowRight,
  FaChevronRight,
  FaQuoteLeft
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { GiTrophy } from 'react-icons/gi';

const SwimmingProgramPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const coaches = [
    {
      id: 1,
      name: 'Coach Michael Johnson',
      role: 'Head Coach',
      description: 'Former Olympic swimmer with 15 years coaching experience. Specializes in stroke technique and endurance training.',
      imgSrc: '/coach1.jpg',
      achievements: ['2-time Olympic medalist', 'Developed 10 national champions', 'Coach of the Year 2019']
    },
    {
      id: 2,
      name: 'Coach Sarah Williams',
      role: 'Technique Coach',
      description: 'Expert in stroke mechanics and starts/turns with a focus on youth development.',
      imgSrc: '/coach2.jpg',
      achievements: ['NCAA All-American', 'ASCA Level 5 Certified', 'Youth National Team Coach']
    },
    {
      id: 3,
      name: 'Coach David Chen',
      role: 'Strength Coach',
      description: 'Certified strength specialist with focus on swim-specific dryland training.',
      imgSrc: '/coach3.jpg',
      achievements: ['NSCA Certified', 'Worked with Olympic athletes', 'Injury prevention expert']
    },
    {
      id: 4,
      name: 'Coach Emily Rodriguez',
      role: 'Beginner Program',
      description: 'Specializes in water safety and foundational skills for new swimmers.',
      imgSrc: '/coach2.jpg',
      achievements: ['10+ years teaching beginners', 'Red Cross Certified', 'Patient and encouraging approach']
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "My butterfly technique improved dramatically after just one month with Coach Michael. I dropped 3 seconds in my 100 fly!",
      author: "Daniel K.",
      role: "High School Swimmer",
      rating: 5,
      swimmerImage: "/swimming1.jpg",
      achievement: "3-second improvement in 100m fly"
    },
    {
      id: 2,
      quote: "The beginner program gave my daughter confidence in the water. She went from fearful to swimming laps in just 8 weeks.",
      author: "Lisa M.",
      role: "Parent",
      rating: 5,
      swimmerImage: "/swimming5.jpg"
    },
    {
      id: 3,
      quote: "The attention to detail in stroke technique is unmatched. My swimming has never been more efficient.",
      author: "Priya S.",
      role: "College Swimmer",
      rating: 5,
      swimmerImage: "/swimming7.jpg",
      achievement: "Conference champion"
    },
    {
      id: 4,
      quote: "The dryland program helped me increase my power off the walls significantly. My turns are now my strongest skill.",
      author: "Marcus T.",
      role: "Competitive Swimmer",
      rating: 4,
      swimmerImage: "/swimming9.jpg",
      achievement: "State record holder"
    }
  ];

  const programLevels = [
    {
      name: "Learn-to-Swim (Ages 4-8)",
      description: "Water safety and foundational swimming skills",
      features: ["Small class sizes (4:1 ratio)", "Fun, game-based learning", "Progress tracking"]
    },
    {
      name: "Development Squad (Ages 9-12)",
      description: "Introduction to competitive swimming",
      features: ["All four competitive strokes", "Basic starts and turns", "Introduction to training sets"]
    },
    {
      name: "Performance Group (Ages 13-18)",
      description: "Serious training for competitive swimmers",
      features: ["Advanced technique work", "Race strategy", "Competition preparation"]
    },
    {
      name: "Masters Swimming",
      description: "Adult training for fitness and competition",
      features: ["Lane swimming by ability", "Coached workouts", "Option to compete"]
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "New Session Evaluations",
      date: "June 5, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Main Pool"
    },
    {
      id: 2,
      title: "Freestyle Technique Clinic",
      date: "June 12, 2024",
      time: "5:30 PM - 7:30 PM",
      location: "Lane 3-4"
    },
    {
      id: 3,
      title: "Parent Information Session",
      date: "June 8, 2024",
      time: "6:00 PM - 7:00 PM",
      location: "Pool Deck"
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
          poster="/swimming6.jpg"
        >
          <source src="/swimmingvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Dive Into Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl drop-shadow-md"
          >
            Premier swimming development for all ages and skill levels
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                Our Swimming Development Program takes a progressive approach to swimmer development, focusing on 
                proper technique, endurance, racing skills, and water safety. We believe in developing confident, 
                efficient swimmers who can excel in both competition and lifelong aquatic activities.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaSwimmer className="mr-2" /> What Makes Us Different
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <span>Low swimmer-to-coach ratios (max 5:1 for beginners)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <span>Underwater video analysis and stroke correction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <span>College recruitment support for elite swimmers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                    <span>Comprehensive dryland training program</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-teal-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <IoMdTime className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Training Schedule</h4>
                    <p>Monday-Friday: 4:00pm - 7:00pm (by level)</p>
                    <p>Saturday: 8:00am - 10:00am (optional technique session)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaRegCalendarAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Season</h4>
                    <p>Year-round with seasonal competitions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-500 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Location</h4>
                    <p>Blue Phoenix Aquatic Center - Olympic Pool</p>
                    <p className="text-blue-200 mt-1">1200 Sports Way, Springfield</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-teal-500 p-3 rounded-lg mr-4 flex-shrink-0">
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
              Our coaching staff brings Olympic, national, and collegiate swimming experience to every practice.
              Each coach specializes in specific areas of swimmer development to provide comprehensive training.
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
                        onError={e => (e.target.src = '/coach3.jpg')}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{coach.name}</h3>
                        <p className="text-teal-300 font-medium">{coach.role}</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-700 mb-4 flex-grow">{coach.description}</p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Notable Achievements:</h4>
                        <ul className="space-y-1">
                          {coach.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-teal-500 mr-2">•</span>
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
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <FaRegCalendarAlt className="mr-2 text-teal-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <IoMdTime className="mr-2 text-teal-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-teal-500" />
                      <span>{event.location}</span>
                    </div>
                    <button className="mt-4 text-teal-600 font-medium hover:text-teal-700 flex items-center">
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
                    { day: 'Monday', time: '4:00 PM - 6:00 PM', activity: 'Freestyle Technique', level: 'All Levels' },
                    { day: 'Tuesday', time: '4:00 PM - 6:00 PM', activity: 'Endurance Training', level: 'Performance Group' },
                    { day: 'Wednesday', time: '4:00 PM - 6:00 PM', activity: 'Stroke Development', level: 'Development Squad' },
                    { day: 'Thursday', time: '4:00 PM - 6:00 PM', activity: 'Starts & Turns Clinic', level: 'Performance Group' },
                    { day: 'Friday', time: '4:00 PM - 6:00 PM', activity: 'Race Simulation', level: 'All Levels' },
                    { day: 'Saturday', time: '8:00 AM - 10:00 AM', activity: 'Technique Refinement', level: 'Optional' }
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
                <div className="text-5xl font-bold text-blue-800 mb-2">35+</div>
                <div className="text-lg font-medium">Swimmers recruited to college programs</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">98%</div>
                <div className="text-lg font-medium">Swimmer satisfaction rate</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="text-5xl font-bold text-blue-800 mb-2">42</div>
                <div className="text-lg font-medium">State records broken by our swimmers</div>
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
                      src="/swimming1.jpg" 
                      alt="Success story" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      onError={e => (e.target.src = '/swimming2.jpg')}
                    />
                    <div>
                      <h4 className="font-bold">Kevin Zhang</h4>
                      <p className="text-gray-600">D1 Scholarship Recipient</p>
                      <div className="mt-1">{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "Coach Michael's attention to detail in my stroke technique helped me earn a full scholarship. 
                    The underwater video analysis was revolutionary for my swimming."
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-start mb-4">
                    <img 
                      src="/swimming3.jpg" 
                      alt="Success story" 
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
                      onError={e => (e.target.src = '/swimming4.jpg')}
                    />
                    <div>
                      <h4 className="font-bold">Sophia Martinez</h4>
                      <p className="text-gray-600">Junior National Champion</p>
                      <div className="mt-1">{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "The dryland program transformed my starts and turns. I went from middle of the pack to 
                    winning my first national title in the 200m backstroke."
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
                <span className="relative z-10">Swimmer & Parent Experiences</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 opacity-70 -rotate-1"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those who've trained with our swimming program
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
                    {/* Swimmer image and info */}
                    <div className="flex items-center mb-6">
                      <div className="relative mr-5">
                        <img 
                          src={testimonial.swimmerImage} 
                          alt={testimonial.author}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          onError={(e) => {
                            e.target.src = '/swimming1.jpg';
                          }}
                        />
                        {testimonial.achievement && (
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-md">
                            <FaSwimmer className="h-4 w-4" />
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
                      <FaQuoteLeft className="absolute top-0 left-0 text-blue-100 text-3xl" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Swimming to the Next Level?</h2>
          <p className="text-xl mb-8">
            Join the area's most comprehensive swimming development program today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Now <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <p className="mt-6 text-blue-200">
            Have questions? Call us at (555) 123-4567 or email info@bluephoenixswim.com
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

export default SwimmingProgramPage;