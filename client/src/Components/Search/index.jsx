import { React, useEffect, useState } from "react";
import "./Search.scss";

const SearchBar = ({ fetchQueriedMovies, setLoaderState }) => {
  const [inputSearchTitle, setInputSearchTitle] = useState("");

  useEffect(() => {
    const titleDelayFn = setTimeout(() => {
      if (inputSearchTitle) {
        setTimeout(() => {
          setLoaderState(true);
          fetchQueriedMovies(inputSearchTitle.trim().toLowerCase());
          setLoaderState(false);
        }, 2000);
      }
    }, 800);

    return () => clearTimeout(titleDelayFn);
  }, [inputSearchTitle]);

  const handleOnChange = (event) => {
    const searchTitle = event.target.value.toLowerCase();
    if (searchTitle === "") setInputSearchTitle("avenger");
    else setInputSearchTitle(searchTitle);
  };

  return (
    <>
      <div className="search-box">
        <label>Search for movie </label>
        <input
          className="search-input"
          type="text"
          placeholder="Enter movie name"
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
