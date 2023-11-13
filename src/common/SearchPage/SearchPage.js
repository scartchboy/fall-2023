

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchPage.css';

import Loader from '../loader/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';



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
    axios({
      url: `https://ce98-128-82-60-252.ngrok-free.app/api/v1/elastic/searchDocs?query=${searchTerm}&from=0&size=10`,
      method: "GET",
    }).then(res => {
      console.log(res);
      if (res.status == 200) {
        setSearchResults(res.hits.hits)
      }
    }).catch(e => {
      toast.error(`following error occured ${e}`, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    })
    setIsLoading(false);
  };

  useEffect(() => {
  }, [searchResults]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const renderCards = () => {
    if (isLoading) {
      return <Loader />; // Show loader when loading
    }

    if (searchResults.length === 0) {
      return <div className="no-results"><h2>No Results Found</h2></div>;
    }

    return (
      <div className="card-grid">
        {searchResults.map(item => (
          <div key={item._id} className="card">
            <h3>{item.highlight.abstract[0]}</h3>
            <p>{item._source.program}</p>
            <p>Author: {item._source.author}</p>
            <button className="download-button">More..</button>
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
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      {renderCards()}
    </div>
  );
};

export default SearchPage;


