import React, { useState } from 'react';

const buttonClass = 'flex justify-between w-full text-left text-muted-foreground py-2 px-4 rounded-lg hover:bg-gray-100';
const iconUp = '&#9650;'; // Up arrow
const iconDown = '&#9660;'; // Down arrow

const FAQs = {
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
};

const FAQComponent = () => {
  const [selectedSport, setSelectedSport] = useState('rugby');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleContent = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow-lg">
      {/* Sidebar with Sports Academy categories */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-blue-600">Sports Academy</h2>
        <ul className="mt-4 space-y-2">
          {Object.keys(FAQs).map(sport => (
            <li
              key={sport}
              className={`flex items-center cursor-pointer p-2 ${selectedSport === sport ? 'bg-blue-100' : ''} hover:bg-blue-50 rounded-lg`}
              onClick={() => setSelectedSport(sport)}
            >
              <img 
                src={`https://openui.fly.dev/openui/24x24.svg?text=${sport === 'rugby' ? '🏉' : sport === 'football' ? '⚽' : sport === 'basketball' ? '🏀' : '🏊'}`} 
                alt={`${sport} Icon`} 
                className="mr-2" 
              />
              <span className="text-blue-700 font-medium">{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content with FAQ */}
      <div className="w-full md:w-3/4 mt-4 md:mt-0 md:ml-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-600">Frequently Asked Questions</h3>
          <div className="mt-4 space-y-4">
            {FAQs[selectedSport].map((faq, index) => (
              <div key={index} className="border-b border-gray-300 pb-2">
                <button className={buttonClass} onClick={() => toggleContent(index)}>
                  <span className="font-semibold">{faq.question}</span>
                  <span dangerouslySetInnerHTML={{ __html: openIndex === index ? iconUp : iconDown }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}>
                  <p className={`mt-2 text-gray-700`}>
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
