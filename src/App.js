import './App.css';
import { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/search-bar';
import SearchResultsList from './components/search-result-list';
import NomineeList from './components/nominees';
import Notifications from './components/notifications';

const addToTheLocalStorage = (nList) => {
  const nominations = JSON.stringify(nList)
  localStorage.setItem('movie-nominations',nominations)
}

const getFromTheLocalStorage = () => {
  const retrieveData = localStorage.getItem('movie-nominations')
  const movies = JSON.parse(retrieveData)
  return movies
}

function App() {
  const [searchVal, setSearchVal] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [nominatedList, setNominatedList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  //Fetch Data when the user types in the search field.
  useEffect(() => {
    const fetchData = () => {
      fetch(`http://www.omdbapi.com/?apikey=19b84b80&type=movie&s=${searchVal}`)
      .then(res => res.json())
      .then(res => setSearchResult(res.Search))
      .catch(err => console.error(err))
    }
    fetchData()
  }, [searchVal])

  //Fetch data from the localStorage if exist
  useEffect(() => {
    const savedNominationList = getFromTheLocalStorage()
    if(savedNominationList){
      setNominatedList(savedNominationList)
    }
  },[])

  //Add data to the local storage when the tab closses.
  useEffect(() => {
    window.addEventListener('beforeunload',() => addToTheLocalStorage(nominatedList))
    return () => window.removeEventListener('beforeunload',() => addToTheLocalStorage(nominatedList));
  })

  //Display search results after filtering it with the nominated list
  const sResults = useMemo(() => {
    let results = []
     if(nominatedList && searchResult){
      results =  searchResult.map(el => {
         let movieObj = {...el, added:false}
         nominatedList.map(nominated => {
          if(nominated.imdbID === el.imdbID){
            movieObj = {...movieObj, added:true}
          }
         })
         return movieObj;
       })
     }
     return results
  },[nominatedList,searchResult])

  const handleSearchVal = (e) => {
    setSearchVal(e.target.value)
  }

  useEffect(() => {
    if(notifications && notifications.length > 0){
      const timeOut = setTimeout(() => {
        let newArray = [...notifications]
        newArray.pop()
        setNotifications(newArray)
    },2000)
    return () => clearTimeout(timeOut)
  }
    
  },[notifications])

  const addeNotification = (text) => {
    let newArray = [text,...notifications]
    setNotifications(newArray)
  }

  const onNominate = (movieObj) => {
    if(nominatedList && nominatedList.length === 5){
      return addeNotification('You can only nominate five movies')
    }
    setNominatedList([...nominatedList, movieObj])
    addeNotification(`Added ${movieObj.Title} to your nominations`)
  }

  const onRemove = (movieObj) => {
    let nominatedArray = nominatedList.filter((el) => {
      return el.imdbID !== movieObj.imdbID;
    })
    setNominatedList([...nominatedArray])
    addeNotification(`Removed ${movieObj.Title} from your nominations`)
  }

  const onNotificationClose = (index) => {
    const newArr = [...notifications];
    newArr.splice(newArr.findIndex(i => i === index), 1);
  return setNotifications(newArr)
  }
  return (
    <div className="App">
      <h2>The Shoppies</h2>
      <SearchBar value={searchVal} onChange={handleSearchVal}/>
      <div className="lists">
        <SearchResultsList results={sResults} searchVal={searchVal}  onNominate={onNominate} />
        <NomineeList results={nominatedList} onRemove={onRemove}/>
      </div>
      <Notifications notificationList={notifications} onClose={onNotificationClose}/>
    </div>
  );
}

export default App;
