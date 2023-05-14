import './Searchbar.css';
import React from 'react';

function Searchbar() {
  return (
    <div className="Searchbar">
      <div className="search-container">
      <form>
        <input type="text" placeholder="Search..."/>
        <button type="submit">Search</button>
      </form>
      </div>
    </div>
  );
}

export default Searchbar;