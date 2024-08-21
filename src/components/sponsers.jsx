import React from 'react';

// Updated sponsor data with paths from the public directory
const sponsorData = [
    { name: 'Stanbic Bank', logo: '/images/stanbic-bank.svg' },
    { name: 'NxtRadio', logo: '/images/nxtradio.svg' },
    { name: "King's Park", logo: '/images/kings-park.svg' },
    { name: 'Stanbic Bank', logo: '/images/stanbic-bank.svg' },
    { name: 'NxtRadio', logo: '/images/nxtradio.svg' },
];

const sponsorContainerClasses = 'mx-auto mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-xl sm:grid-cols-3 sm:gap-x-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-x-10';
const sponsorLogoClasses = 'max-h-12 w-full object-contain';

const Sponsor = ({ logo, altText }) => (
    <img
        alt={altText}
        src={logo}
        className={sponsorLogoClasses}
        width={158}
        height={48}
    />
);

const SponsorList = () => (
    <div className="bg-gray-300 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                Trusted by our valued sponsors
            </h2>
            <div className={sponsorContainerClasses}>
                {sponsorData.map((sponsor, index) => (
                    <Sponsor
                        key={index}
                        logo={sponsor.logo}
                        altText={`${sponsor.name} Logo`}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default SponsorList;
