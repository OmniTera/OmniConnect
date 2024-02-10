// MetricCard.jsx
import React from 'react';
import './MetricCard.css'; // Import CSS file for styling

const MetricCard = ({ title, value }) => {
  return (
    <div className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
};

export default MetricCard;
