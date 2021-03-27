import "./App.css";
import { useState, useEffect, useMemo } from "react";
import SearchBar from "./components/search-bar";
import SearchResultsList from "./components/search-result-list";
import NomineeList from "./components/nominees";
import Notifications from "./components/notifications";

const addToTheLocalStorage = (key, value) => {
  const valueStringify = JSON.stringify(value);
  localStorage.setItem(key, valueStringify);
};

const getFromTheLocalStorage = (key) => {
  const retrieveData = localStorage.getItem(key);
  return JSON.parse(retrieveData);
};

const fetchData = async (value) => {
  return fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&type=movie&s=${value}`)
    .then((res) => res.json())
    .then((res) => res.Search)
    .catch((err) => console.error(err));
};

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [nominatedList, setNominatedList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  //Fetch data from the localStorage if exist
  useEffect(() => {
    const savedNominationList = getFromTheLocalStorage("movie-nominations");
    if (savedNominationList) {
      setNominatedList(savedNominationList);
    }
  }, []);

  //Add data to the local storage when the tab closses.
  useEffect(() => {
    addToTheLocalStorage("movie-nominations", nominatedList);
  }, [nominatedList]);

  //Display search results after filtering it with the nominated list
  const filteredResults = useMemo(() => {
    if (nominatedList && searchResult) {
      return searchResult.map((el) => {
        nominatedList.forEach((nominated) => {
          if (nominated.imdbID === el.imdbID) {
            el = { ...el, added: true };
          }
        });
        return el;
      });
    }
  }, [nominatedList, searchResult]);

  const handleSearchVal = (e) => {
    let val = e.target.value;
    setSearchVal(val);
    fetchData(val).then((res) => setSearchResult(res));
  };

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const timeOut = setTimeout(() => {
        onNotificationClose(-1);
      }, 1200);
      return () => clearTimeout(timeOut);
    }
  }, [notifications]);

  const addeNotification = (text) => {
    let newArray = [text, ...notifications];
    setNotifications(newArray);
  };

  const onNominate = (movieObj) => {
    if (nominatedList && nominatedList.length === 5) {
      const message = "You can only nominate five movies";
      return notifications[0] === message ? null : addeNotification(message);
    }
    setNominatedList([...nominatedList, movieObj]);
    addeNotification(`Added ${movieObj.Title} to your nominations`);
  };

  const onRemove = (movieObj) => {
    let nominatedArray = nominatedList.filter((el) => {
      return el.imdbID !== movieObj.imdbID;
    });
    setNominatedList(nominatedArray);
    addeNotification(`Removed ${movieObj.Title} from your nominations`);
  };

  const onNotificationClose = (index) => {
    const newArr = [...notifications];
    newArr.splice(
      newArr.findIndex((i) => i === index),
      1
    );
    return setNotifications(newArr);
  };
  return (
    <div className="App">
      <h2>The Shoppies</h2>
      <SearchBar value={searchVal} onChange={handleSearchVal} />
      <div className="lists">
        <SearchResultsList
          results={filteredResults}
          searchVal={searchVal}
          onNominate={onNominate}
        />
        <NomineeList results={nominatedList} onRemove={onRemove} />
      </div>
      <Notifications
        notificationList={notifications}
        onClose={onNotificationClose}
      />
    </div>
  );
}

export default App;
