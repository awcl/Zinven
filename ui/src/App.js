import './App.css';
import Header from './Components/Header';
import Items from './Components/Items';
import Login from './Components/Login';
import Onboard from './Components/Onboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import Context from './Components/Context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const [currentFilter, setCurrentFilter] = useState(-1);
  const [allItems, setAllItems] = useState([]);
  const [myItems, setMyItems] = useState([]);

  return (
    <div className="App">
      <Context.Provider value={{isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, currentFilter,
        setCurrentFilter, allItems, setAllItems, myItems, setMyItems, currentId, setCurrentId}}>
        <Router>
          <Header />
          <div className="Content">
            <Routes>
              <Route path="/" element={<Items />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Onboard" element={<Onboard />} />
              </Routes>
          </div>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
