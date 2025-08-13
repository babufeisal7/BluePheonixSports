import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

const expertData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Neuroscience",
    imgSrc: "coach1.jpg",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "James Chen",
    role: "AI Specialist",
    imgSrc: "coach2.jpg",
    social: {
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 3,
    name: "James Chen",
    role: "AI Specialist",
    imgSrc: "keeper.jpg",
    social: {
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 4,
    name: "James Chen",
    role: "AI Specialist",
    imgSrc: "coach3.jpg",
    social: {
      linkedin: "#",
      website: "#"
    }
  },
  {
    id: 5,
    name: "James Chen",
    role: "AI Specialist",
    imgSrc: "coach2.jpg",
    social: {
      linkedin: "#",
      website: "#"
    }
  },
  // ... (other experts remain the same)
];

const ExpertCard = ({ expert }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-white mx-2 h-full transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-80 md:h-96"> {/* Increased height */}
        <img 
          src={`${expert.imgSrc}?w=600&h=1000&fit=crop&crop=faces`} 
          alt={expert.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold">{expert.name}</h3>
        <p className="text-blue-100 mb-3">{expert.role}</p>
        
        <div className="flex space-x-4">
          {expert.social.linkedin && (
            <a href={expert.social.linkedin} className="hover:text-blue-300 transition">
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {expert.social.twitter && (
            <a href={expert.social.twitter} className="hover:text-blue-300 transition">
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
          {expert.social.website && (
            <a href={expert.social.website} className="hover:text-blue-300 transition">
              <FaGlobe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Experts = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    setExperts(expertData);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Expert Team</h2>
          <p className="text-lg text-gray-600">Leading professionals in their fields</p>
        </div>

        <div className="px-4">
          <Slider {...settings}>
            {experts.map((expert) => (
              <div key={expert.id} className="px-2 h-full">
                <ExpertCard expert={expert} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Experts;