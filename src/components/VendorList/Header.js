import React, { useState } from 'react';

const Header = ({ setIsAdding, setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header>
      <h1>Partner's List</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <div>
          <input
            type="text"
            placeholder="Search by ID, Email, or Phone Number"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button onClick={() => setIsAdding(true)}>Add</button>
      </div>
    </header>
  );
};

export default Header;
