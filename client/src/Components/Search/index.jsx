import { React, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./Search.scss";
import toast from "react-hot-toast";
import { Button } from "semantic-ui-react"

const SearchBar = ({ fetchQueriedMovies }) => {
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [inputSearchTitle, setInputSearchTitle] = useState("");

  useEffect(() => {
    const titleDelayFn = setTimeout(() => {
      if (inputSearchTitle) {
        addSearchHistory(inputSearchTitle.toLowerCase());
        fetchQueriedMovies(inputSearchTitle.trim().toLowerCase());
      }
    //   fetchQueriedMovies(inputSearchTitle.trim().toLowerCase());
    }, 800);

    return () => clearTimeout(titleDelayFn);
  }, [inputSearchTitle]);

  const getSearchHistoryItems = () =>
    JSON.parse(localStorage.getItem("searchHistory"));

  const updateSearchInput = (searchTitle) => {
    setInputSearchTitle(searchTitle);
    fetchQueriedMovies(searchTitle);
    setShowSearchHistory(!showSearchHistory);
  };

  // render search history on clicking inputbox
  const renderSearchHistory = () => {
    const historyItems = getSearchHistoryItems();
    return historyItems.map((_item) => (
      <li
        className="list-group-item"
        key={_item}
        onClick={() => updateSearchInput(_item)}
      >
        {_item}
      </li>
    ));
  };

  // function to show history if existed on clicking input box
  const showPastSearches = () => {
    if (getSearchHistoryItems()) {
      setShowSearchHistory(!showSearchHistory);
    }
  };

  //storing items in localstorage
  const addSearchHistory = (searchTitle) => {
    const historyItems = getSearchHistoryItems();
    if (!historyItems) {
      localStorage.setItem("searchHistory", JSON.stringify([searchTitle]));
    } else {
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([...new Set([searchTitle, ...historyItems])])
      );
    }
  };

  const handleOnChange = (event) => {
    const searchTitle = event.target.value.toLowerCase();
    if(searchTitle === "")
    setInputSearchTitle("avenger");
    else
    setInputSearchTitle(searchTitle);
  };

  // removing search history
  const clearSearchHistory = () => {
    localStorage.removeItem("searchHistory");
    setShowSearchHistory(false);
    toast.success("Search history cleared!");
  };

  return (
    <>
      <div
      className="search-box"
      onMouseLeave={() => setShowSearchHistory(false)}
      >
        <div className="active-cyan-4 mx-5 my-4">
          <input
            className="search-input"
            type="text"
            placeholder=" Search Photos"
            onClick={showPastSearches}
            onChange={handleOnChange}
            // value={inputSearchTitle}
          />
          <Toaster position="top-right" />
          {showSearchHistory && (
            <div className="card" style={{ border: "none" }}>
              <ul
                className="list-group"
                style={{
                  maxHeight: "250px",
                  marginBottom: "0px",
                  overflow: "scroll",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {renderSearchHistory()}
              </ul>
              <div className="modal-footer px-1 py-1">
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => clearSearchHistory()}
                >
                  clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
