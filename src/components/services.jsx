import PropTypes from 'prop-types';
import { AcademicCapIcon, UsersIcon, CalendarIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

// Custom class for increased icon size
const iconSize = 'h-[2.80rem] w-[2.80rem]'; // Increased size

const services = [
    {
        title: 'Schools Sports Management',
        description: 'Expert management and coordination of school sports programs, including scheduling, coaching, and event planning.',
        icon: <AcademicCapIcon className={`${iconSize} text-blue-500`} />
    },
    {
        title: 'Sports Team Management',
        description: 'Comprehensive management of sports teams, from recruitment and training to game strategies and performance analysis.',
        icon: <UsersIcon className={`${iconSize} text-blue-500`} />
    },
    {
        title: 'Sports Events Management',
        description: 'Full-service event management for sports events, including logistics, promotion, and execution to ensure successful events.',
        icon: <CalendarIcon className={`${iconSize} text-blue-500`} />
    },
    {
        title: 'Merchandise Sales',
        description: 'A wide range of merchandise available for fans and players, including apparel, equipment, and accessories.',
        icon: <ShoppingBagIcon className={`${iconSize} text-blue-500`} />
    },
];

const ServiceCard = ({ title, description, icon }) => (
    <div className="relative bg-white p-6 rounded-lg shadow-lg text-black text-base sm:text-lg text-muted-foreground mb-4 fade-in">
        <div className="absolute top-12 left-4">
            {icon}
        </div>
        <div className="ml-16 pt-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">{title}</h3>
            <p>{description}</p>
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
