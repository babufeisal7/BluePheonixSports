// GalleryPage.jsx
import React from 'react';

const cardClasses = 'overflow-hidden rounded-lg shadow-lg';
const imageClasses = 'w-full h-auto';
const buttonClasses = 'mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded';

const CategorySection = ({ title, images }) => (
  <div className="bg-background p-6 mb-8">
    <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className={cardClasses}>
          <img src={image} alt={`${title} Image ${index + 1}`} className={imageClasses} />
        </div>
      ))}
    </div>
    <button className={buttonClasses}>View More</button>
  </div>
);

const GalleryPage = () => {
  // Replace these URLs with your actual image paths
  const rugbyImages = [
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
  ];

  const footballImages = [
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
  ];

  const basketballImages = [
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
  ];

  const swimmingImages = [
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
    'https://placehold.co/400x300.png',
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <CategorySection title="Rugby" images={rugbyImages} />
      <CategorySection title="Football" images={footballImages} />
      <CategorySection title="Basketball" images={basketballImages} />
      <CategorySection title="Swimming" images={swimmingImages} />
    </div>
  );
};

export default GalleryPage;
