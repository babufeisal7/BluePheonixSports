import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const TestimonialCard = ({ quote, author, twitterLink, linkedinLink, facebookLink, instagramLink, avatarUrl }) => {
  const socialLinks = [
    { link: twitterLink, icon: faTwitter },
    { link: linkedinLink, icon: faLinkedin },
    { link: facebookLink, icon: faFacebook },
    { link: instagramLink, icon: faInstagram },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex flex-col text-left space-y-4">
      <footer className="flex items-center mb-4">
        <img src={avatarUrl} alt={`${author}'s avatar`} className="w-12 h-12 rounded-full mr-3 shadow-md" />
        <cite className="font-semibold text-lg text-gray-800">{author}</cite>
      </footer>
      <blockquote className="text-gray-600 text-sm sm:text-base px-4 italic">{quote}</blockquote>
      <div className="flex justify-start space-x-4 mt-4">
        {socialLinks.map((social, index) => (
          social.link && (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-500 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={social.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          )
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "An excellent product that combines quality and functionality. It has proven to be very effective and is well worth the investment.",
      author: "Arjun Desai",
      avatarUrl: "/public/coach1.jpg",
      twitterLink: "https://twitter.com/arjun_11",
      linkedinLink: "#",
      facebookLink: "#",
      instagramLink: "#",
    },
    {
      quote: "I’ve been using this product for a few months now, and it has made a significant difference. The design is sleek, and it functions flawlessly.",
      author: "Nisha Joshi",
      avatarUrl: "/public/coach1.jpg",
      twitterLink: "https://twitter.com/__nisha",
      linkedinLink: "#",
      facebookLink: "#",
      instagramLink: "#",
    },
    {
      quote: "I am thoroughly impressed with this product. It delivers exactly what it promises and has become an essential part of my life.",
      author: "Priya Patel",
      avatarUrl: "/public/coach1.jpg",
      twitterLink: "https://twitter.com/__nisha",
      linkedinLink: "#",
      facebookLink: "#",
      instagramLink: "#",
    },

  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Clients' Feedback on Our Work</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the experiences of our clients with our work, showcasing our dedication to delivering exceptional results.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
