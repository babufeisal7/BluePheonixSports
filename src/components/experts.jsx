import React from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Define CSS classes for reuse
const cardClasses = "bg-card p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105";
const textPrimaryClasses = "text-primary";
const textMutedClasses = "text-muted-foreground";
const linkClasses = "text-primary hover:text-primary/80 transition-colors";

// ExpertCard Component
const ExpertCard = ({ name, role, imgSrc, bio }) => (
    <div className={cardClasses}>
        <img className="w-full h-48 object-cover rounded-t-lg" src={imgSrc} alt={`${name} - ${role}`} />
        <h3 className={`text-xl font-semibold mt-3 ${textPrimaryClasses}`}>{name}</h3>
        <p className={textMutedClasses}>{role}</p>
        <p className="text-sm mt-2 text-muted-foreground">{bio}</p>
        <div className="flex space-x-3 mt-3">
            <a href="#" aria-label={`Follow ${name} on Facebook`} className={linkClasses}>
                <FaFacebookF />
            </a>
            <a href="#" aria-label={`Follow ${name} on Twitter`} className={linkClasses}>
                <FaTwitter />
            </a>
            <a href="#" aria-label={`Follow ${name} on LinkedIn`} className={linkClasses}>
                <FaLinkedinIn />
            </a>
        </div>
    </div>
);

// Experts Component
const Experts = () => {
    // Slider settings with autoplay
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 cards at once
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Duration each slide is shown
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className={`text-4xl font-bold text-center ${textPrimaryClasses} mb-4`}>Meet Our Experts</h2>
            <p className={`text-center ${textMutedClasses} mb-10`}>
                SportsMI Sports Academy has a rich history dating back to the XX century, evolving from a cricket academy to hosting soccer tournaments.
            </p>
            <Slider {...settings}>
                {/* CEO and Important Staff */}
                <ExpertCard 
                    name="Balya Dennis Abel" 
                    role="CEO" 
                    imgSrc="/coach1.jpg" // Local image
                    bio="Visionary leader and strategist."
                />
                <ExpertCard 
                    name="Muhindo Joshua Kazimoto" 
                    role="Sports Administrator" 
                    imgSrc="/coach2.jpg" // Local image
                    bio="Expert in sports management."
                />
                <ExpertCard 
                    name="Asea Louis James" 
                    role="Marketing and Communication" 
                    imgSrc="/coach1.jpg" // Local image
                    bio="Builds our brand and connects with the community."
                />
                <ExpertCard 
                    name="Okello Rodney" 
                    role="Finance Manager" 
                    imgSrc="/coach2.jpg" // Local image
                    bio="Manages our financial health."
                />
                <ExpertCard 
                    name="Luyima Andrew Kalali" 
                    role="Executive President" 
                    imgSrc="/coach1.jpg" // Local image
                    bio="Leads our strategic initiatives."
                />
                {/* Additional Experts */}
                <ExpertCard 
                    name="Mariah Tal" 
                    role="Head Coach" 
                    imgSrc="/coach2.jpg" // Local image
                    bio="Expert in youth development."
                />
                <ExpertCard 
                    name="Jerome Bell" 
                    role="Assistant Coach" 
                    imgSrc="/coach1.jpg" // Local image
                    bio="Tactical genius and player developer."
                />
                <ExpertCard 
                    name="Guy Hawkins" 
                    role="Fitness Trainer" 
                    imgSrc="/coach2.jpg" // Local image
                    bio="Enhances athlete performance."
                />
                <ExpertCard 
                    name="Savannah Nguyen" 
                    role="Nutritionist" 
                    imgSrc="/coach1.jpg" // Local image
                    bio="Specializes in sports nutrition."
                />
                <ExpertCard 
                    name="Liam Smith" 
                    role="Mental Coach" 
                    imgSrc="/coach2.jpg" // Local image
                    bio="Focuses on mental resilience."
                />
                <ExpertCard 
                    name="Olivia Johnson" 
                    role="Youth Coach" 
                    imgSrc="/coach1.jpg" // Local image
                    bio="Passionate about coaching youth."
                />
            </Slider>
        </div>
        
    );
};

export default Experts;
