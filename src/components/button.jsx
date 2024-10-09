import React from 'react';

const buttonStyle = {

    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '@media (max-width: 640px)': { // Responsive padding for small screens
        padding: '0.4rem 0.8rem',
    },
    '@media (min-width: 640px) and (max-width: 768px)': { // Responsive padding for medium screens
        padding: '0.5rem 1rem',
    },
    '@media (min-width: 768px)': { // Responsive padding for large screens
        padding: '0.5rem 1.2rem',
    },
};

const hoverStyle = {
    backgroundColor: '#d0801a', // Slightly darker shade
};

const Button = () => {
    return (
        <button
            style={buttonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        >
            Get Involved
        </button>
    );
};

export default Button;
