// Logo.jsx

import React from 'react';
import './Logo.scss'; // Import the modified SCSS file

const Logo = () => {
  return (
    <div className="logo">
      <img
        src="https://omniterasoft.com/assets/images/omnitera-logo1.png" // Replace with your logo URL
        alt="Logo"
        className="logo-img"
      />
    </div>
  );
};

export default Logo;
