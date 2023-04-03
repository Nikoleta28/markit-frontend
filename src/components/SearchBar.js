import React from "react";



const handleSearch= (e) =>{
    e.preventDefault();
}

function SearchBar(){
    return(
     <form class="search_area ">
        <label class="labelSearch">
            <button id="searchBarBtn" onClick={handleSearch}>
              <svg width="25" height="25" viewBox="0 0 24 24">
              <path fill="#FFFFFF" d="M10.77 18.3a7.53 7.53 0 1 1 7.53-7.53a7.53 7.53 0 0 1-7.53 7.53Zm0-13.55a6 6 0 1 0 6 6a6 6 0 0 0-6-6Z"/>
              <path fill="#FFFFFF" d="M20 20.75a.74.74 0 0 1-.53-.22l-4.13-4.13a.75.75 0 0 1 1.06-1.06l4.13 4.13a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22Z"/>
              </svg>
            </button>
            <input type="text" placeholder="Αναζήτηση"/> 
        </label> 
      </form>
    )
}

export default SearchBar;