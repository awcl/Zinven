import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import Context from './Context';
import config from '../config';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate('/');
  },[]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    let user = e.target.user.value;
    let pass = e.target.pass.value;

    if (user !== '' && pass !== '')
    {
      let res = await fetch (`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: user, password: pass})
      })
      if (res.status === 200) {
        document.cookie = `Zinven=${user}; Path=/;`;
        setIsLoggedIn(true);
        navigate('/');
        // TODO build cookie for session
      }
    }
  }

    return (
        <div className="Login">
          <form className="Login-Container" onSubmit={(e) => loginSubmit(e)}>
            <div className="Login-Entry">
              <input id="user" className="Login-Field-User" type="text" placeholder="Username"/>
              <input id="pass" className="Login-Field-Pass" type="password" placeholder="Password"/>
              <div className="Visibility-Container"><input id="visible" className="Field-Visibility" type="checkbox" onClick={() => document.getElementById('visible').checked ? document.getElementById('pass').type = 'text' : document.getElementById('pass').type = 'password'}/>Show Password<Link to={'/Onboard'} className="New-Account-Link">New Account</Link></div>
            </div>
            <button className="Login-Submit-Button">Sign In</button>
          </form>
        </div>
    )
}

export default Login;