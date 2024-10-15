import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faUsers, faCalendarAlt, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

// Custom class for increased icon size
const iconSize = 'h-[2.80rem] w-[2.80rem]'; // Increased size

const services = [
    {
        title: 'Schools Sports Management',
        description: 'Expert management and coordination of school sports programs, including scheduling, coaching, and event planning.',
        icon: <FontAwesomeIcon icon={faSchool} className={`${iconSize} text-black`} /> // Changed to text-black
    },
    {
        title: 'Sports Team Management',
        description: 'Comprehensive management of sports teams, from recruitment and training to game strategies and performance analysis.',
        icon: <FontAwesomeIcon icon={faUsers} className={`${iconSize} text-black`} /> // Changed to text-black
    },
    {
        title: 'Sports Events Management',
        description: 'Full-service event management for sports events, including logistics, promotion, and execution to ensure successful events.',
        icon: <FontAwesomeIcon icon={faCalendarAlt} className={`${iconSize} text-black`} /> // Changed to text-black
    },
    {
        title: 'Merchandise Sales',
        description: 'A wide range of merchandise available for fans and players, including apparel, equipment, and accessories.',
        icon: <FontAwesomeIcon icon={faShoppingBag} className={`${iconSize} text-black`} /> // Changed to text-black
    },
];

const ServiceCard = ({ title, description, icon }) => (
    <div className="relative bg-white p-6 rounded-lg shadow-lg text-black text-sm sm:text-base text-muted-foreground mb-4 fade-in border border-blue-500">
        <div className="absolute top-12 left-4">
            {icon}
        </div>
        <div className="ml-16 pt-6">
            {/* Change text size for title */}
            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-4">{title}</h3>
            {/* Change text size for description */}
            <p className="text-sm sm:text-base">{description}</p>
        </div>
    </div>
);

ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};

const Services = () => (
    <div id="services" className="relative py-12">
        {/* Background Image for the Services section */}
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(/image2.jpg)`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                zIndex: '-1',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center mb-8">
            <h2 className="text-white text-3xl font-bold">Our Services</h2>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            {services.map((service, index) => (
                <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                />
            ))}
        </div>
    </div>
);

export default Services;
