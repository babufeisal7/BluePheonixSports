
import PropTypes from 'prop-types';

// Shared Tailwind CSS classes
const cardClasses = 'relative rounded-lg overflow-hidden shadow-lg group max-w-md mx-auto bg-white';
const imageClasses = 'w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110';
const overlayClasses = 'absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50';
const textClasses = 'absolute bottom-0 p-4 sm:p-6 text-white transition-all duration-300 ease-in-out transform group-hover:translate-y-2';
const titleClasses = 'text-lg sm:text-xl md:text-2xl font-semibold mt-2 transition-transform duration-300 ease-in-out group-hover:scale-110';
const statsClasses = 'text-sm text-gray-300'; // Styling for stats
const paragraphClasses = 'mt-2 text-gray-700'; // Styling for bio

const PlayerCard = ({ id, name, imgSrc, altText, position, stats, bio, isActive, onClick }) => (
  <div className={`${cardClasses} ${isActive ? 'bg-gray-200' : ''}`} onClick={() => onClick(id)}>
    <img src={imgSrc} alt={altText} className={imageClasses} />
    <div className={overlayClasses}></div>
    <div className={textClasses}>
      <h2 className={titleClasses}>{name}</h2>
      <h3 className="text-sm text-gray-300">{position}</h3>
      <p className={statsClasses}>{stats}</p>
      {isActive && <p className={paragraphClasses}>{bio}</p>}
    </div>
  </div>
);

PlayerCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const FootballPage = () => {
  const [activePlayerId, setActivePlayerId] = useState(null);

  const handleCardClick = (id) => {
    setActivePlayerId(activePlayerId === id ? null : id); // Toggle bio visibility
  };

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-black mb-8 text-center">Football Players and Coaches</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
        <PlayerCard
          id={1}
          name="Carlos Ramirez"
          imgSrc="https://placehold.co/200x200"
          altText="Carlos Ramirez"
          position="Forward"
          stats="Goals: 15 | Assists: 8"
          bio="Carlos is a dynamic forward known for his exceptional scoring ability and agility on the field."
          isActive={activePlayerId === 1}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={2}
          name="Luis Gonzales"
          imgSrc="https://placehold.co/200x200"
          altText="Luis Gonzales"
          position="Midfielder"
          stats="Goals: 7 | Assists: 12"
          bio="Luis is a creative midfielder with a keen eye for assists and a knack for controlling the game."
          isActive={activePlayerId === 2}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={3}
          name="Marco Silva"
          imgSrc="https://placehold.co/200x200"
          altText="Marco Silva"
          position="Defender"
          stats="Tackles: 20 | Blocks: 10"
          bio="Marco is a solid defender known for his resilience and excellent tackling skills."
          isActive={activePlayerId === 3}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={4}
          name="David Martinez"
          imgSrc="https://placehold.co/200x200"
          altText="David Martinez"
          position="Goalkeeper"
          stats="Saves: 50 | Clean Sheets: 7"
          bio="David is a skilled goalkeeper with quick reflexes and great shot-stopping ability."
          isActive={activePlayerId === 4}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={5}
          name="Diego Torres"
          imgSrc="https://placehold.co/200x200"
          altText="Diego Torres"
          position="Forward"
          stats="Goals: 12 | Assists: 10"
          bio="Diego is a forward known for his agility and goal-scoring prowess."
          isActive={activePlayerId === 5}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={6}
          name="Antonio Ruiz"
          imgSrc="https://placehold.co/200x200"
          altText="Antonio Ruiz"
          position="Midfielder"
          stats="Goals: 6 | Assists: 15"
          bio="Antonio is a playmaker with excellent vision and passing accuracy."
          isActive={activePlayerId === 6}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={7}
          name="Rafael Castillo"
          imgSrc="https://placehold.co/200x200"
          altText="Rafael Castillo"
          position="Defender"
          stats="Tackles: 25 | Interceptions: 15"
          bio="Rafael is a tough defender with a strong presence in the backline."
          isActive={activePlayerId === 7}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={8}
          name="Jorge Moreno"
          imgSrc="https://placehold.co/200x200"
          altText="Jorge Moreno"
          position="Goalkeeper"
          stats="Saves: 40 | Clean Sheets: 6"
          bio="Jorge is a reliable goalkeeper with exceptional agility and decision-making."
          isActive={activePlayerId === 8}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={9}
          name="Pedro Fernandez"
          imgSrc="https://placehold.co/200x200"
          altText="Pedro Fernandez"
          position="Forward"
          stats="Goals: 10 | Assists: 5"
          bio="Pedro is a forward with a sharp eye for goal and excellent positioning."
          isActive={activePlayerId === 9}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={10}
          name="Luis Martinez"
          imgSrc="https://placehold.co/200x200"
          altText="Luis Martinez"
          position="Midfielder"
          stats="Goals: 8 | Assists: 10"
          bio="Luis is a versatile midfielder with strong dribbling skills and vision."
          isActive={activePlayerId === 10}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={11}
          name="Ricardo Vega"
          imgSrc="https://placehold.co/200x200"
          altText="Ricardo Vega"
          position="Defender"
          stats="Tackles: 30 | Clearances: 12"
          bio="Ricardo is a robust defender known for his leadership and defensive organization."
          isActive={activePlayerId === 11}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={12}
          name="Miguel Santos"
          imgSrc="https://placehold.co/200x200"
          altText="Miguel Santos"
          position="Goalkeeper"
          stats="Saves: 55 | Clean Sheets: 8"
          bio="Miguel is a talented goalkeeper with excellent reflexes and command of the area."
          isActive={activePlayerId === 12}
          onClick={handleCardClick}
        />
        <PlayerCard
          id={13}
          name="Juan Carlos"
          imgSrc="https://placehold.co/200x200"
          altText="Juan Carlos"
          position="Forward"
          stats="Goals: 9 | Assists: 6"
          bio="Juan Carlos is a forward with strong finishing skills and a great sense of positioning."
          isActive={activePlayerId === 13}
          onClick={handleCardClick}
        />
      </div>
      
      <div className={cardClasses}>
        <img className={imageClasses} src="https://placehold.co/200x200" alt="Coach Image" />
        <div className={textClasses}>
          <h2 className={titleClasses}>ALEX MARTINEZ</h2>
          <h3 className="text-sm text-gray-600">COACH</h3>
          <p className={paragraphClasses}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Date of birth:</strong> 5 March 1980</p>
            <p><strong>Place of birth:</strong> Madrid</p>
            <p><strong>Nationality:</strong> Spain</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FootballPage;
