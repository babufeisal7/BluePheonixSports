import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { to: '#', icon: 'fas fa-bars', label: null },
    { to: '/', label: 'Home' },
  ];

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link className="nav-link" to={item.to}>
              {item.icon && <i className={item.icon} />}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
