import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const TestimonialCard = ({ quote, author, twitterLink, linkedinLink, facebookLink, instagramLink, avatarUrl }) => {
  const socialLinks = [
    { link: twitterLink, icon: faTwitter, color: 'hover:text-blue-400' },
    { link: linkedinLink, icon: faLinkedin, color: 'hover:text-blue-600' },
    { link: facebookLink, icon: faFacebook, color: 'hover:text-blue-700' },
    { link: instagramLink, icon: faInstagram, color: 'hover:text-pink-500' },
  ].filter(social => social.link && social.link !== '#');

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="mb-4 text-blue-500">
        <FontAwesomeIcon icon={faQuoteLeft} size="lg" />
      </div>
      <blockquote className="text-gray-700 mb-6 flex-grow">
        {quote}
      </blockquote>
      <div className="mt-auto">
        <div className="flex items-center">
          <img 
            src={avatarUrl} 
            alt={`${author}'s avatar`} 
            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-blue-100" 
          />
          <div>
            <cite className="font-semibold text-gray-800 not-italic block">{author}</cite>
            {socialLinks.length > 0 && (
              <div className="flex space-x-2 mt-1">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  >
                    <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
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
      quote: "I've been using this product for a few months now, and it has made a significant difference. The design is sleek, and it functions flawlessly.",
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
    <div className="py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who have experienced our services firsthand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        

      </div>
    </div>
  );
};

export default Testimonials;