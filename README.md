
# Building The Shoppies

This app was created as a part of shopify summer intern challenge. In
this post I will explain how to create a web app using React, React
dom, React Router and Framer motion, we won’t be diving into html nor
css. 
Hope you have some basic understanding of HTML, CSS, JavaScript
and React.js. 😀
Before we dive in, here is a link to the
"https://shoppies.dilum1999.vercel.app/"
live demo
 to get a feel of what we are about to create.
### To get started type 
```
npx create-react-app shoppies
```
This will create some boilerplate code to get started.
Let’s change the folder structure

#### From
```
shoppies 
README.md 
node_modules
package.json
public
  index.html
  favicon.ico
src
  App.css
  App.js
  App.test.js
  index.css
  index.js
 ```
#### To
```
shoppies
README.md
node_modules
package.json
public
  index.html
  favicon.ico
src
  components
    button.js
    nominees.js
    notifications.js
    search-bar.js
    search-result-list.js
  App.css
  App.js
  App.test.js
  index.css
  index.js
 ```
All we did was, we added a new folder called components and added some
files to it in which we will discuss later in this post.
Now that we have the project set up let’s install a few libraries
```npm i framer-motion```

We will be using this to add animations to our app.
```npm i react-icons```
This contains all the common icons.
## Lets start Hacking 😊

### search-bar.js
Our search bar component should have an input field. So here we
go, we have a functional component which has an input field and a
search icon as shown in the picture above. We pass in some props
(onChange method and a value property) which you will see when we
start implementing the App.js file.
```
import { BiSearchAlt } from "react-icons/bi"; 
 const SearchBar = (props) => {
  return (
    <div className="search">
      <BiSearchAlt id="icon" />
      <input type="text" {...props} placeholder="Start typing to search" />
    </div>
  );
};
export default SearchBar;
```
### button.js
Before we dive into the implementation it’s better to understand the requirement on what our button component should have

onClick handler to handle click event
Ability to make the button disable and active
Change the background, and the font color if necessary.

Let's look at our button component. We have passed all the props that we mentioned in the above list so that we can customize this component according to our needs. Next we have an object which we will be using to add inline styles.
The only difference between this button element and a traditional one is here we have used motion.button instead of just button and have two additional properties whileHover and whileTap.
As you remember in the beginning we installed an animation library called framer motion, so all the above mentioned new addons to the button are related to that. I won’t dive deep into this library but I will explain this code to give you an idea of it. So in order to use the features of that library we have to add motion to begin to say that we are using it. In this case it’s motion.button but it can be any valid html element. The methods whileHover and whileTap do exactly what the name says, it fires when hovered and tapped respectively. So all I do in this is scale the size of the button if not disabled.

```
import { motion } from "framer-motion";
const Button = ({ onClick, disable, value, color, bgColor })  => {
  const props = {
    color: color,
    backgroundColor: bgColor,
    cursor: disable ? "default" : "pointer",
    borderColor: bgColor,
  };
  return (
    <motion.button
      whileHover={disable ? "" : { scale: 1.1 }}
      whileTap={disable ? "" : { scale: 0.9 }}
      className="btn"
      disabled={disable}
      onClick={onClick}
      style={props}
    >
      {value}
    </motion.button>
  );
};
export default Button;
```

### search-result-list.js

If we take a look at the above diagram you’ll see this component is responsible for displaying the search results and a button to nominate. That’s what we are gonna do. Take the result of movies and display it.
Looking at the code we can see we have passed a property called results which contains an array of objects, then we have onNominate which will implement in App.js for now it’s the onClick handler for our nominate button. Finally we have serachVal property which is what a user types in the search field (just to display).
The code itself is self explanatory all I do is display the results using map function.

```
import Button from "./button";
const SearchResultsList = ({ results, onNominate, searchVal }) => (
  <div className="m-container">
    {searchVal ? <h4>Results for "{searchVal}"</h4> : <h4>Search Results</h4>}
    {Array.isArray(results) &&
      results.map((el, i) => {
        return (
          <div className="search-result" key={el.imdbID}>
            <p>
              {el.Title} ({el.Year})
            </p>
            <Button
              bgColor={el.added ? "#3B737E" : ""}
              disable={el.added}
              value={el.added ? "Nominated" : "Nominate"}
              onClick={() => onNominate(el)}
            />
          </div>
        );
      })}
  </div>
);
export default SearchResultsList;
```
### nominees.js
This component is similar to the previous one and if we look at our diagram we can see this also displays some movies with a remove button.
Since this is similar to the previous one we are not gonna dive into this.
Suggestion -
Since both nominees.js and search-result.js is somewhat similar you can try to implement one component which can handle both scenarios.

```
import Button from "./button";
const NomineeList = ({ results, onRemove }) => (
  <div className="m-container">
    <h4>Nominations {results ? `${results.length}/5` : ""}</h4>
    {Array.isArray(results) &&
      results.map((el) => {
        return (
          <div className="search-result" key={el.imdbID}>
            <p>
              {el.Title} ({el.Year})
            </p>
            <Button
              bgColor="#252525"
              color="#2CA1C0"
              onClick={() => onRemove(el)}
              value="Remove"
            />
          </div>
        );
      })}
  </div>
);
export default NomineeList;
```

### notifications.js
This component also have some similarities with the above two. All we want is to display notifications with a few animations
This might look a bit unfamiliar if you haven’t used framer-motion but don’t worry I'll give you an overview of what this does. So this has a notificationList which will be passed in and a onClose property if we want to close it. We have wrapped our list of notifications using AnimatePresence. This is used to apply animation not only when mounting a new notification but also on an unmount.

```
import { motion, AnimatePresence } from "framer-motion";
const Notifications = ({ notificationList, onClose }) => (
  <div className="n-container">
    <AnimatePresence initial={false}>
      {Array.isArray(notificationList) &&
        notificationList.map((text, index) => (
          <motion.li
            key={index}
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className="header">
              <motion.button
                onClick={() => onClose(index)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                id="close"
              >
                X
              </motion.button>
            </div>
            <span>{text}</span>
          </motion.li>
        ))}
    </AnimatePresence>
  </div>
);
export default Notifications;
```
### App.js
We are done with all the stateless components ( the dummy ones) here is the bread and butter of this app.

```
import "./App.css"; 
import SearchBar from "./components/search-bar";
import SearchResultsList from "./components/search-result-list";
import NomineeList from "./components/nominees";
import Notifications from "./components/notifications";
function App() {
  ...
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
```
The above code shows the basic final layout of our app and now all we have to do is create the methods we have passed in to each component.

### SearchBar
If we look at the implementation of search-bar.js we can see we need an onChange to handle user input and value property to display user’s input in the search bar. Now let’s look at the implementation.
Here we’ve used a hook provided by react called useSate which we can use to store and update our search bar input.
```
import { useState } from "react"; 
function App() {
  const [searchVal, setSearchVal] = useState("");
  ...
  return (
    ...
      <SearchBar value={searchVal} onChange={handleSearchVal} />
    ...
    )
  }
import { useState } from "react"; 
function App() {
  const [searchVal, setSearchVal] = useState("");
 const handleSearchVal = (e) => {
    let val = e.target.value;
    setSearchVal(val);
  }; ...
  return (
    ...
      <SearchBar value={searchVal} onChange={handleSearchVal} />
    ...
    )
  }
```
This is a simple method to update the above state onChange using the user input.
This completes our SearchBar implementation.

Before we move to the next component we’ll create a few helper methods for our conveniences.
As the name suggests all this method is responsible for is fetching data from the above api to get the movies related to the user's input. Note you will need an api key, you can get one by visiting <a className="external-link" href="http://www.omdbapi.com/">
this website</a>
 and replace ‘YOUR API KEY’ with your key.
```
const fetchData = async (value) => {
  return fetch(`https://www.omdbapi.com/?apikey=${YOUR_API_KEY}&type=movie&s=${value}`)
    .then((res) => res.json())
    .then((res) => res.Search)
    .catch((err) => console.error(err));
};
function App() {
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  ...
  const handleSearchVal = (e) => {
    let val = e.target.value;
    setSearchVal(val);
    fetchData(val).then((res) => setSearchResult(res));
  };
  return (
    ...
      <SearchBar value={searchVal} onChange={handleSearchVal} />
      ...
  );
}
```
Now we have to call this when a user types, which means we can add it to our previously created handleSearchVal method. Also we'll be needing a separate state to store the search results. We’ll call it searchResult.

If you look close at the demo, you’ll find even when you leave or refresh the browser you'll still have your nominated movies saved. All we do here is save the data in your local storage in your browser. You might find it not useful in the context of our app, but we can use the local storage to save users interactions to enhance the user experience.
```
const addToTheLocalStorage = (key, value) => {
  const valueStringify = JSON.stringify(value);
  localStorage.setItem(key, valueStringify);
};
const getFromTheLocalStorage = (key) => {
  const retrieveData = localStorage.getItem(key);
  return JSON.parse(retrieveData);
};
```
```
... 
function App() {
  ...
  const [nominatedList, setNominatedList] = useState([]);
 
 //Fetch data from the localStorage if exist
  useEffect(() => {
    const savedNominationList = getFromTheLocalStorage("movie-nominations");
    if (savedNominationList) {
      setNominatedList(savedNominationList);
    }
  }, []);
 
 //Saving data to the local storage when the tab closses.
  useEffect(() => {
    addToTheLocalStorage("movie-nominations", nominatedList);
  }, [nominatedList]);
  ...
}
```
Here we are using another hook provided by react, useEffect. useEffect takes two arguments, first a callback function on what we want to do and the second is an array to trigger our callback. For example if we pass searchVal (which we have used to save the user’s input) to the array this hook we’ll fire our callback every time user types or in other when the searchVal changes. Here we’ve passed an empty array which we’ll only call our callback at the beginning when the component mounts for the first time.
In our first useEffect hook we are checking if there is any data in our local storage, if we do, we can set it to nominatedList (the state in which we are using to track the selected/nominated movies).
The second useEffect hook we’ll be fired every time when a user nominates a movie in other words when our nominated list changes. We’ll update our local storage with our new list.

### SearchResultsList
If we look at the implementation of SearchResultsList we’ll see we need to pass an array of results to display, user’s search input to display at the top finally a onClick handler for the nominate button. SInce we have serachVal we only need to create filteredResults and onNominate.
What filteredList is responsible for is to get the search results from the api and check if we have it in our nominated list if we do, add a new field called added, so we can tell the user that movie is added and disable the nominate button of that movie.
Here we are using another hook provided by react, useMemo. This has some similarities to useEffect. This hook is used to optimize the performance of our app. Since our filtered list seems to have computation we don’t want that method to run on every render so we limit it by telling react to only trigger if the search result on the nominate list changes and cache it in our memory.
```
...
function App() {
  ...
 
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
  ...
  
 return (
   ...
     <div className="lists">
      <SearchResultsList
       results={filteredResults}
       searchVal={searchVal}
       onNominate={onNominate}
      /> 
}
```

We’ll modify this method later for now we’ll just add the newly nominated movie to our nominatedList.

```
function App() {
  ...
  const onNominate = (movieObj) => {
    setNominatedList([...nominatedList, movieObj]);
  };
  ...
}
```

### NomineeList
All We need for this component is a nominated movie list in this case our nominatedLIst state and onRemove to handle remove button click.
This method will use a filter method to remove the selected movie.
```
function App() {
  ...
  const onRemove = (movieObj) => {
    let nominatedArray = nominatedList.filter((el) => {
      return el.imdbID !== movieObj.imdbID;
    });
    setNominatedList(nominatedArray);
  };
  ...
 return (
   ...
   <div> 
    <NomineeList 
     results={nominatedList} 
     onRemove={onRemove} /> 
   ...
   </div> 
}
```
### Notifications
Here we need is an array of notifications to display and a close button handler to remove one.
Before we create onNotificationClose we’ll have to create a method to add notifications. When do we need to send users a notification? When a movie is added to the list, removed and when the limit is exceeded.
```
function App() {
  const [notifications, setNotifications] = useState([]);
   return (
    <div className="App">
      ...
      <Notifications
        notificationList={notifications}
        onClose={onNotificationClose}
      />
      ...
    </div>
  );
}
```
Here we’ve created addNotifications method and added a notification in our onRemove and onNominate methods.
```
function App() {
  ...
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
  ...
}
```

This will have an index passed and it will remove the selected notification splicing the array.
This method will remove when a user clicks the close button, but we want to remove notifications automatically after a few minutes.
```
const onNotificationClose = (index) => {
    const newArr = [...notifications];
    newArr.splice(
      newArr.findIndex((i) => i === index),
      1
    );
    return setNotifications(newArr);
  };
  ```
  ```
useEffect(() => {
    if (notifications && notifications.length > 0) {
      const timeOut = setTimeout(() => {
        onNotificationClose(-1);
      }, 1200);
      return () => clearTimeout(timeOut);
    }
  }, [notifications]);
  ```
Here we have a useEffect which we set a timeout to remove the last notification after a given number of seconds.

Here we have modified our onNominate method to check if we have nominated five movies and send notification to remind us. We also don’t won’t same message to be more than saw we also check if that message exist in notifications list.
```
const onNominate = (movieObj) => {
    if (nominatedList && nominatedList.length === 5) {
      const message = "You can only nominate five movies";
      return notifications[0] === message ? null : addeNotification(message);
    }
    setNominatedList([...nominatedList, movieObj]);
    addeNotification(`Added ${movieObj.Title} to your nominations`);
  };
  ```
  
  # The End !
