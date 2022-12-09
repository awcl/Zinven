import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import Context from './Context';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useContext(Context);
  let navigate = useNavigate;

  useEffect(() => {
    document.cookie && setCurrentUser(document.cookie.split('=')[1])
    console.log(currentUser);
  }, [isLoggedIn]);

  useEffect(() => {
    if (document.cookie) {
      document.cookie.split('=')[0] === 'Zinven' && setIsLoggedIn(true);
    }
    console.log(currentUser);
  },[]);

  const logout = () => {
    document.cookie = `Zinven=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    setCurrentUser('');
    setIsLoggedIn(false);
    // navigate('/');
    // flush cookie if written
    // default view to all items
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