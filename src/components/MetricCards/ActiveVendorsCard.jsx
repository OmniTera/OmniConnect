// ActiveVendorsCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ActiveVendorsCard.css';

const ActiveVendorsCard = ({ count }) => {
  return (
    <div className="active-vendors-card">
      <Link to="/active-vendors">
        <h2 className="metric-title">Active Contracts</h2>
        <span className="metric-value">{count}</span>
      </Link>
    </div>
  );
};

export default ActiveVendorsCard;