import '../App.css';
import { Link } from 'react-router-dom';
import Context from './Context';
import React, { useState, useContext, useEffect } from 'react';

const ItemFilter = () => {
  const { isLoggedIn } = useContext(Context);


  return (
    <>
      {isLoggedIn &&
        <div className="Item-Filter">
          <div className="Filter-Container">
            <button className="All-Items">All Items</button>
            <button className="My-Items">My Items</button>
            <button className="Add-Item">Add Item</button>
          </div>
        </div>
      }
    </>
  )
}

export default ItemFilter;