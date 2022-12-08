import '../App.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const Submit = () => {

  }


    return (
        <div className="Login">
          LOGIN<br/>
          <div className="Login-Container">
            <div className="Login-Entry">
              <input className="Login-Field-User" type="text" placeholder="Username"/>
              <input className="Login-Field-Pass" type="password" placeholder="Password"/>
            </div>
            <div className="Login-Submit-Button">Go</div>
          </div>
          <Link to={'/Onboard'}>Create an Account</Link>
        </div>
    )
}

export default Login;