import '../App.css';
import { Link } from 'react-router-dom';
import ItemFilter from './ItemFilter';

const Items = () => {
    return (
        <div className="Items">
          <ItemFilter/>
        </div>
    )
}

export default Items;