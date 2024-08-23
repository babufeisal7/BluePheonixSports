import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from 'prop-types';  // Import PropTypes for validation
import logo from "../assets/images/logo.jpg";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
    const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleProgramsDropdown = () => {
        setIsProgramsDropdownOpen(!isProgramsDropdownOpen);
        if (isTeamsDropdownOpen) setIsTeamsDropdownOpen(false);
    };

    const toggleTeamsDropdown = () => {
        setIsTeamsDropdownOpen(!isTeamsDropdownOpen);
        if (isProgramsDropdownOpen) setIsProgramsDropdownOpen(false);
    };

    const closeDropdowns = () => {
        setIsProgramsDropdownOpen(false);
        setIsTeamsDropdownOpen(false);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest(".dropdown") &&
                !event.target.closest(".dropdown-button")
            ) {
                closeDropdowns();
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleOptionClick = () => {
        closeDropdowns();
        setIsOpen(false);
    };

    return (
        <nav className="bg-blue-800 fixed w-full z-50 shadow-md">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
                        <Link to="/" className="flex flex-shrink-0 items-center mr-4">
                            <img className="h-12 w-auto" src={logo} alt="Blue Phoenix Sports" />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-2 md:ml-auto">
                            <NavLink to="/" label="Home" />
                            <NavLink to="/about" label="About Us" />
                            <NavLink to="/#services" label="Services" />
                            <NavLink to="/events" label="Events" />

                            <Dropdown
                                isOpen={isProgramsDropdownOpen}
                                toggleDropdown={toggleProgramsDropdown}
                                label="Sports Programs"
                                items={[
                                    { to: "/sports-programs#rugby", label: "Rugby" },
                                    { to: "/sports-programs#football", label: "Football" },
                                    { to: "/sports-programs#basketball", label: "Basketball" },
                                    { to: "/sports-programs#swimming", label: "Swimming" },
                                ]}
                                onOptionClick={handleOptionClick}
                            />

                            <Dropdown
                                isOpen={isTeamsDropdownOpen}
                                toggleDropdown={toggleTeamsDropdown}
                                label="Teams"
                                items={[
                                    { to: "/teams/rugby", label: "Rugby" },
                                    { to: "/teams/football", label: "Football" },
                                    { to: "/teams/basketball", label: "Basketball" },
                                    { to: "/teams/swimming", label: "Swimming" },
                                ]}
                                onOptionClick={handleOptionClick}
                            />

                            <NavLink to="/gallery" label="Gallery" />
                            <NavLink to="/blog" label="Blog" />
                            <Link
                                to="/join"
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-lg border border-orange-700 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Join Us
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-700 py-4">
                    <NavLink to="/" label="Home" onClick={handleOptionClick} />
                    <NavLink to="/about" label="About Us" onClick={handleOptionClick} />
                    <NavLink to="/#services" label="Services" onClick={handleOptionClick} />
                    <NavLink to="/events" label="Events" onClick={handleOptionClick} />

                    <Dropdown
                        isOpen={isProgramsDropdownOpen}
                        toggleDropdown={toggleProgramsDropdown}
                        label="Sports Programs"
                        items={[
                            { to: "/sports-programs#rugby", label: "Rugby" },
                            { to: "/sports-programs#football", label: "Football" },
                            { to: "/sports-programs#basketball", label: "Basketball" },
                            { to: "/sports-programs#swimming", label: "Swimming" },
                        ]}
                        onOptionClick={handleOptionClick}
                    />

                    <Dropdown
                        isOpen={isTeamsDropdownOpen}
                        toggleDropdown={toggleTeamsDropdown}
                        label="Teams"
                        items={[
                            { to: "/teams/rugby", label: "Rugby" },
                            { to: "/teams/football", label: "Football" },
                            { to: "/teams/basketball", label: "Basketball" },
                            { to: "/teams/swimming", label: "Swimming" },
                        ]}
                        onOptionClick={handleOptionClick}
                    />

                    <NavLink to="/gallery" label="Gallery" onClick={handleOptionClick} />
                    <NavLink to="/blog" label="Blog" onClick={handleOptionClick} />
                    <Link
                        to="/join"
                        className="block text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleOptionClick}
                    >
                        Join Us
                    </Link>
                </div>
            )}
        </nav>
    );
};

// Generic NavLink component with PropTypes
const NavLink = ({ to, label, onClick }) => (
    <Link
        to={to}
        className="block text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
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

// Generic Dropdown component with PropTypes
const Dropdown = ({ isOpen, toggleDropdown, label, items, onOptionClick }) => (
    <div className="relative dropdown">
        <button
            onClick={toggleDropdown}
            className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 flex items-center dropdown-button"
            aria-expanded={isOpen}
            aria-label={`Toggle ${label} dropdown`}
        >
            {label} <FaChevronDown className="ml-1" />
        </button>
        {isOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20 transition-transform duration-300">
                {items.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
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
    items: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onOptionClick: PropTypes.func.isRequired,
};

export default Navbar;
