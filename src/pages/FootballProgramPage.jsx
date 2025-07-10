import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const FootballProgramPage = () => {
  const coaches = [
    {
      id: 1,
      name: 'Coach Carlos Mendez',
      role: 'Director of Coaching',
      description: 'Former professional player with UEFA Pro License',
      imgSrc: '/coach-carlos.jpg', // Replace with actual coach images
    },
    {
      id: 2,
      name: 'Coach Lisa Zhang',
      role: 'Technical Director',
      description: 'Specializes in youth development and technical skills',
      imgSrc: '/coach-lisa.jpg',
    },
    {
      id: 3,
      name: "Coach Thomas O'Reilly",
      role: 'Goalkeeper Coach',
      description: 'Former college goalkeeper with 8 years coaching experience',
      imgSrc: '/coach-thomas.jpg',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <img
          src="/football-header.jpg"
          alt="Football Team"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Football Development Program
          </h1>
        </div>
      </div>

      {/* Program Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Program Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              Our Football Development Program focuses on technical excellence, tactical understanding, 
              and personal development for players at all levels.
            </p>
            <p className="mb-4">
              With a curriculum designed by professional coaches, we provide a pathway for players 
              to develop their skills in a competitive yet supportive environment.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Age-specific training programs from U8 to Senior level</li>
              <li>Professional coaching with UEFA licensed staff</li>
              <li>Goalkeeper-specific training</li>
              <li>Video analysis sessions</li>
              <li>College recruitment support</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Program Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Training Schedule</h4>
                <p>Tuesday & Thursday: 4:30pm - 6:30pm</p>
                <p>Friday: 5:00pm - 7:00pm (optional skills session)</p>
              </div>
              <div>
                <h4 className="font-medium">Season</h4>
                <p>August - May with summer camps</p>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p>Blue Phoenix Sports Complex - Field 2</p>
              </div>
              <div>
                <h4 className="font-medium">Fees</h4>
                <p>$275/month (payment plans available)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section - Carousel */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Meet Our Coaches</h2>
        <Slider {...settings}>
          {coaches.map(coach => (
            <div key={coach.id} className="px-3 h-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02]">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={coach.imgSrc}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => (e.target.src = '/default-coach.jpg')} // fallback image
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold">{coach.name}</h3>
                  <p className="text-blue-600 mb-2">{coach.role}</p>
                  <p className="text-sm flex-grow">{coach.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Player Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map(testimonial => (
            <div key={testimonial} className="bg-blue-50 p-6 rounded-lg">
              <p className="italic mb-4">
                "{testimonial === 1 
                  ? 'The technical training I received here helped me earn a college scholarship. The coaches truly care.' 
                  : 'I\'ve played in several academies, but the individual attention here is unmatched.'}"
              </p>
              <p className="font-semibold">
                — {testimonial === 1 ? 'Jamie K., College Freshman' : 'Ryan T., U18 Player'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-blue-800 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Our Football Program?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you dream of playing professionally or just want to improve your game, we have the right program for you.
        </p>
        <div className="space-x-4">
          <Link
            to="/contactus"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full inline-block"
          >
            Contact Us
          </Link>
          <Link
            to="/teams/football"
            className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-full inline-block"
          >
            Meet Our Teams
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FootballProgramPage;
