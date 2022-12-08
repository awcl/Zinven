import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
          <Link to={'/'}>Hello</Link>
        </div>
    )
}

export default Home;