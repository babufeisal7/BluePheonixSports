import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const SwimmingProgramPage = () => {
  const coaches = [
    {
      id: 1,
      name: 'Coach Sarah Chen',
      role: 'Head Coach',
      description: 'Former Olympic swimmer with 15 years coaching experience',
      imgSrc: '/coach-sarah.jpg', // Replace with real images or placeholders
    },
    {
      id: 2,
      name: 'Coach Robert Taylor',
      role: 'Sprint Coach',
      description: 'Specializes in sprint technique and starts/turns',
      imgSrc: '/coach-robert.jpg',
    },
    {
      id: 3,
      name: 'Coach Jessica Morales',
      role: 'Age Group Coach',
      description: 'Expert in youth development and stroke mechanics',
      imgSrc: '/coach-jessica.jpg',
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <img
          src="/swimming-header.jpg"
          alt="Swimming Team"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Swimming Development Program
          </h1>
        </div>
      </div>

      {/* Program Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Program Overview</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              Our Swimming Development Program offers comprehensive training for swimmers of all ages 
              and abilities, from learn-to-swim to competitive levels.
            </p>
            <p className="mb-4">
              With Olympic-sized pools and world-class coaching, we provide an ideal environment 
              for swimmers to develop technique, endurance, and competitive skills.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Programs for ages 4+ through masters swimming</li>
              <li>USA Swimming certified coaches</li>
              <li>Stroke technique refinement</li>
              <li>Dryland training programs</li>
              <li>Competitive team with meets throughout the year</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Program Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Training Schedule</h4>
                <p>Monday-Friday: 4:00pm - 7:00pm (group specific)</p>
                <p>Saturday: 7:00am - 10:00am (optional endurance session)</p>
              </div>
              <div>
                <h4 className="font-medium">Season</h4>
                <p>Year-round with seasonal breaks</p>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p>Blue Phoenix Aquatic Center</p>
              </div>
              <div>
                <h4 className="font-medium">Fees</h4>
                <p>$300/month (includes pool access)</p>
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
                    onError={e => (e.target.src = '/default-coach.jpg')}
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
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Swimmer Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map(testimonial => (
            <div key={testimonial} className="bg-blue-50 p-6 rounded-lg">
              <p className="italic mb-4">
                "{testimonial === 1 
                  ? 'The technical focus on my strokes has shaved seconds off my times. The coaches are incredibly knowledgeable.' 
                  : 'I went from barely swimming to competing in meets within a year. The progress has been amazing!'}"
              </p>
              <p className="font-semibold">
                — {testimonial === 1 ? 'Daniel K., High School State Qualifier' : 'Sophie M., Age Group Swimmer'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-blue-800 text-white py-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Our Swimming Program?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Whether you're just learning or aiming for national competitions, we have the right program for you.
        </p>
        <div className="space-x-4">
          <Link 
            to="/contactus" 
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full inline-block"
          >
            Contact Us
          </Link>
          <Link 
            to="/teams/swimming" 
            className="bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-8 rounded-full inline-block"
          >
            Meet Our Teams
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SwimmingProgramPage;
