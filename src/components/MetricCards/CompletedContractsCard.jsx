// CompletedContractsCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CompletedContractsCard.css';

const CompletedContractsCard = ({ count }) => {
  return (
    <div className="active-vendors-card completed-contracts-card">
      <Link to="/expired-contracts">
        <h2 className="metric-title">Expired Contracts</h2>
        <span className="metric-value">{count}</span>
      </Link>
    </div>
  );
};

export default CompletedContractsCard;