import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Classes for styling
const containerClasses = 'bg-blue-800 p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg text-center';
const headerClasses = 'text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white';
const programCardClasses = 'bg-blue-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg text-white text-left'; 
const programTitleClasses = 'text-xl sm:text-2xl md:text-3xl font-semibold mb-2';
const buttonClasses = 'flex items-center bg-blue-600 text-white rounded-lg py-2 px-3 sm:py-2.5 sm:px-4 md:py-3 md:px-6 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300';
const imageClasses = 'w-full h-32 object-cover rounded-lg mb-4 sm:w-48 sm:h-32';
const contentClasses = 'mt-4 sm:mt-6 text-left space-y-4 mb-6';

// New small, gradient, glowing button
const pageLinkClasses = `
  mt-4
  inline-block
  text-white
  font-semibold
  px-4
  py-2
  rounded-lg
  bg-gradient-to-r from-purple-500 to-purple-600
  shadow-md
  hover:shadow-lg
  transform
  transition
  duration-300
  hover:scale-105
  hover:from-purple-600 hover:to-purple-700
  focus:outline-none
  focus:ring-2
  focus:ring-purple-400
  focus:ring-opacity-50
`;

const SportsPrograms = () => {
    const [activeProgram, setActiveProgram] = useState(null);

    const toggleDropdown = (program) => {
        setActiveProgram(activeProgram === program ? null : program);
    };

    return (
        <div className={containerClasses}>
            <h1 className={headerClasses}>Sports Programs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rugby Program */}
                <div id="rugby" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center space-x-4">
                        <img src="/photo71.jpg" alt="Rugby" className={imageClasses} />
                        <div className="flex-1 mt-4 sm:mt-0">
                            <h2 className={programTitleClasses}>Rugby Program</h2>
                            <button
                                onClick={() => toggleDropdown('rugby')}
                                className={buttonClasses}
                            >
                                {activeProgram === 'rugby' ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                                Learn More
                            </button>
                            {activeProgram === 'rugby' && (
                                <div className={contentClasses}>
                                    <p><strong>Overview:</strong> Our Rugby Program builds well-rounded athletes with advanced skills and deep game understanding. Teamwork, strategy, and physical conditioning are emphasized.</p>
                                    <p><strong>Training Focus:</strong> Technical skills, tactical awareness, and physical fitness are covered in our training sessions.</p>
                                    <p><strong>Coaching Staff:</strong> Experienced coaches provide top-notch guidance.</p>
                                    <p><strong>Schedule:</strong> Three training sessions per week plus competitive matches and tournaments.</p>
                                    <p><strong>Benefits:</strong> Enhance skills, teamwork, and enjoy competitive play.</p>
                                    <Link to="/rugby-program" className={pageLinkClasses}>Go to Rugby Program</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Football Program */}
                <div id="football" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center space-x-4">
                        <img src="/football1.jpg" alt="Football" className={imageClasses} />
                        <div className="flex-1 mt-4 sm:mt-0">
                            <h2 className={programTitleClasses}>Football Program</h2>
                            <button
                                onClick={() => toggleDropdown('football')}
                                className={buttonClasses}
                            >
                                {activeProgram === 'football' ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                                Learn More
                            </button>
                            {activeProgram === 'football' && (
                                <div className={contentClasses}>
                                    <p><strong>Overview:</strong> The Football Program develops technical skills and game understanding in a structured environment.</p>
                                    <p><strong>Training Focus:</strong> Dribbling, passing, shooting, and tactical play.</p>
                                    <p><strong>Coaching Staff:</strong> Experienced coaches provide personalized instruction.</p>
                                    <p><strong>Schedule:</strong> Practices twice a week, matches on weekends.</p>
                                    <p><strong>Benefits:</strong> Improve skills, gain experience, join a dynamic team.</p>
                                    <Link to="/football-program" className={pageLinkClasses}>Go to Football Program Page</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basketball Program */}
                <div id="basketball" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center space-x-4">
                        <img src="/basketball6.jpg" alt="Basketball" className={imageClasses} />
                        <div className="flex-1 mt-4 sm:mt-0">
                            <h2 className={programTitleClasses}>Basketball Program</h2>
                            <button
                                onClick={() => toggleDropdown('basketball')}
                                className={buttonClasses}
                            >
                                {activeProgram === 'basketball' ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                                Learn More
                            </button>
                            {activeProgram === 'basketball' && (
                                <div className={contentClasses}>
                                    <p><strong>Overview:</strong> The Basketball Program develops skills and strategies through training and competitive play.</p>
                                    <p><strong>Training Focus:</strong> Shooting, defense, and team strategies.</p>
                                    <p><strong>Coaching Staff:</strong> Expert coaches with proven track record.</p>
                                    <p><strong>Schedule:</strong> Two sessions per week plus competitive games.</p>
                                    <p><strong>Benefits:</strong> Improve skills, fitness, and teamwork.</p>
                                    <Link to="/basketball-program" className={pageLinkClasses}>Go to Basketball Program Page</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Swimming Program */}
                <div id="swimming" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center space-x-4">
                        <img src="/swimming1.jpg" alt="Swimming" className={imageClasses} />
                        <div className="flex-1 mt-4 sm:mt-0">
                            <h2 className={programTitleClasses}>Swimming Program</h2>
                            <button
                                onClick={() => toggleDropdown('swimming')}
                                className={buttonClasses}
                            >
                                {activeProgram === 'swimming' ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                                Learn More
                            </button>
                            {activeProgram === 'swimming' && (
                                <div className={contentClasses}>
                                    <p><strong>Overview:</strong> Focused on improving swimming technique and performance through training.</p>
                                    <p><strong>Training Focus:</strong> Stroke technique, endurance, and speed.</p>
                                    <p><strong>Coaching Staff:</strong> Experienced coaches provide personalized support.</p>
                                    <p><strong>Schedule:</strong> Four sessions per week plus competitive events.</p>
                                    <p><strong>Benefits:</strong> Improve swimming skills, fitness, and compete at high level.</p>
                                    <Link to="/swimming-program" className={pageLinkClasses}>Go to Swimming Program Page</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SportsPrograms;
