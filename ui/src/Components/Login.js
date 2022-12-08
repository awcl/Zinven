import '../App.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.user.value, ' // ', e.target.pass.value);

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