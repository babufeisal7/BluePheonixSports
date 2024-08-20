import React from 'react';

const RugbyPage = () => (
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Rugby Team</h1>
        
        {/* Team Profile */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Profile</h2>
            <p>Our Rugby Team is dedicated to excellence and teamwork. We pride ourselves on our strong work ethic and competitive spirit.</p>
            <img src="/rugby-team-photo.jpg" alt="Rugby Team" className="w-full h-64 object-cover rounded-lg mb-4" />
        </section>

        {/* Team Stats */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Stats</h2>
            <ul className="list-disc ml-6">
                <li><strong>Wins:</strong> 15</li>
                <li><strong>Losses:</strong> 5</li>
                <li><strong>Draws:</strong> 2</li>
                <li><strong>Top Scorer:</strong> John Doe (25 tries)</li>
                <li><strong>Best Defensive Player:</strong> Jane Smith</li>
            </ul>
        </section>

        {/* Team Members */}
        <section>
            <h2 className="text-3xl font-semibold mb-2">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player1.jpg" alt="Player 1" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                    <p>Position: Wing</p>
                    <p>Number: 11</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player2.jpg" alt="Player 2" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                    <p>Position: Fullback</p>
                    <p>Number: 15</p>
                </div>
                {/* Add more player profiles */}
            </div>
        </section>
    </div>
);

export default RugbyPage;
