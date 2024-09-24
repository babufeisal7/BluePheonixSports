// src/pages/FootballProgram.jsx
import SportsProgramPage from './SportsProgramPage';

const FootballProgram = () => {
  const footballDetails = [
    "In-depth tactical and technical training.",
    "Access to professional-grade equipment and facilities.",
    "Focus on teamwork and strategic gameplay.",
  ];

  const footballHighlights = [
    { title: "Advanced Training Methods", description: "Utilizing the latest training techniques for optimal performance." },
    { title: "Elite Competitions", description: "Compete against top teams in national and international tournaments." },
    { title: "Player Development", description: "Emphasis on individual skill development and team dynamics." },
  ];

  return (
    <SportsProgramPage
      title="Football Program"
      description="Our football program offers a comprehensive approach to player development, from grassroots to elite levels."
      imgSrc="/images/football-program.jpg"
      altText="Football Training"
      programDetails={footballDetails}
      highlights={footballHighlights}
    />
  );
};

export default FootballProgram;
