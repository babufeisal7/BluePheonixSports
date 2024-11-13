import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faPeopleArrows, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';



// Define reusable styles
const sectionTitleClasses = "text-3xl md:text-4xl font-bold mb-6 text-center text-primary";
const sectionTextClasses = "text-lg md:text-xl mb-6 ";
const listClasses = "list-disc pl-6 text-lg space-y-2";
const highlightTextClasses = "font-semibold text-primary";
const imgContainerClasses = "w-full md:w-3/5 h-full md:h-80 bg-gray-200 rounded-lg overflow-hidden"; // Increased width
const imgClasses = "w-full h-full object-cover";

const tabButtonClasses = (isActive) =>
    `py-2 px-4 md:px-6 text-lg font-semibold rounded-t-lg transition-all duration-300 ease-in-out ${isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white hover:shadow-lg'}`;

const cardClasses = "bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105";
const textPrimaryClasses = "text-primary";
const textMutedClasses = "text-gray-500";
const linkClasses = "text-blue-600 hover:text-blue-800 transition-colors";

const ExpertCard = ({ name, role, imgSrc }) => (
    <div className={cardClasses}>
        <img className="w-full h-48 object-cover rounded-t-lg" src={imgSrc} alt={name} />
        <h3 className={`text-2xl font-semibold mt-4 ${textPrimaryClasses}`}>{name}</h3>
        <p className={`text-lg ${textMutedClasses} mt-2`}>{role}</p>
        <div className="flex space-x-4 mt-4">
            <a href="#" className={linkClasses}>Facebook</a>
            <a href="#" className={linkClasses}>Twitter</a>
            <a href="#" className={linkClasses}>LinkedIn</a>
        </div>
    </div>
);

const Experts = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className={`text-4xl font-bold text-center ${textPrimaryClasses} mb-6`}>Meet Our Experts</h2>
            <p className={`text-center ${textMutedClasses} mb-8`}>Blue Phoenix Rugby Club is backed by an experienced team dedicated to nurturing the next generation of athletes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <ExpertCard name="Mariah Tal" role="Head Coach" imgSrc="https://placehold.co/300x200" />
                <ExpertCard name="Jerome Bell" role="Fitness Trainer" imgSrc="https://placehold.co/300x200" />
                <ExpertCard name="Guy Hawkins" role="Physiotherapist" imgSrc="https://placehold.co/300x200" />
                <ExpertCard name="Savannah Nguyen" role="Nutritionist" imgSrc="https://placehold.co/300x200" />
            </div>
        </div>
    );
};

const AboutusPage = () => {
    const [activeTab, setActiveTab] = useState('vision');

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-primary">About Us</h1>

            {/* Introduction */}
            <section className="mb-12 border-b pb-8">
                <h2 className={sectionTitleClasses}>Introduction</h2>
                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <div className={imgContainerClasses}>
                        <img src="/photo13.jpg" alt="Introduction to Blue Phoenix Sports Limited" className={imgClasses} />
                    </div>
                    <div className="mt-6 md:mt-0 w-full md:w-3/4 lg:w-2/3">
    <p className={sectionTextClasses}>
        Welcome to <span className={highlightTextClasses}>Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels.  At Blue Phoenix Sports Limited, our mission is to foster athletic excellence and community engagement through a diverse range of sports programs. Founded in 2022, we are dedicated to nurturing talent, promoting teamwork, and supporting local sports initiatives.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">20+</span>
            <span className="text-muted-foreground">Professional Coaches</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">10+</span>
            <span className="text-muted-foreground">Certified Youth Coaches</span>
        </div>
        <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">10K+</span>
            <span className="text-muted-foreground">Training Hours Annually</span>
        </div>
    </div>
</div>
        </div>
            </section>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
                <button className={tabButtonClasses(activeTab === 'vision')} onClick={() => setActiveTab('vision')}>
                    Vision
                </button>
                <button className={tabButtonClasses(activeTab === 'mission')} onClick={() => setActiveTab('mission')}>
                    Mission
                </button>
                <button className={tabButtonClasses(activeTab === 'objectives')} onClick={() => setActiveTab('objectives')}>
                    Objectives
                </button>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
                {activeTab === 'vision' && (
                    <section className="mb-12">
                        <h2 className={sectionTitleClasses}>Vision</h2>
                        <p className={sectionTextClasses}>
                            Our vision at <span className={highlightTextClasses}>Blue Phoenix Rugby Club</span> is to become a leading force in sports, nurturing players from grassroots to professional levels while promoting integrity, teamwork, and sportsmanship. Our vision is to be a leading sports academy that empowers athletes to reach their full potential while making a positive impact in their communities. We collaborate with schools and organizations to provide top-notch training and development opportunities.
                        </p>
                    </section>
                )}

                {activeTab === 'mission' && (
                    <section className="mb-12">
                        <h2 className={sectionTitleClasses}>Mission</h2>
                        <p className={sectionTextClasses}>
                            At Blue Phoenix Sports Limited, our mission is to foster athletic excellence and community engagement through a diverse range of sports programs. Founded in 2022, we are dedicated to nurturing talent, promoting teamwork, and supporting local sports initiatives.
                        </p>
                        <p className={sectionTextClasses}>
                            Our mission is to empower athletes through structured and innovative rugby programs, providing them with the skills and opportunities needed to succeed both on and off the field. We aim to cultivate a winning mentality while maintaining the values of respect and hard work.
                        </p>
                    </section>
                )}

                {activeTab === 'objectives' && (
         <section className="mb-12">
    <h2 className={sectionTitleClasses}>Objectives</h2>
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }} className={listClasses}>
        <li>
            <FontAwesomeIcon icon={faTrophy} className="mr-2" />
            <span className={highlightTextClasses}>Develop Talent:</span> Create pathways for athletes to progress through youth, amateur, and professional levels.
        </li>
        <li>
            <FontAwesomeIcon icon={faPeopleArrows} className="mr-2" />
            <span className={highlightTextClasses}>Promote Inclusivity:</span> Ensure that rugby is accessible to everyone, regardless of background or ability.
        </li>
        <li>
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            <span className={highlightTextClasses}>Community Engagement:</span> Strengthen ties with local communities through outreach and partnerships.
        </li>
        <li>
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <span className={highlightTextClasses}>Success On and Off the Field:</span> Help athletes grow both as individuals and as team players, preparing them for life beyond sports.
        </li>
    </ul>
</section>

                )}
            </div>

        </div>
    );
};

export default AboutusPage;
