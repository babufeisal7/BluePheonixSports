import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Classes for styling
const containerClasses = 'bg-blue-800 p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg text-center'; // Padding adjustments for different devices
const headerClasses = 'text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white'; // Responsive font size
const programCardClasses = 'bg-blue-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg text-white text-left'; // Responsive padding and layout
const programTitleClasses = 'text-xl sm:text-2xl md:text-3xl font-semibold mb-2'; // Responsive font size
const buttonClasses = 'flex items-center bg-blue-600 text-white rounded-lg py-2 px-3 sm:py-2.5 sm:px-4 md:py-3 md:px-6 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300'; // Responsive button sizing
const imageClasses = 'w-48 h-32 object-cover rounded-lg mb-4 sm:mb-0'; // Universal image size
const contentClasses = 'mt-4 sm:mt-6 text-left space-y-4'; // Responsive text spacing

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
                    <div className="flex flex-col sm:flex-row items-center">
                        <img src="/photo71.jpg" alt="Rugby" className={imageClasses} />
                        <div className="flex-1">
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
                                    <p><strong>Overview:</strong> Our Rugby Program is dedicated to building well-rounded athletes with advanced skills and a deep understanding of the game. We emphasize teamwork, strategy, and physical conditioning to prepare players for competitive play.</p>
                                    <p><strong>Training Focus:</strong> Participants will work on technical skills, tactical awareness, and physical fitness. Our coaching staff uses proven methods to enhance player performance and team cohesion.</p>
                                    <p><strong>Coaching Staff:</strong> Led by experienced coaches with extensive backgrounds in rugby, our team is committed to providing top-notch training and guidance.</p>
                                    <p><strong>Schedule:</strong> Training sessions are held three times a week, with additional opportunities for competitive matches and tournaments throughout the season.</p>
                                    <p><strong>Benefits:</strong> Improve your rugby skills, build strong team bonds, and enjoy the excitement of competitive play.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Football Program */}
                <div id="football" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center">
                        <img src="/photo8.jpg" alt="Football" className={imageClasses} />
                        <div className="flex-1">
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
                                    <p><strong>Overview:</strong> The Football Program focuses on developing technical skills and game understanding. We offer a structured training environment to help players excel on and off the field.</p>
                                    <p><strong>Training Focus:</strong> Our training sessions cover all aspects of football, including dribbling, passing, shooting, and tactical play.</p>
                                    <p><strong>Coaching Staff:</strong> Our coaches bring a wealth of experience and expertise, providing personalized instruction to each player.</p>
                                    <p><strong>Schedule:</strong> Practices are held twice a week, with matches scheduled on weekends and special events during the season.</p>
                                    <p><strong>Benefits:</strong> Enhance your football skills, gain valuable game experience, and be part of a dynamic team.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basketball Program */}
                <div id="basketball" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center">
                        <img src="/photo9.jpg" alt="Basketball" className={imageClasses} />
                        <div className="flex-1">
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
                                    <p><strong>Overview:</strong> The Basketball Program is designed to develop players’ skills and strategies through intensive training and competitive play.</p>
                                    <p><strong>Training Focus:</strong> Focus areas include shooting accuracy, defensive techniques, and team play strategies.</p>
                                    <p><strong>Coaching Staff:</strong> Our basketball coaches have a proven track record and offer expert guidance to help players reach their potential.</p>
                                    <p><strong>Schedule:</strong> Training sessions are scheduled twice a week with opportunities for competitive games and tournaments.</p>
                                    <p><strong>Benefits:</strong> Improve your basketball skills, fitness, and teamwork through structured training and competitive experiences.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Swimming Program */}
                <div id="swimming" className={programCardClasses}>
                    <div className="flex flex-col sm:flex-row items-center">
                        <img src="/photo12.jpg" alt="Swimming" className={imageClasses} />
                        <div className="flex-1">
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
                                    <p><strong>Overview:</strong> Our Swimming Program is dedicated to improving swimming technique and performance through focused training.</p>
                                    <p><strong>Training Focus:</strong> Participants work on stroke technique, endurance, and speed through regular practice and expert coaching.</p>
                                    <p><strong>Coaching Staff:</strong> Experienced swim coaches provide personalized instruction and support to swimmers of all levels.</p>
                                    <p><strong>Schedule:</strong> Training is available four times a week, with additional opportunities for swim meets and competitive events.</p>
                                    <p><strong>Benefits:</strong> Achieve personal swimming goals, enhance fitness, and participate in competitive swimming.</p>
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
