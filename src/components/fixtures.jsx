import React from 'react';
import PropTypes from 'prop-types';

const matchData = [
    {
        league: 'UGANDA RUGBY LEAGUE',
        time: '2:00PM',
        date: 'TUE 06 SEP 2024, BUZIGA ISLAMIC INSTITUTE',
    },
    {
        league: 'UGANDA RUGBY LEAGUE',
        time: '2:00PM',
        date: 'SUN 11 SEP 2024, KYADONDO RUGBY GROUNDS',
    },
    {
        league: 'UGANDA RUGBY LEAGUE',
        time: '2:00PM',
        date: 'THU 15 SEP 2024, LEGENDS PARK',
    },
];

const cardClasses = 'bg-blue-700 p-4 rounded-lg shadow-lg border border-white mx-2 card-slide-up'; // Added animation class
const buttonClasses = 'mt-4 block w-full bg-white text-black font-bold py-2 px-4 rounded text-center hover:bg-gray-200';
const logoClasses = 'w-20 h-20';
const timeBoxClasses = 'border-2 border-opacity-50 border-white px-2 py-1 rounded-lg text-white';

const extraSpacingLeft = 'pl-8';
const extraSpacingRight = 'pr-4';

const MatchCard = ({ league, time, date, className, index }) => {
    return (
        <div
            className={`${cardClasses} ${className}`}
            style={{ animation: `slideUp 0.5s ease-out ${index * 0.1}s` }} // Apply animation with delay
        >
            <div className="text-center mb-2">
                <span className="font-semibold text-white text-xl">{league}</span>
            </div>
            <div className="relative flex items-center justify-center mb-2">
                <img src="/logo1.png" alt="Team Logo Left" className={logoClasses} />
                <div className={`${timeBoxClasses}`}>
                    <div className="text-lg text-center mx-4">
                        {time}
                    </div>
                </div>
                <img src="/logo2.png" alt="Team Logo Right" className={logoClasses} />
            </div>
            <div className="text-sm text-white text-center mb-2">{date}</div>
            <a href="#" className={buttonClasses}>
                TICKET INFO &rarr;
            </a>
        </div>
    );
};

MatchCard.propTypes = {
    league: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
};

const MatchList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            {matchData.map((match, index) => (
                <MatchCard
                    key={index}
                    league={match.league}
                    time={match.time}
                    date={match.date}
                    className={index === 0 ? extraSpacingLeft : index === 2 ? extraSpacingRight : ''}
                    index={index}
                />
            ))}
        </div>
    );
};

const MatchSection = () => {
    return (
        <div className="bg-blue-700 py-20">
            <div className="flex justify-center mb-4">
                <a href="#" className="inline-block bg-white text-black font-bold py-2 px-4 rounded-lg backdrop-blur-lg bg-opacity-20">
                    Fixtures
                </a>
            </div>
            <h2 className="text-white text-4xl font-bold text-center mb-8">OUR NEXT MATCH</h2>
            <MatchList />
        </div>
    );
};

export default MatchSection;
