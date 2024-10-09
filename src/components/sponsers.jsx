import React from 'react';
import PropTypes from 'prop-types';

// Updated sponsor data with paths from the public directory
const sponsorData = [
    { name: 'Stanbic Bank', logo: '/images/stanbic-bank.svg' },
    { name: 'NxtRadio', logo: '/images/nxtradio.svg' },
    { name: "King's Park", logo: '/images/kings-park.svg' },
];

const sponsorContainerClasses = 'mx-auto mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-xl sm:grid-cols-3 sm:gap-x-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-x-10';
const sponsorLogoClasses = 'max-h-12 w-full object-contain';

// Sponsor Component
const Sponsor = ({ logo, altText }) => (
    <img
        alt={altText}
        src={logo}
        className={sponsorLogoClasses}
        width={158}
        height={48}
    />
);

Sponsor.propTypes = {
    logo: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

// SponsorList Component
const SponsorList = () => (
    <div className="bg-gray-300 py-16 sm:py-20 lg:py-24 flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                Trusted by our valued sponsors
            </h2>
            <div className={sponsorContainerClasses}>
                {sponsorData.map((sponsor) => (
                    <Sponsor
                        key={sponsor.name} // Use sponsor name as a unique key
                        logo={sponsor.logo}
                        altText={`${sponsor.name} Logo`}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default SponsorList;
