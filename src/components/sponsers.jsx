import React from 'react';
import PropTypes from 'prop-types';

const Sponsors = () => {
  const sponsors = [
    { name: 'Stanbic Bank', logo: '/logo.jpg' },
    { name: 'NxtRadio', logo: '/logo.jpg' },
    { name: "King's Park", logo: '/logo.jpg' },
    // Add more sponsors as needed
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Our Valued Sponsors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            We're proud to partner with these industry leaders
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {sponsors.map((sponsor) => (
            <div 
              key={sponsor.name}
              className="flex flex-col items-center justify-center w-full max-w-xs p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center h-24 w-full">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} Logo`}
                  className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  width={158}
                  height={48}
                  loading="lazy"
                />
              </div>
              <span className="mt-3 text-sm font-medium text-gray-500">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
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