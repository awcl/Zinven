import '../App.css';
import { Link } from 'react-router-dom';

const Onboard = () => {
  const trim = (e) => {
    e.target.value = e.target.value.trim();
  }


  const createSubmit = (e) => {
    e.preventDefault();
    let first = e.target.first.value;
    let last = e.target.last.value;
    let user = e.target.user.value;
    let passOne = e.target.passone.value;
    let passTwo = e.target.passtwo.value;

    if (first === '' || last === '' || user === '' || passOne === '' || passTwo === '')
    {
      window.alert(`You've left a field blank 🙁`);
    } else if (passOne !== passTwo) {
      window.alert(`You're passwords don't match eachother 🙁`);
    } else if (!(/^[a-z]+(-[a-z]+)*$/i).test(first) || !(/^[a-z]+(-[a-z]+)*$/i).test(last)) {
      window.alert(`Your first and last names can only contain English letters and a single hyphen between letters 🙁`);
    } else if (!(/^\w+$/).test(user)) {
      window.alert(`Your username can only be alphanumeric 🙁`);
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
          <input id="first" className="Onboard-Field-First" type="text" placeholder="First Name" onBlur={(e) => trim(e)}/>
          <input id="last" className="Onboard-Field-Last" type="text" placeholder="Last Name"  onBlur={(e) => trim(e)}/>
          <input id="user" className="Onboard-Field-User" type="text" placeholder="Username"  onBlur={(e) => trim(e)}/>
          <input id="passone" className="Onboard-Field-Pass" type="password" placeholder="Password" />
          <input id="passtwo" className="Onboard-Field-Pass" type="password" placeholder="Reenter Password" />
          <div className="Visibility-Container"><input id="visible" className="Field-Visibility" type="checkbox" onClick={() => visibility()} />Show Password<div id="Password-Requirements" className="Password-Requirements" onClick={() => window.alert('Your password must:\n    - Only contain English letters\n    - Be greater than 8 characters in length\n    - Contain a number\n    - Contain an uppercase letter\n    - Contain a lowercase letter\n    - Contain one of the following special characters ! @ # $ % ^ & *')}>Secure Password Requirements</div></div>
        </div>
        <button className="Onboard-Submit-Button">Create</button>
      </form>
    </div>
  )
}
// table.increments();
// table.string('first_name', 50).notNullable();
// table.string('last_name', 50).notNullable();
// table.string('username', 50).notNullable().unique();
// table.string('password_hash', 60).notNullable(); // Max user password string of 72 presses to 60 chars
export default Onboard;