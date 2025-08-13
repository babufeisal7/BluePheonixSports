import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faPeopleArrows, faUsers, faStar, faChevronRight, faPlay, faPause, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const sectionTitleClasses = "text-3xl sm:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400";
const sectionTextClasses = "text-base sm:text-lg mb-6 text-gray-700 leading-relaxed";
const tabButtonClasses = (isActive) => clsx(
  "px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
  isActive ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"
);

const AboutusPage = () => {
  const [activeTab, setActiveTab] = useState('vision');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const stats = [
    { value: "20+", label: "Professional Coaches" },
    { value: "10+", label: "Certified Youth Coaches" },
    { value: "10K+", label: "Training Hours Annually" }
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12 max-w-6xl"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl sm:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400"
      >
        About Us
      </motion.h1>

      {/* Introduction */}
      <motion.section
        variants={itemVariants}
        className="mb-16 pb-12 border-b border-gray-200"
      >
        <h2 className={sectionTitleClasses}>Introduction</h2>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          <div className="w-full lg:w-1/2 max-h-[320px] rounded-xl overflow-hidden shadow-2xl relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src="/BLUE PHEONIX.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Compact Controls */}
            <div className="absolute bottom-4 left-4 flex space-x-2 bg-black/30 p-1.5 rounded-lg">
              <button onClick={togglePlay} className="text-white text-lg p-1">
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              <button onClick={toggleMute} className="text-white text-lg p-1">
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-2 sm:px-6">
            <p className={sectionTextClasses}>
              Welcome to <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels. Founded in 2022, our mission is to foster athletic excellence and community engagement through a range of sports programs.
            </p>

            {/* Stats section */}
            <div className="mt-8 overflow-x-auto">
              <div className="inline-flex space-x-4 min-w-[320px]">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-4 rounded-xl shadow-md text-center border border-gray-100 min-w-[110px]"
                  >
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
                      {stat.value}
                    </span>
                    <p className="text-gray-600 mt-2 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tab Navigation */}
      <motion.div
        variants={itemVariants}
        className="flex space-x-4 overflow-x-auto no-scrollbar px-2 sm:px-0 justify-start sm:justify-center mb-12"
      >
        {['vision', 'mission', 'objectives'].map(tab => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={tabButtonClasses(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
            style={{ minWidth: 100 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants} className="mb-16">
        {activeTab === 'vision' && (
          <section className="mb-12">
            <h2 className={sectionTitleClasses}>Our Vision</h2>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <p className={sectionTextClasses}>
                Our vision at <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Blue Phoenix Rugby Club</span> is to be a leading force in sports, nurturing players from grassroots to professional levels while promoting integrity, teamwork, and sportsmanship.
              </p>
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-gray-500">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xl" />
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center text-gray-600 italic">
                  "To build champions in sport and character"
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'mission' && (
          <section className="mb-12">
            <h2 className={sectionTitleClasses}>Our Mission</h2>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <p className={sectionTextClasses}>
                Our mission is to empower athletes through structured and innovative sports programs, providing them with the skills and opportunities needed to succeed on and off the field.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "High-performance training programs",
                  "Personalized athlete development",
                  "Community outreach initiatives",
                  "Professional coaching staff"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start text-gray-700"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="mt-1 mr-3 text-cyan-500 text-sm" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'objectives' && (
          <section className="mb-12">
            <h2 className={sectionTitleClasses}>Our Objectives</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: faTrophy, title: 'Develop Talent', text: 'Create pathways for athletes to progress through youth, amateur, and professional levels.' },
                { icon: faPeopleArrows, title: 'Promote Inclusivity', text: 'Ensure that rugby is accessible to everyone, regardless of background or ability.' },
                { icon: faUsers, title: 'Community Engagement', text: 'Strengthen ties with local communities through outreach and partnerships.' },
                { icon: faStar, title: 'Success On and Off the Field', text: 'Help athletes grow both as individuals and team players.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-cyan-100 text-cyan-600 mr-4">
                      <FontAwesomeIcon icon={item.icon} className="text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </motion.div>

      {/* Call to Action */}
      <motion.section
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 text-center text-white"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">Become part of the Blue Phoenix family and elevate your game to the next level.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
        >
          Get Started Today
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default AboutusPage;
