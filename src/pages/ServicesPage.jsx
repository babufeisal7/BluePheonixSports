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
  faStar,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const USD_TO_UGX = 3700;

const iconSize = 'h-[2.80rem] w-[2.80rem] text-blue-600';

const professionalServices = [
  {
    title: 'Schools Sports Management',
    description:
      'We design, implement, and manage school-wide sports programs that inspire and develop young athletes. Our team works with educators to craft tailored training calendars, recruit skilled coaches, and organize competitive inter-school events that align with academic goals.',
    icon: <FontAwesomeIcon icon={faSchool} className={iconSize} />,
    image: '/public/image1.jpg',
    price: 'Custom Quote',
    features: [
      'Custom term schedules',
      'Coach recruitment & training',
      'Inter-school competition setup',
      'PE curriculum support',
      'Student performance tracking'
    ]
  },
  {
    title: 'Sports Team Management',
    description:
      'We handle team operations from recruitment to matchday logistics. Our service includes strength and conditioning plans, scouting, injury prevention strategies, and advanced video analysis to improve team performance and cohesion.',
    icon: <FontAwesomeIcon icon={faUsers} className={iconSize} />,
    image: '/public/coach1.jpg',
    price: 'From 1,000,000 UGX/month',
    features: [
      'Team building & strategy sessions',
      'Player recruitment & development',
      'Fitness & injury management',
      'Match analysis reports',
      'Fixture planning & logistics'
    ]
  },
  {
    title: 'Sports Events Management',
    description:
      'Let us take the stress out of organizing your sports events. From concept to execution, we manage everything: venue sourcing, permits, branded materials, ticketing, security, and results tracking — ensuring a memorable experience.',
    icon: <FontAwesomeIcon icon={faCalendarAlt} className={iconSize} />,
    image: '/public/coach1.jpg',
    price: 'From 1,000,000 UGX/event',
    features: [
      'Venue booking & setup',
      'Live scoring & results',
      'Sponsorship & branding',
      'Ticketing & access control',
      'Post-event reporting'
    ]
  },
  {
    title: 'Merchandise Sales',
    description:
      'Boost team identity and generate revenue with high-quality branded merchandise. We offer design support and fulfillment for jerseys, tracksuits, caps, bags, and fan gear — all customizable and delivered on time.',
    icon: <FontAwesomeIcon icon={faShoppingBag} className={iconSize} />,
    image: '/public/coach1.jpg',
    price: 'From 50,000 UGX/item',
    features: [
      'Custom jersey printing',
      'Bulk order discounts',
      'On-demand delivery',
      'Fan store setup',
      'Merch design support'
    ]
  }
];

const youthPrograms = [
  {
    title: 'Rugby Program',
    ageRange: 'For ages 8 – 18 | Boys & Girls',
    icon: <FontAwesomeIcon icon={faRunning} className="text-4xl text-blue-600 mb-4" />,
    priceUSD: 100,
    features: [
      'Weekly training (3 sessions)',
      'Match fixtures and tournaments',
      'Nutrition & strength sessions',
      'Uniform included',
      'Player performance tracking',
      'Leadership & teamwork workshops'
    ],
    highlight: 'Most popular'
  },
  {
    title: 'Football Program',
    ageRange: 'For ages 6 – 18 | Boys & Girls',
    icon: <FontAwesomeIcon icon={faFutbol} className="text-4xl text-blue-600 mb-4" />,
    priceUSD: 100,
    features: [
      '3–4 weekly sessions',
      'Goalkeeper training',
      'Video match analysis',
      'College recruitment support',
      'Fitness & conditioning',
      'Tournament exposure'
    ]
  },

  {
    title: 'Basketball Program',
    ageRange: 'For ages 8 – 18 | Boys & Girls',
    icon: <FontAwesomeIcon icon={faUsers} className="text-4xl text-blue-600 mb-4" />,
    priceUSD: 100,
    features: [
      '3 sessions per week',
      'Skill-based drills & scrimmages',
      'Strength and agility training',
      'Team competitions & tournaments',
      'Basketball IQ & game strategy',
      'Progress assessments'
    ]
  },
  {
    title: 'Swimming Program',
    ageRange: 'For ages 4+ | Beginners to Advanced',
    icon: <FontAwesomeIcon icon={faSwimmer} className="text-4xl text-blue-600 mb-4" />,
    priceUSD: 100,
    features: [
      'Daily sessions available',
      'Olympic-sized pool access',
      'Stroke technique and dryland training',
      'Competitive swim meets',
      'Aquatic safety & breathing control',
      'Strength building routines'
    ],
    highlight: 'Limited spots'
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
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Our Services & Programs</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive sports management solutions and youth development programs to nurture talent at all levels.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Professional Services
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeTab === 'programs' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Youth Programs
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      {activeTab === 'services' && (
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {professionalServices.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${
                  expandedService === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="mr-6">{service.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-blue-800 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-700">{service.price}</span>
                        <button
                          onClick={() => toggleServiceExpand(index)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                          {expandedService === index ? 'Less details' : 'More details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedService === index && (
                  <div className="bg-blue-50 px-6 py-4 border-t border-gray-200">
                    <h4 className="font-bold text-blue-800 mb-3">Service Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                      Request Service
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Youth Programs Section */}
      {activeTab === 'programs' && (
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Youth Development Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our programs are designed to develop young athletes both on and off the field.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {youthPrograms.map((program, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition relative ${
                  program.highlight ? 'border-blue-500' : ''
                }`}
              >
                {program.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                    {program.highlight}
                  </div>
                )}
                {program.icon}
                <h2 className="text-2xl font-bold text-blue-800 mb-2">{program.title}</h2>
                <p className="text-gray-600 mb-6">{program.ageRange}</p>
                <p className="text-4xl font-extrabold text-blue-800 mb-2">
                  {(program.priceUSD * USD_TO_UGX).toLocaleString()} UGX
                </p>
                <p className="text-gray-500 mb-6 text-sm">≈ ${program.priceUSD}/month</p>
                <ul className="text-left space-y-3 mb-8">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>

          {/* Program Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Program Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-4">Features</th>
                    {youthPrograms.map((program, i) => (
                      <th key={i} className="text-center pb-4">{program.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'Training frequency', values: ['3 sessions/week', '3-4 sessions/week', 'Daily sessions', '3 sessions/week'] },
                    { key: 'Age groups', values: ['8-18 years', '6-18 years', '4+ years', '8-18 years'] },
                    { key: 'Competitions', values: ['Monthly tournaments', 'Bi-weekly matches', 'Quarterly meets', 'Team tournaments'] },
                    { key: 'Equipment provided', values: ['Uniform included', 'Shin guards', 'Swim cap', 'Basketball gear'] }
                  ].map(({ key, values }, ri) => (
                    <tr key={ri} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{key}</td>
                      {values.map((val, idx) => (
                        <td key={idx} className="text-center py-3">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
