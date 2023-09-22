import React, { useState } from 'react';
import styles from './SearchSort.module.css';

const SearchSort = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSortChange = (sortOption) => {
    onSort(sortOption);
  };

  return (
    <div className={styles.SearchSortContainer}>
      <input
        type="text"
        placeholder="Search mesocycles..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.SearchInput}
      />
      <select onChange={(e) => handleSortChange(e.target.value)} className={styles.SortDropdown}>
        <option value="default">Sort by...</option>
        <option value="date">Creation Date</option>
        <option value="status">Completion Status</option>
      </select>
    </div>
  );
};

export default SearchSort;