import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faBasketballBall, faSwimmer, faTrophy, faUserFriends, faMedal } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const programsData = [
    { name: "Junior Elite Program", sport: "rugby", image: "photo8.jpg" },
    { name: "Senior Elite Program", sport: "rugby" },
    { name: "Professional Preparatory Program", sport: "rugby" },
    { name: "Youth Development Program", sport: "rugby" },
    { name: "Junior Elite Program", sport: "football", image: "football1.jpg" },
    { name: "Senior Elite Program", sport: "football" },
    { name: "Goalkeeper Academy", sport: "football" },
    { name: "Professional Preparatory Program", sport: "football" },
    { name: "Youth Development Program", sport: "football" },
    { name: "Junior Elite Program", sport: "basketball", image: "basketball1.jpg" },
    { name: "Senior Elite Program", sport: "basketball" },
    { name: "Professional Preparatory Program", sport: "basketball" },
    { name: "Youth Development Program", sport: "basketball" },
    { name: "Junior Elite Program", sport: "swimming", image: "swimming1.jpg" },
    { name: "Senior Elite Program", sport: "swimming" },
    { name: "Professional Preparatory Program", sport: "swimming" },
    { name: "Youth Development Program", sport: "swimming" }
];

// Reusable Card Component
const Card = ({ icon, title, description }) => {
    return (
        <div className="bg-card p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center">
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
                        <span className="flex-1 text-left mr-4">
                            {program.name}
                        </span>
                        {program.image && (
                            <img 
                                src={program.image} 
                                alt={program.name} 
                                className="w-16 h-16 rounded ml-4" // Adjust the size as needed
                            />
                        )}
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
                {/* Additional Cards */}
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
        <div className="w-80 bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-primary text-center">Sports Programs</h2>
            <ProgramListCard onSportSelect={onSportSelect} />
            <ProgramCard />
            <SocialLinksCard />
        </div>
    );
};

// Program List Card Component
const ProgramListCard = ({ onSportSelect }) => {
    return (
        <div className="bg-card p-4 mb-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4 text-accent">Our Programs</h3>
            <ul className="flex flex-col items-start pl-0 space-y-2">
                <li>
                    <button onClick={() => onSportSelect('rugby')} className="text-primary hover:underline">Rugby</button>
                </li>
                <li>
                    <button onClick={() => onSportSelect('football')} className="text-primary hover:underline">Football</button>
                </li>
                <li>
                    <button onClick={() => onSportSelect('basketball')} className="text-primary hover:underline">Basketball</button>
                </li>
                <li>
                    <button onClick={() => onSportSelect('swimming')} className="text-primary hover:underline">Swimming</button>
                </li>
            </ul>
        </div>
    );
};

// Program Card Component
const ProgramCard = () => {
    return (
        <div className="bg-card p-4 mb-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-primary">ELEVATE YOUR GAME WITH US</h3>
            <p className="text-muted-foreground mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.</p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg">Contact Us Now!</button>
        </div>
    );
};

// Social Links Card Component
const SocialLinksCard = () => {
    return (
        <div className="bg-card p-4 rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex justify-center space-x-4">
                <a href="#" className="text-muted-foreground">Facebook</a>
                <a href="#" className="text-muted-foreground">Twitter</a>
                <a href="#" className="text-muted-foreground">Instagram</a>
            </div>
        </div>
    );
};

// SportsProgramPage Component with Sidebar
const SportsProgramPage = () => {
    const [selectedSport, setSelectedSport] = useState('rugby'); // Default selected sport

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-6"> {/* Main Content Area */}
                <SelectedProgramsCard selectedSport={selectedSport} />
                <KeyComponents selectedSport={selectedSport} />
            </div>
            <Sidebar onSportSelect={setSelectedSport} />
        </div>
    );
};

export default SportsProgramPage;
