import '../App.css';
import { Link } from 'react-router-dom';

const ItemFilter = () => {
    return (
        <div className="Item-Filter">
          <button className="All-Items">All Items</button>
          <button className="My-Items">My Items</button>
          <button className="Add-Item">Add Item</button>
        </div>
    )
}

export default ItemFilter;