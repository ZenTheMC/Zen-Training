import React from 'react';
import styles from './SearchSort.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchSort = ({ searchTerm, onSearch, onSort }) => {

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  const handleSortChange = (sortOption) => {
    onSort(sortOption);
  };

  return (
    <div className={styles.SearchSortContainer}>
      <FontAwesomeIcon className={styles.SearchIcon} icon={faSearch}/> 
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.SearchInput}
      />
      <select onChange={(e) => handleSortChange(e.target.value)} className={styles.SortDropdown}>
        <option value="default">Default Sort</option>
        <option value="date">Newest First</option>
        <option value="status">Incomplete First</option>
      </select>
    </div>
  );
};

export default SearchSort;