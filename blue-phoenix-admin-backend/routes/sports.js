const express = require('express');
const router = express.Router();

// Mock data for sports programs with teams and players
const sports = [
    {
        id: 1,
        name: 'Rugby',
        status: 'active',
        teams: [
            {
                teamId: 1,
                teamName: 'Blue Phoenix Rugby Team',
                players: [
                 {
                id: 1,
                name: "John Doe",
                imgSrc: "/photo8.jpg",
                altText: "John Doe",
                position: "Fly-half",
                stats: "Games Played: 50 | Tries: 30 | Tackles: 120 | Kicks: 150",
                bio: "John Doe is a skilled Fly-half known for his strategic playmaking.",
                experience: 5
            },
            {
                id: 2,
                name: "James Smith",
                imgSrc: "/photo9.jpg",
                altText: "James Smith",
                position: "Fullback",
                stats: "Games Played: 35 | Tries: 15 | Tackles: 100 | Kicks: 60",
                bio: "James Smith excels in defensive strategies and is a reliable kicker.",
                experience: 3
            },
            {
                id: 3,
                name: "Michael Johnson",
                imgSrc: "/photo10.jpg",
                altText: "Michael Johnson",
                position: "Prop",
                stats: "Games Played: 75 | Tries: 5 | Tackles: 300 | Scrums Won: 200",
                bio: "Michael Johnson is known for his strength in the scrum and tackles.",
                experience: 7
            },
            {
                id: 4,
                name: "David Williams",
                imgSrc: "/image1.jpg",
                altText: "David Williams",
                position: "Scrum-half",
                stats: "Games Played: 40 | Tries: 18 | Tackles: 90 | Passes: 600",
                bio: "David Williams is a talented Scrum-half with exceptional passing skills.",
                experience: 4
            },
            {
                id: 5,
                name: "Chris Brown",
                imgSrc: "/image2.jpg",
                altText: "Chris Brown",
                position: "Wing",
                stats: "Games Played: 25 | Tries: 22 | Tackles: 70 | Kicks: 40",
                bio: "Chris Brown is a fast-wing player known for his scoring ability.",
                experience: 2
            },
            {
                id: 6,
                name: "Paul Adams",
                imgSrc: "/image3.jpg",
                altText: "Paul Adams",
                position: "Lock",
                stats: "Games Played: 65 | Tries: 10 | Tackles: 250 | Lineouts Won: 180",
                bio: "Paul Adams is recognized for his performance in lineouts and defense.",
                experience: 6
            },
            {
                id: 7,
                name: "Luke Turner",
                imgSrc: "/image4.jpg",
                altText: "Luke Turner",
                position: "Hooker",
                stats: "Games Played: 55 | Tries: 8 | Tackles: 210 | Lineout Throws: 300",
                bio: "Luke Turner is known for his accuracy in lineout throws.",
                experience: 5
            },
            {
                id: 8,
                name: "Henry Baker",
                imgSrc: "/photo11.jpg",
                altText: "Henry Baker",
                position: "Flanker",
                stats: "Games Played: 45 | Tries: 12 | Tackles: 230 | Turnovers: 50",
                bio: "Henry Baker is a dynamic flanker known for his speed and agility.",
                experience: 3
            }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Football',
        status: 'active',
        teams: [
            {
                teamId: 1,
                teamName: 'Blue Phoenix Football Team',
                players: [
                  {
            id: 1,
            name: "Carlos Ramirez",
            imgSrc: "/photo8.jpg",
            altText: "Carlos Ramirez",
            position: "Forward",
            stats: "Goals: 15 | Assists: 8",
            bio: "Carlos is a dynamic forward known for his exceptional scoring ability and agility on the field.",
          },
          {
            id: 2,
            name: "Luis Gonzales",
            imgSrc: "/photo9.jpg",
            altText: "Luis Gonzales",
            position: "Midfielder",
            stats: "Goals: 7 | Assists: 12",
            bio: "Luis is a creative midfielder with a keen eye for assists and a knack for controlling the game.",
          },
          {
            id: 3,
            name: "Marco Silva",
            imgSrc: "/photo10.jpg",
            altText: "Marco Silva",
            position: "Defender",
            stats: "Tackles: 20 | Blocks: 10",
            bio: "Marco is a solid defender known for his resilience and excellent tackling skills.",
          },
          {
            id: 4,
            name: "David Martinez",
            imgSrc: "/image1.jpg",
            altText: "David Martinez",
            position: "Goalkeeper",
            stats: "Saves: 50 | Clean Sheets: 7",
            bio: "David is a skilled goalkeeper with quick reflexes and great shot-stopping ability.",
          },
          {
            id: 5,
            name: "Diego Torres",
            imgSrc: "/image2.jpg",
            altText: "Diego Torres",
            position: "Forward",
            stats: "Goals: 12 | Assists: 10",
            bio: "Diego is a forward known for his agility and goal-scoring prowess.",
          },
          {
            id: 6,
            name: "Antonio Ruiz",
            imgSrc: "/image3.jpg",
            altText: "Antonio Ruiz",
            position: "Midfielder",
            stats: "Goals: 6 | Assists: 15",
            bio: "Antonio is a playmaker with excellent vision and passing accuracy.",
          },
          {
            id: 7,
            name: "Rafael Castillo",
            imgSrc: "/image4.jpg",
            altText: "Rafael Castillo",
            position: "Defender",
            stats: "Tackles: 25 | Interceptions: 15",
            bio: "Rafael is a tough defender with a strong presence in the backline.",
          },
          {
            id: 8,
            name: "Jorge Moreno",
            imgSrc: "/photo11.jpg",
            altText: "Jorge Moreno",
            position: "Goalkeeper",
            stats: "Saves: 40 | Clean Sheets: 6",
            bio: "Jorge is a reliable goalkeeper with exceptional agility and decision-making.",
          },
          {
            id: 9,
            name: "Pedro Fernandez",
            imgSrc: "/photo8.jpg",
            altText: "Pedro Fernandez",
            position: "Forward",
            stats: "Goals: 10 | Assists: 5",
            bio: "Pedro is a forward with a sharp eye for goal and excellent positioning.",
          },
          {
            id: 10,
            name: "Luis Martinez",
            imgSrc: "/photo9.jpg",
            altText: "Luis Martinez",
            position: "Midfielder",
            stats: "Goals: 8 | Assists: 10",
            bio: "Luis is a versatile midfielder with strong dribbling skills and vision.",
          },
          {
            id: 11,
            name: "Ricardo Vega",
            imgSrc: "/photo10.jpg",
            altText: "Ricardo Vega",
            position: "Defender",
            stats: "Tackles: 30 | Clearances: 12",
            bio: "Ricardo is a robust defender known for his leadership and defensive organization.",
          },
          {
            id: 12,
            name: "Miguel Santos",
            imgSrc: "/image1.jpg",
            altText: "Miguel Santos",
            position: "Goalkeeper",
            stats: "Saves: 55 | Clean Sheets: 8",
            bio: "Miguel is a talented goalkeeper with excellent reflexes and command of the area.",
          },
          {
            id: 13,
            name: "Juan Carlos",
            imgSrc: "/image2.jpg",
            altText: "Juan Carlos",
            position: "Forward",
            stats: "Goals: 9 | Assists: 6",
            bio: "Juan Carlos is a forward with strong finishing skills and a great sense of positioning.",
          }  
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Basketball',
        status: 'coming soon',
        teams: [
            {
                teamId: 1,
                teamName: 'Blue Phoenix Basketball Team',
                players: [
                             {
            id: 1,
            name: "Jordan Rivers",
            imgSrc: "/photo11.jpg",
            altText: "Jordan Rivers",
            position: "Point Guard",
            stats: "20 points, 8 assists per game",
            bio: "Jordan is known for his incredible speed and court vision.",
          },
          {
            id: 2,
            name: "Isaiah Carter",
            imgSrc: "/photo12.jpg",
            altText: "Isaiah Carter",
            position: "Shooting Guard",
            stats: "25 points, 5 rebounds per game",
            bio: "Isaiah is a sharpshooter with a knack for hitting clutch shots.",
          },
          {
            id: 3,
            name: "Marcus Allen",
            imgSrc: "/photo10.jpg",
            altText: "Marcus Allen",
            position: "Small Forward",
            stats: "18 points, 7 rebounds per game",
            bio: "Marcus is an athletic player with great defensive skills.",
          },
          {
            id: 4,
            name: "DeAndre Simmons",
            imgSrc: "/photo8.jpg",
            altText: "DeAndre Simmons",
            position: "Power Forward",
            stats: "15 points, 10 rebounds per game",
            bio: "DeAndre is known for his strong post moves and rebounding ability.",
          },
          {
            id: 5,
            name: "Trey Parker",
            imgSrc: "/photo8.jpg",
            altText: "Trey Parker",
            position: "Center",
            stats: "12 points, 11 rebounds per game",
            bio: "Trey is a dominant presence in the paint and an excellent shot-blocker.",
          },
          {
            id: 6,
            name: "Liam Foster",
            imgSrc: "/photo6.jpg",
            altText: "Liam Foster",
            position: "Point Guard",
            stats: "22 points, 7 assists per game",
            bio: "Liam is known for his leadership on and off the court.",
          },
          {
            id: 7,
            name: "Noah Taylor",
            imgSrc: "/photo8.jpg",
            altText: "Noah Taylor",
            position: "Shooting Guard",
            stats: "23 points, 4 rebounds per game",
            bio: "Noah has a deadly three-point shot and excellent footwork.",
          },
          {
            id: 8,
            name: "Ethan King",
            imgSrc: "/photo8.jpg",
            altText: "Ethan King",
            position: "Small Forward",
            stats: "19 points, 6 rebounds per game",
            bio: "Ethan is a versatile scorer who can play multiple positions.",
          },
          {
            id: 9,
            name: "Oliver Scott",
            imgSrc: "/photo9.jpg",
            altText: "Oliver Scott",
            position: "Power Forward",
            stats: "16 points, 9 rebounds per game",
            bio: "Oliver brings size and strength to the team, excelling in post play.",
          },
          {
            id: 10,
            name: "Lucas Rivera",
            imgSrc: "/photo10.jpg",
            altText: "Lucas Rivera",
            position: "Center",
            stats: "14 points, 10 rebounds per game",
            bio: "Lucas is an elite shot-blocker and rim protector.",
          },
          {
            id: 11,
            name: "Mason Brooks",
            imgSrc: "/photo11.jpg",
            altText: "Mason Brooks",
            position: "Small Forward",
            stats: "21 points, 5 rebounds per game",
            bio: "Mason is an athletic player known for his quickness and agility.",
          },
          {
            id: 12,
            name: "James Bennett",
            imgSrc: "/photo12.jpg",
            altText: "James Bennett",
            position: "Point Guard",
            stats: "24 points, 6 assists per game",
            bio: "James is an exceptional playmaker and scorer.",
          },
          {
            id: 13,
            name: "Samuel Adams",
            imgSrc: "/photo10.jpg",
            altText: "Samuel Adams",
            position: "Shooting Guard",
            stats: "17 points, 4 assists per game",
            bio: "Samuel is a sharp shooter who can stretch the floor.",
          },
          {
            id: 14,
            name: "Gabriel Moore",
            imgSrc: "/photo12.jpg",
            altText: "Gabriel Moore",
            position: "Power Forward",
            stats: "15 points, 8 rebounds per game",
            bio: "Gabriel is a strong player who excels in rebounding.",
          }
                ]
            }
        ]
    },
    {
        id: 4,
        name: 'Swimming',
        status: 'coming soon',
        teams: [
            {
      id: 1,
      name: "Swimmer 1",
      imgSrc: "/swimmer1.jpg",
      altText: "Swimmer 1",
      position: "Freestyle Specialist",
      stats: "100m Freestyle: 50.23s | 200m Freestyle: 1:48.11",
      bio: "Swimmer 1 is a top competitor known for their speed in freestyle events.",
      experience: 5
    },
    {
      id: 2,
      name: "Swimmer 2",
      imgSrc: "/swimmer2.jpg",
      altText: "Swimmer 2",
      position: "Butterfly Specialist",
      stats: "100m Butterfly: 54.10s | 200m Butterfly: 2:00.30",
      bio: "Swimmer 2 excels in butterfly, often breaking records in their category.",
      experience: 4
    },
    {
      id: 3,
      name: "Swimmer 3",
      imgSrc: "/swimmer3.jpg",
      altText: "Swimmer 3",
      position: "Backstroke Specialist",
      stats: "100m Backstroke: 55.50s | 200m Backstroke: 1:59.80",
      bio: "Swimmer 3 has a strong technique in backstroke and consistently performs well.",
      experience: 3
    },
    {
      id: 4,
      name: "Swimmer 4",
      imgSrc: "/swimmer4.jpg",
      altText: "Swimmer 4",
      position: "Individual Medley",
      stats: "200m IM: 2:01.90 | 400m IM: 4:15.60",
      bio: "Swimmer 4 is known for their versatility and strength in individual medley events.",
      experience: 6
    },
    {
      id: 5,
      name: "Swimmer 5",
      imgSrc: "/swimmer5.jpg",
      altText: "Swimmer 5",
      position: "Sprint Specialist",
      stats: "50m Freestyle: 21.85s | 100m Freestyle: 47.20s",
      bio: "Swimmer 5 is a powerful sprinter with impressive speed in short-distance events.",
      experience: 2
    },
    {
      id: 6,
      name: "Swimmer 6",
      imgSrc: "/swimmer6.jpg",
      altText: "Swimmer 6",
      position: "Distance Swimmer",
      stats: "800m Freestyle: 8:00.00 | 1500m Freestyle: 15:20.00",
      bio: "Swimmer 6 specializes in distance events and is known for their endurance.",
      experience: 4
    },
    {
      id: 7,
      name: "Swimmer 7",
      imgSrc: "/swimmer7.jpg",
      altText: "Swimmer 7",
      position: "Relay Specialist",
      stats: "4x100m Freestyle Relay: 3:10.00",
      bio: "Swimmer 7 is a key member of the relay team, contributing to their success.",
      experience: 5
    },
    {
      id: 8,
      name: "Swimmer 8",
      imgSrc: "/swimmer8.jpg",
      altText: "Swimmer 8",
      position: "Junior Swimmer",
      stats: "200m Freestyle: 2:10.00 | 100m Freestyle: 1:00.00",
      bio: "Swimmer 8 is an upcoming talent in the swimming world with a bright future.",
      experience: 1
    }
        ]
    }
];




// Get all sports
router.get('/', (req, res) => {
    res.json(sports);
});

// Get sport by ID
router.get('/:id', (req, res) => {
    const sportId = parseInt(req.params.id, 10);
    const sport = sports.find(s => s.id === sportId);
    if (sport) {
        res.json(sport);
    } else {
        res.status(404).json({ message: 'Sport not found' });
    }
});

module.exports = router;
