import React from 'react';

const SwimmingPage = () => (
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Swimming Team</h1>
        
        {/* Team Profile */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Profile</h2>
            <p>Our Swimming Team focuses on performance and technique. We aim to foster skill development and competitive swimming.</p>
            <img src="/swimming-team-photo.jpg" alt="Swimming Team" className="w-full h-64 object-cover rounded-lg mb-4" />
        </section>

        {/* Team Stats */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Stats</h2>
            <ul className="list-disc ml-6">
                <li><strong>Gold Medals:</strong> 8</li>
                <li><strong>Silver Medals:</strong> 5</li>
                <li><strong>Bronze Medals:</strong> 3</li>
                <li><strong>Top Swimmer:</strong> Emily White (4 gold medals)</li>
                <li><strong>Best Relay Team:</strong> 4x100m Freestyle Relay</li>
            </ul>
        </section>

        {/* Team Members */}
        <section>
            <h2 className="text-3xl font-semibold mb-2">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player7.jpg" alt="Player 1" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Emily White</h3>
                    <p>Specialty: Freestyle</p>
                    <p>Number: 1</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player8.jpg" alt="Player 2" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Alex Brown</h3>
                    <p>Specialty: Butterfly</p>
                    <p>Number: 2</p>
                </div>
                {/* Add more player profiles */}
            </div>
        </section>
    </div>
);

export default SwimmingPage;
