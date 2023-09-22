import React from 'react';
import styles from './SearchSort.module.css';

const SearchSort = ({ searchTerm, onSearch, onSort }) => {

  const handleSearchChange = (event) => {
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
        <option value="default">Default Sort</option>
        <option value="date">Newest Mesos First</option>
        <option value="status">Incomplete Mesos First</option>
      </select>
    </div>
  );
};

export default SearchSort;