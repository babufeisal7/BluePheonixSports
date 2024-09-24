import PropTypes from 'prop-types';

const SportsProgramPage = ({ title, description, imgSrc, imgAlt, coaches, schedule, achievements }) => {
  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">{title}</h1>
      <img src={imgSrc} alt={imgAlt} className="w-full h-64 object-cover rounded-lg mb-8" />
      <p className="text-lg text-gray-700 mb-6">{description}</p>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Coaches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <img src={coach.imgSrc} alt={coach.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{coach.name}</h3>
              <p className="text-gray-600">{coach.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Schedule</h2>
        <ul className="list-disc pl-5 text-gray-700">
          {schedule.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-black mb-4">Achievements</h2>
        <p className="text-lg text-gray-700">{achievements}</p>
      </div>
    </div>
  );
};

SportsProgramPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  coaches: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    })
  ).isRequired,
  schedule: PropTypes.arrayOf(PropTypes.string).isRequired,
  achievements: PropTypes.string.isRequired,
};

export default SportsProgramPage;
