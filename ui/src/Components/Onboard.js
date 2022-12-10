import '../App.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import Context from './Context';
import React, { useState, useContext, useEffect } from 'react';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Onboard = () => {
  const [usernameList, setUsernameList] = useState([]);
  const { setIsLoggedIn, setCurrentFilter } = useContext(Context);
  let passwordReqs = 'Your password must:\n    - Only contain English letters\n    - Be inclusively between 8 and 72 characters in length\n    - Contain at least 1 number\n    - Contain at least 1 uppercase letter\n    - Contain at least 1 lowercase letter\n    - Contain at least 1 of the following special characters ! @ # $ % ^ & *';
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/usernames`)
      .then((response) => response.json())
      .then((data) =>
        setUsernameList(data.map(item => item.username))
        ).catch(e => console.log(e));
}, []);

const trim = (e) => {
  e.target.value = e.target.value.trim();
}

const createSubmit = async (e) => {
  e.preventDefault();
  let first = e.target.first.value;
  let last = e.target.last.value;
  let user = e.target.user.value;
  let passOne = e.target.passone.value;
  let passTwo = e.target.passtwo.value;

  if (first === '' || last === '' || user === '' || passOne === '' || passTwo === '') {
    window.alert(`You've left a field blank 🙁`);
  } else if (passOne !== passTwo) {
    window.alert(`You're passwords don't match eachother 🙁`);
  } else if (!(/^[a-z]+(-[a-z]+)*$/i).test(first) || !(/^[a-z]+(-[a-z]+)*$/i).test(last)) {
    window.alert(`Your first and last names can only contain English letters and a single hyphen between letters 🙁`);
  } else if (!(/^\w+$/).test(user)) {
    window.alert(`Your username can only be alphanumeric 🙁`);
  } else if (first.length > 50 || last.length > 50 || user.length > 50) {
    window.alert(`First, Last, and Username fields cannot exceed 50 characters 🙁`);
  } else if ((passOne.length < 8 && passTwo.length < 8) || (passOne.length > 72 && passTwo.length > 72)) {
    window.alert(`Your password must inclusively be between 8 and 72 characters 🙁`);
  } else {
    if (usernameList.indexOf(user) !== -1) {
      window.alert(`Your username has already been taken 🙁`);
      console.log(usernameList.indexOf(user));
      console.log(user);
      console.log(usernameList)
    } else {
      var res = await fetch (`${API_URL}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: first,
          last_name: last,
          username: user,
          password: passOne
        })
      }).catch(e => window.alert(e))

      if (res.status === 201) {
        document.cookie = `Zinven=${user}; Path=/;`;
        setIsLoggedIn(true);
        setCurrentFilter(1);
        navigate('/Home');
      }
    }
  }
}

const visibility = () => {
  if (document.getElementById('visible').checked) {
    document.getElementById('passone').type = 'text';
    document.getElementById('passtwo').type = 'text';
  } else {
    document.getElementById('passone').type = 'password';
    document.getElementById('passtwo').type = 'password';
  }
}

return (
  <div className="Onboard">
    <form className="Onboard-Container" onSubmit={(e) => createSubmit(e)}>
      <div className="Onboard-Entry">
        <input id="first" className="Onboard-Field-First" type="text" placeholder="First Name" onBlur={(e) => trim(e)} />
        <input id="last" className="Onboard-Field-Last" type="text" placeholder="Last Name" onBlur={(e) => trim(e)} />
        <input id="user" className="Onboard-Field-User" type="text" placeholder="Username" onBlur={(e) => trim(e)} />
        <input id="passone" className="Onboard-Field-Pass" type="password" placeholder="Password" />
        <input id="passtwo" className="Onboard-Field-Pass" type="password" placeholder="Reenter Password" />
        <div className="Visibility-Container">
          <input id="visible" className="Field-Visibility" type="checkbox" onClick={() => visibility()} />
          Show Password
          <div id="Password-Requirements" className="Password-Requirements" onClick={() => window.alert(passwordReqs)}>
            Secure Password Requirements
          </div>
        </div>
      </div>
      <button className="Onboard-Submit-Button">Create</button>
    </form>
  </div>
)
}

export default Onboard;