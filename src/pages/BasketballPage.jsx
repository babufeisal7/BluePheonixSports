import React from 'react';

const BasketballPage = () => (
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Basketball Team</h1>
        
        {/* Team Profile */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Profile</h2>
            <p>Our Basketball Team excels in skill and strategy. We are committed to developing players and achieving high performance.</p>
            <img src="/basketball-team-photo.jpg" alt="Basketball Team" className="w-full h-64 object-cover rounded-lg mb-4" />
        </section>

        {/* Team Stats */}
        <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team Stats</h2>
            <ul className="list-disc ml-6">
                <li><strong>Wins:</strong> 22</li>
                <li><strong>Losses:</strong> 6</li>
                <li><strong>Draws:</strong> 2</li>
                <li><strong>Top Scorer:</strong> Lisa Adams (30 points per game)</li>
                <li><strong>Best Playmaker:</strong> David Wilson</li>
            </ul>
        </section>

        {/* Team Members */}
        <section>
            <h2 className="text-3xl font-semibold mb-2">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player5.jpg" alt="Player 1" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Lisa Adams</h3>
                    <p>Position: Guard</p>
                    <p>Number: 23</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src="/player6.jpg" alt="Player 2" className="w-32 h-32 object-cover rounded-full mb-4" />
                    <h3 className="text-xl font-semibold mb-2">David Wilson</h3>
                    <p>Position: Forward</p>
                    <p>Number: 7</p>
                </div>
                {/* Add more player profiles */}
            </div>
        </section>
    </div>
);

export default BasketballPage;
