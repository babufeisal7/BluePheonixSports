import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const BasketballProgramPage = () => {
  const coaches = [
    {
      id: 1,
      name: 'Coach Marcus Johnson',
      role: 'Head Coach',
      description: 'Former Division I player with 12 years coaching experience',
      imgSrc: '/coach-marcus.jpg', // Replace with actual coach images
    },
    {
      id: 2,
      name: 'Coach Elena Rodriguez',
      role: 'Skills Coach',
      description: 'WNBA veteran specializing in guard development',
      imgSrc: '/coach-elena.jpg',
    },
    {
      id: 3,
      name: 'Coach Derek Williams',
      role: 'Strength Coach',
      description: 'Certified performance specialist',
      imgSrc: '/coach-derek.jpg',
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
          src="/basketball-header.jpg"
          alt="Basketball Team"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Basketball Development Program
          </h1>
        </div>
      </div>

      {/* Program Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Program Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              Our Basketball Development Program is designed to develop complete players through
              skill development, game understanding, and competitive play.
            </p>
            <p className="mb-4">
              We focus on fundamentals while also preparing players for the modern game with
              position-less basketball concepts and advanced skill training.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Programs for ages 8-18 and adult leagues</li>
              <li>Professional coaching staff with college/pro experience</li>
              <li>Skill-specific training (shooting, ball handling, etc.)</li>
              <li>Strength and agility training</li>
              <li>AAU competitive teams</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Program Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Training Schedule</h4>
                <p>Monday & Wednesday: 5:00pm - 7:00pm</p>
                <p>Saturday: 10:00am - 12:00pm (optional skills session)</p>
              </div>
              <div>
                <h4 className="font-medium">Season</h4>
                <p>Year-round with seasonal leagues and tournaments</p>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p>Blue Phoenix Sports Complex - Court 1</p>
              </div>
              <div>
                <h4 className="font-medium">Fees</h4>
                <p>$225/month (discounts for siblings)</p>
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
                  ? 'The individual attention to detail in my game has taken me to another level. Best decision I ever made.'
                  : "Not only has my game improved, but I've made lifelong friends through this program."}"
              </p>
              <p className="font-semibold">
                — {testimonial === 1 ? 'Tyler S., High School Starter' : 'Maya P., U14 Player'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-blue-800 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Our Basketball Program?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you're just starting or aiming for college basketball, we'll help you reach your potential.
        </p>
        <div className="space-x-4">
          <Link
            to="/contactus"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full inline-block"
          >
            Contact Us
          </Link>
          <Link
            to="/teams/basketball"
            className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-full inline-block"
          >
            Meet Our Teams
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BasketballProgramPage;
