import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.scss';
import Logo from '../Logo/Logo';
import { AuthContext } from '../Login/AuthContext';

const NavigationBar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsSidebarVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarVisible(false);
  };

  const handleLinkClick = (path) => {
    if (!isAuthenticated()) {
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      className={`navbar ${isSidebarVisible ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Logo />
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/vendors" className="navbar-link">Vendor List</Link>
        </li>
        <li className="navbar-item">
          <Link to="/workflow" className="navbar-link">Workflow</Link>
        </li>
        <li className="navbar-item">
          <Link to="/reports" className="navbar-link">Reports</Link>
        </li>
        <li className="navbar-item">
          <Link to="/settings" className="navbar-link">Settings</Link>
        </li>
        {/* No logout button rendered */}
      </ul>
    </nav>
  );
};

export default NavigationBar;
