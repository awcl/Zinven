import '../App.css';

function Header() {
  let bool = false;
  return (
      <div className="Header">
        <div className="Header-Title">Zinven</div>
        {bool ? (<button className="Header-Login" onClick={(e) => {bool = !bool; console.log(bool)}}>Login</button>) :
        (<button className="Header-Logout" onClick={(e) => {bool = !bool; console.log(bool)}}>Logout</button>)}
      </div>
  );
}

export default Header;