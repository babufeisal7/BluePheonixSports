import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const cardClasses = 'bg-gray-200 p-6 rounded-lg shadow-md'; // Increase padding for better spacing on mobile
const textClasses = 'bg-gray-200 text-muted text-sm sm:text-base'; // Adjust text size for smaller screens
const linkClasses = 'text-primary hover:text-primary-foreground';
const iconClasses = 'w-5 h-5';

const TestimonialCard = ({ quote, author, twitterLink, linkedinLink, facebookLink, instagramLink, avatarUrl }) => {
  return (
    <div className={cardClasses}>
      <footer className="flex items-center mb-4">
        <img src={avatarUrl} alt={`${author}'s avatar`} className="w-12 h-12 rounded-full mr-3" />
        <cite className="font-semibold">{author}</cite>
      </footer>
      <blockquote className={`${textClasses} mb-4 text-center`}>{quote}</blockquote>
      <div className="flex justify-center space-x-4 mt-4">
        <a href={twitterLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faTwitter} className={iconClasses} />
        </a>
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faLinkedin} className={iconClasses} />
        </a>
        <a href={facebookLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faFacebook} className={iconClasses} />
        </a>
        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className={linkClasses}>
          <FontAwesomeIcon icon={faInstagram} className={iconClasses} />
        </a>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className=" max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Clients' Feedback on Our Work</h2>
      <p className="text-center text-muted-foreground mb-8">
        Explore the experiences of our clients with our work, showing our dedication to delivering exceptional results.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            quote: "An excellent product that combines quality and functionality. It has proven to be very effective and is well worth the investment.",
            author: "Arjun Desai",
            avatarUrl: "/public/coach1.jpg",
            twitterLink: "https://twitter.com/arjun_11",
            linkedinLink: "#",
            facebookLink: "#",
            instagramLink: "#"
          },
          {
            quote: "I’ve been using this product for a few months now, and it has made a significant difference. The design is sleek, and it functions flawlessly.",
            author: "Nisha Joshi",
            avatarUrl: "/public/coach1.jpg",
            twitterLink: "https://twitter.com/__nisha",
            linkedinLink: "#",
            facebookLink: "#",
            instagramLink: "#"
          },
          {
            quote: "I am thoroughly impressed with this product. It delivers exactly what it promises and has become an essential part of my life.",
            author: "Priya Patel",
            avatarUrl: "/public/coach1.jpg",
            twitterLink: "https://twitter.com/__nisha",
            linkedinLink: "#",
            facebookLink: "#",
            instagramLink: "#"
          },
          {
            quote: "Their innovative approach has transformed our operations and led to substantial improvements in our processes and overall efficiency.",
            author: "Jaswinder Singh",
            avatarUrl: "/public/coach1.jpg",
            twitterLink: "https://twitter.com/_jaswinder_5",
            linkedinLink: "#",
            facebookLink: "#",
            instagramLink: "#"
          }
        ].map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
