import React from "react";

const CoachProfile = () => {
  const coach = {
    name: "Coach Daniel Mwangi",
    photo: "/public/coach2.jpg", // placeholder avatar
    bio: "Experienced rugby coach with 10+ years training elite athletes and youth teams. Passionate about skill development and sportsmanship.",
    email: "daniel.mwangi@example.com",
    phone: "+256 700 123 456",
    social: {
      twitter: "https://twitter.com/coachdaniel",
      linkedin: "https://linkedin.com/in/coachdanielmwangi",
    },
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Coach Profile</h2>
      <div className="flex flex-col items-center space-y-4">
        <img
          src={coach.photo}
          alt={`${coach.name} photo`}
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <h3 className="text-xl font-bold">{coach.name}</h3>
        <p className="text-gray-700 text-center">{coach.bio}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M16 12H8m0 0l4-4m0 8l-4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <a
            href={`mailto:${coach.email}`}
            className="text-blue-600 hover:underline"
            aria-label={`Email ${coach.name}`}
          >
            {coach.email}
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M22 16.92V21a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.53 19.53 0 01-6-6 19.79 19.79 0 01-3.07-8.64A2 2 0 013 2h4.09a2 2 0 012 1.72c.12.81.37 1.6.74 2.31a2 2 0 01-.45 2.11L9.21 8.79a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.71.37 1.5.62 2.31.74a2 2 0 011.72 2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <a href={`tel:${coach.phone}`} className="text-green-600 hover:underline" aria-label={`Call ${coach.name}`}>
            {coach.phone}
          </a>
        </div>

        <div className="flex space-x-6 justify-center mt-4">
          <a
            href={coach.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${coach.name} Twitter`}
            className="text-blue-500 hover:text-blue-700"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.4a9 9 0 01-2.88 1.1 4.52 4.52 0 00-7.69 4.12A12.83 12.83 0 013 4.8a4.52 4.52 0 001.4 6.03 4.52 4.52 0 01-2.05-.56v.06a4.52 4.52 0 003.63 4.44 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.15A9.06 9.06 0 012 19.5a12.8 12.8 0 006.92 2.02c8.3 0 12.84-6.9 12.84-12.87 0-.2 0-.42-.02-.62A9.22 9.22 0 0023 3z" />
            </svg>
          </a>

          <a
            href={coach.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${coach.name} LinkedIn`}
            className="text-blue-700 hover:text-blue-900"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11.5 20h-3v-11h3zm-1.5-12.268a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm13 12.268h-3v-5.605c0-1.337-.027-3.06-1.866-3.06-1.867 0-2.154 1.459-2.154 2.963v5.702h-3v-11h2.881v1.507h.041a3.154 3.154 0 012.839-1.56c3.037 0 3.6 2 3.6 4.59z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
