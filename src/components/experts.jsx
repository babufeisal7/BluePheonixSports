import React from 'react';

// Define CSS classes for reuse
const cardClasses = "bg-card p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105";
const textPrimaryClasses = "text-primary";
const textMutedClasses = "text-muted-foreground";
const linkClasses = "text-primary hover:text-primary/80 transition-colors";

// ExpertCard Component
const ExpertCard = ({ name, role, imgSrc }) => (
    <div className={cardClasses}>
        <img className="w-full h-48 object-cover rounded-t-lg" src={imgSrc} alt={name} />
        <h3 className={`text-xl font-semibold mt-3 ${textPrimaryClasses}`}>{name}</h3>
        <p className={textMutedClasses}>{role}</p>
        <div className="flex space-x-3 mt-3">
            <a href="#" className={linkClasses}>Facebook</a>
            <a href="#" className={linkClasses}>Twitter</a>
            <a href="#" className={linkClasses}>LinkedIn</a>
        </div>
    </div>
);

// Experts Component
const Experts = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className={`text-4xl font-bold text-center ${textPrimaryClasses} mb-4`}>Meet Our Experts</h2>
            <p className={`text-center ${textMutedClasses} mb-10`}>SportsMI Sports Academy has a rich history dating back to the XX century, evolving from a cricket academy to hosting soccer tournaments.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ExpertCard name="Mariah Tal" role="Sportser" imgSrc="https://placehold.co/300x200" />
                <ExpertCard name="Jerome Bell" role="Sportser" imgSrc="https://placehold.co/300x200" />
                <ExpertCard name="Guy Hawkins" role="Sportser" imgSrc="https://placehold.co/300x200" />
                <ExpertCard name="Savannah Nguyen" role="Sportser" imgSrc="https://placehold.co/300x200" />
            </div>
        </div>
    );
};

export default Experts;
