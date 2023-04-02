import React, { useState } from 'react';

const SearchBar = ({ searchProjects }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    searchProjects(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search projects"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
