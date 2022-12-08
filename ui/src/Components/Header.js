import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import Context from './Context';

const Header = () => {
  const navigate =useNavigate();
  let bool = true;
  return (
      <div className="Header">
        <Link to={'/'} className="Header-Title">Zinven</Link>
        {bool ?
          (<Link to={'/Login'} className="Header-Login">Login</Link>)
        :
          (<Link to={'/Login'} className="Header-Logout">Logout</Link>)
        }
      </div>
  );
}

export default Header;