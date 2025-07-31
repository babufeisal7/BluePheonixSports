import React, { useState, useMemo } from 'react';
import { 
  faFootballBall, 
  faFutbol, 
  faBasketballBall, 
  faSwimmer 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FAQComponent = () => {
  const [selectedSport, setSelectedSport] = useState('rugby');
  const [openIndex, setOpenIndex] = useState(null);

  const SPORT_ICONS = {
    rugby: faFootballBall,
    football: faFutbol,
    basketball: faBasketballBall,
    swimming: faSwimmer
  };

  const FAQ_DATA = useMemo(() => ({
    rugby: [
      { question: 'What is the age requirement for rugby?', answer: 'Players must be at least 8 years old to join the rugby team.' },
      { question: 'What equipment do I need for rugby?', answer: 'You will need a rugby shirt, shorts, socks, and appropriate footwear.' },
      { question: 'How long is a rugby match?', answer: 'A rugby match typically lasts 80 minutes, divided into two halves of 40 minutes each.' },
      { question: 'Are there different levels of rugby teams?', answer: 'Yes, we have teams for various skill levels and age groups.' },
    ],
    football: [
      { question: 'How often are football practices held?', answer: 'Football practices are held three times a week.' },
      { question: 'Do I need to bring my own ball?', answer: 'No, balls are provided during practice sessions.' },
      { question: 'What should I wear to football practice?', answer: 'Wear comfortable athletic clothing and cleats suitable for the field.' },
      { question: 'Are there tournaments or matches?', answer: 'Yes, we participate in local and regional tournaments throughout the season.' },
    ],
    basketball: [
      { question: 'What is the duration of basketball training sessions?', answer: 'Training sessions last for 1.5 hours.' },
      { question: 'Are there any tryouts for the basketball team?', answer: 'Yes, tryouts are held at the beginning of each season.' },
      { question: 'Do I need special shoes for basketball?', answer: 'Yes, it is recommended to wear basketball shoes that provide good ankle support and grip.' },
      { question: 'Can beginners join the basketball team?', answer: 'Absolutely! We welcome players of all skill levels.' },
    ],
    swimming: [
      { question: 'What are the pool hours for swimming?', answer: 'The pool is open from 6 AM to 9 PM daily.' },
      { question: 'Do I need to be a member to swim?', answer: 'Yes, a membership is required to access the pool.' },
      { question: 'Are swimming lessons available?', answer: 'Yes, we offer swimming lessons for all ages and skill levels.' },
      { question: 'What should I bring to a swim session?', answer: 'Bring a swimsuit, towel, goggles, and a swim cap if needed.' },
    ],
  }), []);

  const toggleContent = (index) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  const sportNames = useMemo(() => Object.keys(FAQ_DATA), [FAQ_DATA]);

  return (
    <div className="flex flex-col md:flex-row bg-blue-700 p-4 shadow-lg">
      {/* Sidebar with Sports Academy categories */}
      <div className="w-full md:w-1/4 bg-blue-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-white">Sports Academy</h2>
        <ul className="mt-4 space-y-2">
          {sportNames.map((sport) => (
            <li
              key={sport}
              className={`flex items-center cursor-pointer p-2 ${
                selectedSport === sport ? 'bg-blue-900' : 'hover:bg-blue-600'
              } rounded-lg transition-colors duration-200`}
              onClick={() => {
                setSelectedSport(sport);
                setOpenIndex(null);
              }}
            >
              <FontAwesomeIcon 
                icon={SPORT_ICONS[sport]} 
                className="mr-2 text-white" 
              />
              <span className="text-white font-medium capitalize">
                {sport}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content with FAQ */}
      <div className="w-full md:w-3/4 mt-4 md:mt-0 md:ml-4">
        <div className="bg-blue-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
          <div className="mt-4 space-y-4">
            {FAQ_DATA[selectedSport].map((faq, index) => (
              <div key={`${selectedSport}-${index}`} className="border-b border-blue-600 pb-2">
                <button 
                  className="flex justify-between w-full text-left text-white py-2 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                  onClick={() => toggleContent(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-${selectedSport}-${index}`}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className="ml-2">
                    {openIndex === index ? '▲' : '▼'}
                  </span>
                </button>
                <div 
                  id={`faq-${selectedSport}-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="mt-2 text-white pl-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;