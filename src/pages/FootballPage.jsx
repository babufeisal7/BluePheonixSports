import React from 'react';

const FootballPage = () => (
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Football Team</h1>
        
        {/* Team Profile */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Profile</h2>
            <p>Our Football Team is known for its skill and determination on the field. We aim to foster talent and achieve greatness.</p>
            <img src="/football-team-photo.jpg" alt="Football Team" className="w-full h-64 object-cover rounded-lg mb-4" />
        </section>

        {/* Team Stats */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Stats</h2>
            <ul className="list-disc ml-6">
                <li><strong>Wins:</strong> 20</li>
                <li><strong>Losses:</strong> 4</li>
                <li><strong>Draws:</strong> 6</li>
                <li><strong>Top Scorer:</strong> Mark Lee (18 goals)</li>
                <li><strong>Best Defender:</strong> Sarah Connor</li>
            </ul>
        </section>

        {/* Team Members */}
        <section>
            <h2 className="text-3xl font-semibold mb-2">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player3.jpg" alt="Player 1" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Mark Lee</h3>
                    <p>Position: Forward</p>
                    <p>Number: 9</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player4.jpg" alt="Player 2" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Sarah Connor</h3>
                    <p>Position: Defender</p>
                    <p>Number: 5</p>
                </div>
                {/* Add more player profiles */}
            </div>
        </section>
    </div>
);

export default FootballPage;
