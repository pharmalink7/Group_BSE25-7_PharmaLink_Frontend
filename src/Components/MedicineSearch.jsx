import React, { useState, useEffect } from 'react';
import '../styles/MedicineSearch.css';

const MedicineSearch = ({ 
  onSearch, 
  onCategoryFilter, 
  categoryFilter, 
  onClearFilters, 
  searchQuery 
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  // Sync local state with parent prop when it changes externally
  useEffect(() => {
    setLocalSearchQuery(searchQuery || '');
  }, [searchQuery]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'pain-relief', label: 'Pain Relief' },
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'vitamins', label: 'Vitamins' },
    { value: 'cold-flu', label: 'Cold & Flu' },
    { value: 'digestive', label: 'Digestive Health' },
    { value: 'heart', label: 'Heart Health' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'other', label: 'Other' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    // Trigger search as user types (real-time search)
    // Only search if there's a value or if clearing (empty string)
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onCategoryFilter(category);
  };

  return (
    <div className="medicine-search">
      <div className="search-container">
              <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleInputChange}
              placeholder="Search for medicines, manufacturers, or symptoms..."
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Search
            </button>
          </div>
        </form>

        <div className="filters-section">
          {/* <div className="filter-group">
            <label htmlFor="category-filter">Category:</label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div> */}

          {(searchQuery || categoryFilter) && (
            <button onClick={onClearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="search-suggestions">
        <h4>Popular Searches:</h4>
        <div className="suggestion-tags">
          {['Paracetamol', 'Amoxicillin', 'Vitamin D', 'Ibuprofen', 'Aspirin', 'Cough Syrup'].map(term => (
            <button
              key={term}
              onClick={() => {
                setLocalSearchQuery(term);
                onSearch(term);
              }}
              className="suggestion-tag"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineSearch;
