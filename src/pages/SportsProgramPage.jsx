import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFootballBall, faFutbol, faBasketballBall, faSwimmer, faTrophy, faUserFriends, faMedal } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const programsData = [
    { name: "Junior Elite Program", sport: "rugby", icon: faFootballBall },
    { name: "Senior Elite Program", sport: "rugby", icon: faFootballBall },
    { name: "Professional Preparatory Program", sport: "rugby", icon: faFootballBall },
    { name: "Youth Development Program", sport: "rugby", icon: faFootballBall },
    { name: "Junior Elite Program", sport: "football", icon: faFutbol },
    { name: "Senior Elite Program", sport: "football", icon: faFutbol },
    { name: "Goalkeeper Academy", sport: "football", icon: faFutbol },
    { name: "Professional Preparatory Program", sport: "football", icon: faFutbol },
    { name: "Youth Development Program", sport: "football", icon: faFutbol },
    { name: "Junior Elite Program", sport: "basketball", icon: faBasketballBall },
    { name: "Senior Elite Program", sport: "basketball", icon: faBasketballBall },
    { name: "Professional Preparatory Program", sport: "basketball", icon: faBasketballBall },
    { name: "Youth Development Program", sport: "basketball", icon: faBasketballBall },
    { name: "Junior Elite Program", sport: "swimming", icon: faSwimmer },
    { name: "Senior Elite Program", sport: "swimming", icon: faSwimmer },
    { name: "Professional Preparatory Program", sport: "swimming", icon: faSwimmer },
    { name: "Youth Development Program", sport: "swimming", icon: faSwimmer },
];

// Reusable Card Component
const Card = ({ icon, title, description }) => {
    return (
        <div className="border border-blue-500 bg-card p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center">
            <div className="flex justify-center mb-2">
                <FontAwesomeIcon icon={icon} className="text-4xl text-primary" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-accent text-center">{title}</h3>
            <p className="text-muted-foreground text-center">{description}</p>
        </div>
    );
};

Card.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

// Update SelectedProgramsCard component to include icons
const SelectedProgramsCard = ({ selectedSport }) => {
    const filteredPrograms = programsData.filter(program => program.sport === selectedSport);

    return (
        <div className="bg-card p-6 mb-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4 text-accent">
                Programs for {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}
            </h3>
            <ul className="flex flex-col items-start pl-0 space-y-4">
                {filteredPrograms.map((program, index) => (
                    <li key={index} className="flex items-center justify-between w-full text-muted-foreground">
                        <span className="flex-1 text-left mr-4 flex items-center">
                            <FontAwesomeIcon icon={program.icon} className="mr-2" />
                            {program.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Key Components Section
const KeyComponents = ({ selectedSport }) => {
    return (
        <div className="p-6 bg-background text-foreground">
            <h2 className="text-3xl font-extrabold mb-4 text-primary text-center">KEY COMPONENTS</h2>
            <p className="mb-6 text-muted-foreground">
                Here are key components of our programs. Vivamus dictum nulla nisi, in auctor metus aliquet sed. Vestibulum euismod nibh non convallis venenatis. Morbi eu neque eget enim fermentum blandit. Aliquam ultricies viverra quam, vitae commodo neque
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card 
                    icon={faUserFriends}
                    title={`Introduction to ${selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}`}
                    description="Details about our coaching approach and philosophy."
                />
                <Card 
                    icon={faTrophy}
                    title="Age-Specific Training"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec."
                />
                <Card 
                    icon={faMedal}
                    title="Skill Development"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec."
                />
                <Card 
                    icon={faSwimmer}
                    title="Physical Conditioning"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec."
                />
                <Card 
                    icon={faBasketballBall}
                    title="Tactical Awareness"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec."
                />
                <Card 
                    icon={faFutbol}
                    title="Competition & Match"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec."
                />
            </div>
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ onSportSelect }) => {
    return (
        <div className="w-80  flex flex-col items-start"> 
            <h2 className="text-2xl font-bold mb-4 text-primary text-left">Sports Programs</h2>
            <ProgramListCard onSportSelect={onSportSelect} />
            <ProgramCard />
            <SocialLinksCard />
        </div>
    );
};

const ProgramListCard = ({ onSportSelect }) => {
    return (
        <div className="bg-card p-4 mb-6 rounded-lg shadow-lg text-left w-full">
            <h3 className="text-xl font-bold mb-4 text-accent">Our Programs</h3>
            <ul className="flex flex-col items-start pl-0 space-y-2">
                <li>
                    <button onClick={() => onSportSelect('rugby')} className="text-primary hover:underline flex items-center">
                        <FontAwesomeIcon icon={faFootballBall} className="mr-2 text-black" /> 
                        Rugby
                    </button>
                </li>
                <li>
                    <button onClick={() => onSportSelect('football')} className="text-primary hover:underline flex items-center">
                        <FontAwesomeIcon icon={faFutbol} className="mr-2 text-black" />
                        Football
                    </button>
                </li>
                <li>
                    <button onClick={() => onSportSelect('basketball')} className="text-primary hover:underline flex items-center">
                        <FontAwesomeIcon icon={faBasketballBall} className="mr-2 text-black" />
                        Basketball
                    </button>
                </li>
                <li>
                    <button onClick={() => onSportSelect('swimming')} className="text-primary hover:underline flex items-center">
                        <FontAwesomeIcon icon={faSwimmer} className="mr-2 text-black" />
                        Swimming
                    </button>
                </li>
            </ul>
        </div>
    );
};

// Program Card Component
const ProgramCard = () => {
    return (
        <div
            className="relative p-4 mb-6 rounded-lg shadow-lg text-center"
            style={{
                backgroundImage: "url('photo8.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

            <h3 className="relative text-2xl font-bold text-white drop-shadow-md">ELEVATE YOUR GAME WITH US</h3>
            <p className="relative text-white mb-4 drop-shadow-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
            
            {/* Improved Button */}
            <button className="relative bg-transparent text-white font-semibold text-lg  transition-all duration-300 ease-in-out shadow-lg rounded-full px-6 py-2 border border-white hover:border-blue-500">
                Contact Us Now!
            </button>
        </div>
    );
};
const SocialLinksCard = () => {
    return (
        <div className="bg-card text-black p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
                         <a href="#" className="text-muted-foreground">Facebook</a>
                <a href="#" className="text-muted-foreground">Twitter</a>
                <a href="#" className="text-muted-foreground">Instagram</a>
            </div>
        </div>
    );
};

// Main Component
const SportsProgramPage = () => {
    const [selectedSport, setSelectedSport] = useState('rugby');
    const handleSportSelect = (sport) => setSelectedSport(sport);

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar onSportSelect={handleSportSelect} />
            <div className="flex-1 p-6">
                <SelectedProgramsCard selectedSport={selectedSport} />
                <KeyComponents selectedSport={selectedSport} />
            </div>
        </div>
    );
};

export default SportsProgramPage;
