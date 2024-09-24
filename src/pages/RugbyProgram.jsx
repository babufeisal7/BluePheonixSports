// src/pages/RugbyProgram.jsx
import SportsProgramPage from './SportsProgramPage';

const RugbyProgram = () => {
  const rugbyDetails = [
    "Comprehensive training sessions focused on skill development.",
    "Expert coaching staff with professional experience.",
    "Participation in local and international tournaments.",
  ];

  const rugbyHighlights = [
    { title: "World-Class Coaching", description: "Our coaches are former professional players with extensive experience." },
    { title: "State-of-the-Art Facilities", description: "Train in top-tier facilities designed to maximize performance." },
    { title: "Tournaments & Competitions", description: "Opportunities to participate in both local and international competitions." },
  ];

  return (
    <SportsProgramPage
      title="Rugby Program"
      description="Our rugby program is designed to develop young athletes into skilled and competitive players."
      imgSrc="/images/rugby-program.jpg"
      altText="Rugby Training"
      programDetails={rugbyDetails}
      highlights={rugbyHighlights}
    />
  );
};

export default RugbyProgram;
