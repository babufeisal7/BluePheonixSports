import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faHome, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';

const cardClass = 'bg-card p-6 rounded-lg shadow-md';
const containerClass = 'grid grid-cols-1 md:grid-cols-2 gap-6';
const sectionClassWithBorder = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 relative flex flex-col items-center justify-between border border-blue-500 h-full'; // Ensure full height
const sectionClassWithoutBorder = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 relative flex flex-col items-center justify-between h-full'; // Ensure full height
const textClass = 'text-muted-foreground text-sm md:text-base'; // Responsive text size
const titleClass = 'text-primary text-lg md:text-xl'; // Responsive title size

const WhyUs = () => {
  return (
    <div className={cardClass}>
      <div className={containerClass}>
        <div className="flex items-center">
          <img src="photo5.jpg" alt="Why Join Us Image" className="rounded-lg shadow-md h-40 w-auto object-cover" />
        </div>

        <div>
          <h2 className={`text-2xl md:text-3xl font-bold ${titleClass} mb-4`}>Why Choose Us</h2>
          <p className={`${textClass} mb-6`}>Experience Growth, Community, and Excellence with Us</p>
          <p className={`${textClass} mb-8`}>Join a community that fosters growth and excellence in sports. Our commitment is to develop not just players, but well-rounded individuals.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardItem number="50+" description="Active Members" sectionClass={sectionClassWithoutBorder} />
            <CardItem number="300+" description="Successful Events" sectionClass={sectionClassWithoutBorder} />
            <CardItem number="100+" description="Team Championships" sectionClass={sectionClassWithoutBorder} />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardItem 
                icon={<FontAwesomeIcon icon={faChalkboardTeacher} className="text-primary mb-1 w-6 h-8" />} // Reduced margin-bottom
                title="Professional Coaching" 
                description="Learn from experienced coaches dedicated to your success." 
                sectionClass={sectionClassWithBorder}
            />
            <CardItem 
                icon={<FontAwesomeIcon icon={faHome} className="text-primary mb-1 w-6 h-8" />} // Reduced margin-bottom
                title="Modern Training Facilities" 
                description="Utilize state-of-the-art facilities for optimal training." 
                sectionClass={sectionClassWithBorder}
            />
            <CardItem 
                icon={<FontAwesomeIcon icon={faPeopleCarry} className="text-primary mb-1 w-6 h-8" />} // Reduced margin-bottom
                title="Community Support" 
                description="Be a part of a supportive community that celebrates your achievements." 
                sectionClass={sectionClassWithBorder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardItem = ({ number, icon, title, description, sectionClass }) => {
  return (
    <div className={sectionClass}>
      {icon && <div className="flex justify-center">{icon}</div>}
      <div className="ml-2 text-center"> {/* Center text */}
        {number && <h3 className={`text-xl font-semibold ${titleClass} mb-1`}>{number}</h3>} {/* Add margin below number */}
        {title && <h4 className="font-semibold mb-1">{title}</h4>} {/* Add margin below title */}
        <p className={`${textClass} text-center overflow-hidden whitespace-normal`}>{description}</p> {/* Handle overflow */}
      </div>
    </div>
  );
};

export default WhyUs;
