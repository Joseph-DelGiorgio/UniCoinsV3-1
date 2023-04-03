import React, { useState } from 'react';

const FilterOptions = ({ filterAndSortProjects }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSortOrder, setSelectedSortOrder] = useState('asc');

  // Add more filter and sorting options here if needed
  const categories = ['', 'Web Development', 'Mobile Development', 'Data Science', 'AI'];
  const sortOrders = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  const handleApplyFilter = () => {
    filterAndSortProjects(selectedCategory, selectedSortOrder);
  };

  return (
    <div className="filter-options">
      <label htmlFor="categoryFilter">Category:</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category || 'All Categories'}
          </option>
        ))}
      </select>

      <label htmlFor="sortOrder">Sort Order:</label>
      <select
        id="sortOrder"
        value={selectedSortOrder}
        onChange={(e) => setSelectedSortOrder(e.target.value)}
      >
        {sortOrders.map((order) => (
          <option key={order.value} value={order.value}>
            {order.label}
          </option>
        ))}
      </select>

      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterOptions;
