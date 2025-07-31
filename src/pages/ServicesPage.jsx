import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSchool,
  faUsers,
  faCalendarAlt,
  faShoppingBag,
  faRunning,
  faFutbol,
  faSwimmer,
  faInfoCircle,
  faCheckCircle,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const USD_TO_UGX = 3700;

const iconSize = 'h-12 w-12 text-blue-600 p-2 bg-blue-50 rounded-lg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardHoverVariants = {
  hover: { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }
};

const professionalServices = [
  {
    title: 'Schools Sports Management',
    description:
      'We design, implement, and manage school-wide sports programs that inspire and develop young athletes.',
    icon: <FontAwesomeIcon icon={faSchool} className={iconSize} />,
    image: '/image1.jpg',
    price: 'Custom Quote',
    features: [
      'Custom term schedules',
      'Coach recruitment & training',
      'Inter-school competition setup',
      'PE curriculum support',
      'Student performance tracking'
    ],
    accentColor: 'bg-indigo-600'
  },
  {
    title: 'Sports Team Management',
    description:
      'We handle team operations from recruitment to matchday logistics with comprehensive performance solutions.',
    icon: <FontAwesomeIcon icon={faUsers} className={iconSize} />,
    image: '/coach1.jpg',
    price: 'From 1,000,000 UGX/month',
    features: [
      'Team building & strategy sessions',
      'Player recruitment & development',
      'Fitness & injury management',
      'Match analysis reports',
      'Fixture planning & logistics'
    ],
    accentColor: 'bg-blue-600'
  },
  {
    title: 'Sports Events Management',
    description:
      'From concept to execution, we manage everything ensuring a memorable experience for all participants.',
    icon: <FontAwesomeIcon icon={faCalendarAlt} className={iconSize} />,
    image: '/coach1.jpg',
    price: 'From 1,000,000 UGX/event',
    features: [
      'Venue booking & setup',
      'Live scoring & results',
      'Sponsorship & branding',
      'Ticketing & access control',
      'Post-event reporting'
    ],
    accentColor: 'bg-teal-600'
  },
  {
    title: 'Merchandise Sales',
    description:
      'Boost team identity with high-quality branded merchandise with design support and fulfillment.',
    icon: <FontAwesomeIcon icon={faShoppingBag} className={iconSize} />,
    image: '/coach1.jpg',
    price: 'From 50,000 UGX/item',
    features: [
      'Custom jersey printing',
      'Bulk order discounts',
      'On-demand delivery',
      'Fan store setup',
      'Merch design support'
    ],
    accentColor: 'bg-purple-600'
  }
];

const youthPrograms = [
  {
    title: 'Rugby Program',
    ageRange: 'Ages 8 – 18 | Boys & Girls',
    icon: <FontAwesomeIcon icon={faRunning} className={iconSize} />,
    priceUSD: 100,
    features: [
      'Weekly training (3 sessions)',
      'Match fixtures and tournaments',
      'Nutrition & strength sessions',
      'Uniform included',
      'Player performance tracking'
    ],
    highlight: 'Most popular',
    accentColor: 'bg-red-600'
  },
  {
    title: 'Football Program',
    ageRange: 'Ages 6 – 18 | Boys & Girls',
    icon: <FontAwesomeIcon icon={faFutbol} className={iconSize} />,
    priceUSD: 100,
    features: [
      '3–4 weekly sessions',
      'Goalkeeper training',
      'Video match analysis',
      'College recruitment support',
      'Fitness & conditioning'
    ],
    accentColor: 'bg-green-600'
  },
  {
    title: 'Basketball Program',
    ageRange: 'Ages 8 – 18 | Boys & Girls',
    icon: <FontAwesomeIcon icon={faUsers} className={iconSize} />,
    priceUSD: 100,
    features: [
      '3 sessions per week',
      'Skill-based drills & scrimmages',
      'Strength and agility training',
      'Team competitions',
      'Basketball IQ development'
    ],
    accentColor: 'bg-orange-600'
  },
  {
    title: 'Swimming Program',
    ageRange: 'Ages 4+ | All Levels',
    icon: <FontAwesomeIcon icon={faSwimmer} className={iconSize} />,
    priceUSD: 100,
    features: [
      'Daily sessions available',
      'Olympic-sized pool access',
      'Stroke technique training',
      'Competitive swim meets',
      'Aquatic safety training'
    ],
    highlight: 'Limited spots',
    accentColor: 'bg-cyan-600'
  },
];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [expandedService, setExpandedService] = useState(null);

  const toggleServiceExpand = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
        >
          Our Services & Programs
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Comprehensive sports management solutions and youth development programs to nurture talent at all levels.
        </motion.p>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-8 mb-12"
        >
          <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-gray-200">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'services' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Professional Services
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'programs' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Youth Programs
            </button>
          </div>
        </motion.div>
      </div>

      {/* Services Section */}
      {activeTab === 'services' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {professionalServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                variants={cardHoverVariants}
                className={`bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 ${
                  expandedService === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className={`h-2 ${service.accentColor}`}></div>
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-xl font-bold text-blue-700">{service.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleServiceExpand(index)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                          {expandedService === index ? 'Less details' : 'More details'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedService === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 px-6 py-4 border-t border-gray-200 overflow-hidden"
                    >
                      <h4 className="font-bold text-gray-800 mb-3">Service Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md"
                      >
                        Request Service
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Youth Programs Section */}
      {activeTab === 'programs' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-12">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold text-blue-800 mb-2"
            >
              Youth Development Programs
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our programs are designed to develop young athletes both on and off the field.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {youthPrograms.map((program, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className={`relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all ${
                  program.highlight ? 'border-blue-500' : ''
                }`}
              >
                {program.highlight && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12 shadow-sm">
                    {program.highlight}
                  </div>
                )}
                
                <div className={`h-2 ${program.accentColor}`}></div>
                
                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-lg ${program.accentColor.replace('bg-', 'bg-opacity-10 ')}`}>
                      {program.icon}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{program.title}</h2>
                  <p className="text-gray-600 text-sm mb-6">{program.ageRange}</p>
                  
                  <div className="mb-6">
                    <p className="text-3xl font-extrabold text-gray-900">
                      {(program.priceUSD * USD_TO_UGX).toLocaleString()} UGX
                    </p>
                    <p className="text-gray-500 text-sm">≈ ${program.priceUSD}/month</p>
                  </div>
                  
                  <ul className="text-left space-y-3 mb-8">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full ${program.accentColor} hover:${program.accentColor.replace('600', '700')} text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md`}
                  >
                    Enroll Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Program Comparison */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Program Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4 text-gray-600 font-medium">Features</th>
                    {youthPrograms.map((program, i) => (
                      <th key={i} className="text-center pb-4 text-gray-900 font-medium">
                        {program.title}
                        {program.highlight && (
                          <span className="ml-2 text-yellow-500">
                            <FontAwesomeIcon icon={faStar} size="xs" />
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'Training frequency', values: ['3 sessions/week', '3-4 sessions/week', '3 sessions/week', 'Daily sessions'] },
                    { key: 'Age groups', values: ['8-18 years', '6-18 years', '8-18 years', '4+ years'] },
                    { key: 'Competitions', values: ['Monthly', 'Bi-weekly', 'Team comps', 'Quarterly'] },
                    { key: 'Equipment', values: ['Uniform', 'Shin guards', 'Basketball gear', 'Swim cap'] }
                  ].map(({ key, values }, ri) => (
                    <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-600">{key}</td>
                      {values.map((val, idx) => (
                        <td key={idx} className="text-center py-3 text-gray-700">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Become part of the Blue Phoenix family and elevate your game to the next level.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Today
            </motion.button>
          </motion.section>
        </motion.div>
      )}
    </div>
  );
};

export default ServicesPage;