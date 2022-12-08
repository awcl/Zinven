import '../App.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const Submit = (e) => {
    e.preventDefault();
    console.log(e.target.user.value, ' // ', e.target.pass.value);

  }


    return (
        <div className="Login">
          LOGIN<br/>
          <form className="Login-Container" onSubmit={(e) => Submit(e)}>
            <div className="Login-Entry">
              <input id="user" className="Login-Field-User" type="text" placeholder="Username"/>
              <input id="pass" className="Login-Field-Pass" type="password" placeholder="Password"/>
              <div className="Visibility-Container"><input id="visible" className="Login-Field-Visibility" type="checkbox"/>Show Password</div>
            </div>
            <button className="Login-Submit-Button">Go</button>
          </form>
          <Link to={'/Onboard'}>Create an Account</Link>
        </div>
    )
}

export default Login;