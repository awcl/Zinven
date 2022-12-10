import './App.css';
import Header from './Components/Header';
import Items from './Components/Items';
import Details from './Components/Details'
import Login from './Components/Login';
import Onboard from './Components/Onboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Context from './Components/Context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const [currentFilter, setCurrentFilter] = useState(3);
  const [allItems, setAllItems] = useState([]);

  return (
    <div className="App">
      <Context.Provider value={{isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, currentFilter,
        setCurrentFilter, allItems, setAllItems, currentId, setCurrentId}}>
        <Router>
          <Header />
          <div className="Content">
            <Routes>
              <Route path="/Home" element={<Items />} />
              <Route path="/Details/:id" element={<Details />} />
              <Route path="/" element={<Login />} />
              <Route path="/Onboard" element={<Onboard />} />
              </Routes>
          </div>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
