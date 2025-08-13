import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cardClasses =
  "relative rounded-lg overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-4";
const imageClasses =
  "w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-2";
const overlayClasses =
  "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-300";
const textClasses =
  "absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2";
const titleClasses =
  "text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110";

const EventCard = ({ title, date, description, imageUrl }) => (
  <div className={cardClasses}>
    <img src={imageUrl} alt={title} className={imageClasses} />
    <div className={overlayClasses}></div>
    <div className={textClasses}>
      <span className="text-sm sm:text-base">{date}</span>
      <h3 className={titleClasses}>{title}</h3>
      <p className="text-xs sm:text-sm mt-2">{description}</p>
    </div>
  </div>
);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/db.json"); 
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  if (isLoading) return <div className="text-center py-8">Loading events...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-100 to-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
          Upcoming Events
        </h2>
        <p className="text-lg sm:text-xl text-center text-black mb-8">
          Stay updated with our latest activities and join us for exciting moments!
        </p>
        <Slider {...settings}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              description={event.description}
              imageUrl={event.image}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Events;
