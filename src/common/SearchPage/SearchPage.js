

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchPage.css';

import Loader from '../loader/Loader';


const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Sample Title ${index + 1}`,
  subtitle: `Subtitle ${index + 1}`,
  timestamp: '2023-01-01',
  author: `Author ${index + 1}`,
}));

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call or search logic
    setTimeout(() => {
      const results = mockData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const renderCards = () => {
    if (isLoading) {
      return <Loader/>; // Show loader when loading
    }

    if (searchResults.length === 0) {
      return <div className="no-results"><h2>No Results Found</h2></div>;
    }

    return (
      <div className="card-grid">
        {searchResults.map(item => (
          <div key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <p>Timestamp: {item.timestamp}</p>
            <p>Author: {item.author}</p>
            <button className="download-button">Download Here</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="search-page">
      <h2>Search Here</h2>
      <div className="search-bar-container">
        <div className="search-bar-inner">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      {renderCards()}
    </div>
  );
};

export default SearchPage;


