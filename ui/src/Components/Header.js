import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Context from './Context';
import config from '../config';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, setMyItems, setCurrentFilter } = useContext(Context);
  let navigate = useNavigate;

  useEffect(() => {
    if (document.cookie) {
      setCurrentUser(document.cookie.split('=')[1]);
      setCurrentFilter(1);
      setIsLoggedIn(true);
    } else {
      setCurrentFilter(0);
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

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
        <Link to={'/Home'} className="Header-Title" >Zinven</Link>
        {currentUser && (<div className="Header-Greeting">Hello {currentUser} 🙂</div>)}
        {isLoggedIn ?
          (<Link to={'/'} className="Header-Logout" onClick={() => logout()}>Logout</Link>)
        :
          (<Link to={'/'} className="Header-Login">Login</Link>)
        }
      </div>
  );
}

export default Header;