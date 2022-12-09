import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Context from './Context';
import config from '../config';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, setMyItems, setCurrentFilter } = useContext(Context);
  let navigate = useNavigate;

  useEffect(() => {
    if (document.cookie || isLoggedIn) {
      setCurrentUser(document.cookie.split('=')[1]);
      setCurrentFilter(1);
    } else {
      setCurrentFilter(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (document.cookie) {
      document.cookie.split('=')[0] === 'Zinven' && setIsLoggedIn(true);
    }
  },[]);

  const logout = () => {
    document.cookie = `Zinven=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setCurrentUser('');
    setCurrentFilter(0);
    setMyItems([]);
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
      <div className="Header">
        <Link to={'/'} className="Header-Title">Zinven</Link>
        {currentUser && (<div className="Header-Greeting">Hello {currentUser} 🙂</div>)}
        {isLoggedIn ?
          (<Link to={'/'} className="Header-Logout" onClick={() => logout()}>Logout</Link>)
        :
          (<Link to={'/Login'} className="Header-Login">Login</Link>)
        }
      </div>
  );
}

export default Header;