import React from 'react';
import PropTypes from 'prop-types';

const sponsorData = [
    { name: 'Stanbic Bank', logo: '/images/stanbic-bank.png' },
    { name: 'NxtRadio', logo: '/images/nxtradio.png' },
    { name: "King's Park", logo: '/images/kings-park.png' },
];

const Sponsors = () => {
    return (
        <div className="bg-gray-100 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                    Trusted by our valued sponsors
                </h2>
                <div className="mx-auto mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:max-w-xl sm:grid-cols-3 sm:gap-x-8 lg:max-w-7xl lg:grid-cols-5 lg:gap-x-10">
                    {sponsorData.map((sponsor) => (
                        <div key={sponsor.name} className="flex items-center justify-center">
                            <img
                                src={sponsor.logo}
                                alt={`${sponsor.name} Logo`}
                                className="max-h-12 w-full object-contain"
                                width={158}
                                height={48}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Sponsors.propTypes = {
    sponsors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired,
        })
    ),
};

export default Sponsors;