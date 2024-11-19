import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faPeopleArrows, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

// Define reusable styles
const sectionTitleClasses = "text-3xl md:text-4xl font-bold mb-6 text-center text-primary";
const sectionTextClasses = "text-lg md:text-xl mb-6";
const listClasses = "list-disc pl-6 text-lg space-y-2";
const highlightTextClasses = "font-semibold text-primary";
const videoContainerClasses = "w-full md:w-3/5 h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden";
const videoClasses = "w-full h-full object-cover";

// Tab button styles
const tabButtonClasses = (isActive) => clsx(
  "px-4 py-2 text-lg font-semibold rounded-md",
  isActive ? "bg-primary text-white" : "text-primary hover:bg-gray-100"
);

const AboutusPage = () => {
    const [activeTab, setActiveTab] = useState('vision');

    return (
        <div className="container mx-auto p-4 max-w-screen-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-primary">About Us</h1>

            {/* Introduction */}
            <section className="mb-12 border-b pb-8">
                <h2 className={sectionTitleClasses}>Introduction</h2>
                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <div className={videoContainerClasses}>
                        <video className={videoClasses} autoPlay loop muted={false} controls preload="auto">
                            <source src="/BLUE PHEONIX.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="mt-6 md:mt-0 w-full md:w-3/4 lg:w-2/3">
                        <p className={sectionTextClasses}>
                            Welcome to <span className={highlightTextClasses}>Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels. Founded in 2022, our mission is to foster athletic excellence and community engagement through a range of sports programs.
                        </p>

                        {/* Stats section with consistent layout */}
                        <div className="grid grid-cols-3 gap-6">
                            {["20+", "10+", "10K+"].map((value, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">{value}</span>
                                    <span className="text-muted-foreground text-center">{['Professional Coaches', 'Certified Youth Coaches', 'Training Hours Annually'][index]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
                {['vision', 'mission', 'objectives'].map(tab => (
                    <button key={tab} className={tabButtonClasses(activeTab === tab)} onClick={() => setActiveTab(tab)}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mb-12">
                {activeTab === 'vision' && (
                    <section className="mb-12">
                        <h2 className={sectionTitleClasses}>Vision</h2>
                        <p className={sectionTextClasses}>
                            Our vision at <span className={highlightTextClasses}>Blue Phoenix Rugby Club</span> is to be a leading force in sports, nurturing players from grassroots to professional levels while promoting integrity, teamwork, and sportsmanship.
                        </p>
                    </section>
                )}

                {activeTab === 'mission' && (
                    <section className="mb-12">
                        <h2 className={sectionTitleClasses}>Mission</h2>
                        <p className={sectionTextClasses}>
                            Our mission is to empower athletes through structured and innovative sports programs, providing them with the skills and opportunities needed to succeed on and off the field.
                        </p>
                    </section>
                )}

                {activeTab === 'objectives' && (
                    <section className="mb-12">
                        <h2 className={sectionTitleClasses}>Objectives</h2>
                        <ul className={listClasses}>
                            {[
                                { icon: faTrophy, title: 'Develop Talent', text: 'Create pathways for athletes to progress through youth, amateur, and professional levels.' },
                                { icon: faPeopleArrows, title: 'Promote Inclusivity', text: 'Ensure that rugby is accessible to everyone, regardless of background or ability.' },
                                { icon: faUsers, title: 'Community Engagement', text: 'Strengthen ties with local communities through outreach and partnerships.' },
                                { icon: faStar, title: 'Success On and Off the Field', text: 'Help athletes grow both as individuals and team players.' },
                            ].map((item, index) => (
                                <li key={index}>
                                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                    <span className={highlightTextClasses}>{item.title}:</span> {item.text}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AboutusPage;
