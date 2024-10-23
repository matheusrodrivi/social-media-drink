import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSearch(query);
//   };

  return (
    <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar drink"
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;