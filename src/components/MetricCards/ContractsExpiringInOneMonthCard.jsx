// ContractsExpiringInOneMonthCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ContractsExpiringInOneMonthCard.css';

const ContractsExpiringInOneMonthCard = ({ count }) => {
  return (
    <div className="active-vendors-card completed-contracts-card">
      <Link to="/expiring-in-one-month">
        <h2 className="metric-title">Contracts Expiring in One Month</h2>
        <span className="metric-value">{count}</span>
      </Link>
    </div>
  );
};

export default ContractsExpiringInOneMonthCard;
