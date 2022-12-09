import '../App.css';
import Context from './Context';
import React, { useContext } from 'react';

const ItemFilter = () => {
  const { isLoggedIn, setCurrentFilter } = useContext(Context);

  return (
    <>
      {isLoggedIn &&
        <div className="Item-Filter">
            <button className="All-Items" onClick={() => setCurrentFilter(0)}>All Items</button>
            <button className="My-Items" onClick={() => setCurrentFilter(1)}>My Items</button>
            <button className="Add-Item" onClick={() => setCurrentFilter(2)}>Add Item</button>
        </div>
      }
    </>
  )
}

export default ItemFilter;