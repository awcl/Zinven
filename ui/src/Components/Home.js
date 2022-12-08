import '../App.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="Home">
          <Link to={'/'}>Hello</Link>
        </div>
    )
}

export default Home;