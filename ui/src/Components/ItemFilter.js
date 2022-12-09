import '../App.css';
import Context from './Context';
import React, { useContext, useEffect } from 'react';

const ItemFilter = () => {
  const { isLoggedIn, setCurrentFilter } = useContext(Context);

  return (
    <>
      {isLoggedIn &&
        <div className="Item-Filter">
            <button id="all" className="All-Items" onClick={() => setCurrentFilter(0)}>All Items</button>
            <button id="mine" className="My-Items" onClick={() => setCurrentFilter(1)}>My Items</button>
            <button className="Add-Item" onClick={() => setCurrentFilter(2)}>Add Item</button>
        </div>
      }
    </>
  )
}

export default ItemFilter;