import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import logo from "../assets/images/logo.jpg";
import { FaBars, FaTimes, FaChevronDown, FaUser } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleDropdown = useCallback((dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    }, [activeDropdown]);

    const closeAll = useCallback(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown") && !event.target.closest(".dropdown-button")) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="bg-blue-800 fixed w-full z-50 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
                        <Link to="/" className="flex flex-shrink-0 items-center mr-4">
                            <img className="h-12 w-auto" src={logo} alt="Blue Phoenix Sports" />
                        </Link>

                        {/* Desktop and Tablet Menu */}
                        <div className="hidden md:flex items-center space-x-2 md:ml-auto">
                            <NavLink to="/" label="Home" />
                            <NavLink to="/Aboutus" label="About Us" />
                            <NavLink to="/services" label="Services" />
                            <NavLink to="/Events" label="Events" />
                            
                            <Dropdown
                                isOpen={activeDropdown === 'programs'}
                                toggleDropdown={() => toggleDropdown('programs')}
                                label="Sports Programs"
                                items={[
                                    { to: "/rugby-program", label: "Rugby" },
                                    { to: "/football-program", label: "Football" },
                                    { to: "/basketball-program", label: "Basketball" },
                                    { to: "/swimming-program", label: "Swimming" },
                                ]}
                                onOptionClick={closeAll}
                            />

                            <Dropdown
                                isOpen={activeDropdown === 'teams'}
                                toggleDropdown={() => toggleDropdown('teams')}
                                label="Teams"
                                items={[
                                    { to: "/teams/rugby", label: "Rugby" },
                                    { to: "/teams/football", label: "Football" },
                                    { to: "/teams/basketball", label: "Basketball" },
                                    { to: "/teams/swimming", label: "Swimming" },
                                ]}
                                onOptionClick={closeAll}
                            />

                            <NavLink to="/gallery" label="Gallery" />
                            <NavLink to="/Blog" label="Blog" />
                            
                            <Link
                                to="/login"
                                className="flex items-center text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200"
                            >
                                <FaUser className="mr-2" /> Login
                            </Link>
                            
                            <Link
                                to="/contactus"
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                            >
                                Contact Us
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="text-white hover:text-orange-300 transition-colors duration-200"
                            aria-label="Login"
                        >
                            <FaUser size={18} />
                        </Link>
                        <button 
                            onClick={toggleMenu}
                            className="text-white hover:text-orange-300 focus:outline-none transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-700 py-4 px-4 space-y-2">
                    <NavLink to="/" label="Home" onClick={closeAll} />
                    <NavLink to="/Aboutus" label="About Us" onClick={closeAll} />
                    <NavLink to="/services" label="Services" onClick={closeAll} />
                    <NavLink to="/Events" label="Events" onClick={closeAll} />

                    <Dropdown
                        isOpen={activeDropdown === 'programs'}
                        toggleDropdown={() => toggleDropdown('programs')}
                        label="Sports Programs"
                        items={[
                            { to: "/rugby-program", label: "Rugby" },
                            { to: "/football-program", label: "Football" },
                            { to: "/basketball-program", label: "Basketball" },
                            { to: "/swimming-program", label: "Swimming" },
                        ]}
                        onOptionClick={closeAll}
                        mobile
                    />

                    <Dropdown
                        isOpen={activeDropdown === 'teams'}
                        toggleDropdown={() => toggleDropdown('teams')}
                        label="Teams"
                        items={[
                            { to: "/teams/rugby", label: "Rugby" },
                            { to: "/teams/football", label: "Football" },
                            { to: "/teams/basketball", label: "Basketball" },
                            { to: "/teams/swimming", label: "Swimming" },
                        ]}
                        onOptionClick={closeAll}
                        mobile
                    />

                    <NavLink to="/gallery" label="Gallery" onClick={closeAll} />
                    <NavLink to="/Blog" label="Blog" onClick={closeAll} />
                    
                    <div className="flex flex-col space-y-2 mt-4">
                        <Link
                            to="/login"
                            className="text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
                            onClick={closeAll}
                        >
                            <FaUser className="mr-2" /> Login
                        </Link>
                        
                        <Link
                            to="/contactus"
                            className="text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-full shadow hover:shadow-md transition-all duration-300 flex items-center justify-center"
                            onClick={closeAll}
                        >
                            Contact Us
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, label, onClick }) => (
    <Link
        to={to}
        className="block text-white hover:bg-blue-600 hover:text-white rounded-md px-3 py-2 transition-colors duration-200"
        onClick={onClick}
    >
        {label}
    </Link>
);

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

const Dropdown = ({ isOpen, toggleDropdown, label, items, onOptionClick, mobile = false }) => (
    <div className={`relative dropdown ${mobile ? 'w-full' : ''}`}>
        <button
            onClick={toggleDropdown}
            className={`w-full text-left text-white hover:bg-blue-600 hover:text-white rounded-md px-3 py-2 flex items-center justify-between dropdown-button transition-colors duration-200 ${mobile ? 'w-full' : ''}`}
            aria-expanded={isOpen}
            aria-label={`Toggle ${label} dropdown`}
        >
            {label}
            <FaChevronDown className={`ml-1 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className={`${mobile ? 'relative' : 'absolute left-1/2 transform -translate-x-1/2'} mt-1 w-full ${mobile ? '' : 'md:w-48'} bg-white shadow-lg rounded-md py-1 z-20`}>
                {items.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition-colors duration-200"
                        onClick={onOptionClick}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        )}
    </div>
);

Dropdown.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onOptionClick: PropTypes.func.isRequired,
    mobile: PropTypes.bool,
};

export default Navbar;