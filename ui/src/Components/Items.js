import '../App.css';
import ItemFilter from './ItemFilter';
import Context from './Context';
import React, { useContext, useEffect } from 'react';
import config from '../config';
import New from './New';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Items = () => {
  const { isLoggedIn, currentUser, currentFilter, allItems, setAllItems, myItems, setMyItems } = useContext(Context);

  useEffect(() => {
    fetch(`${API_URL}/items/merged`)
      .then(res => res.json())
      .then(items => setAllItems(items))
      .then(items => {
        let filter = []
        for (let i = 0; i < allItems.length; i++) {
          if (allItems[i].username === currentUser) {
            filter.push(allItems[i]);
          }
        }
        setMyItems(filter);
      })
      .catch(e => console.log(e))
  }, [currentFilter]);

    return (
        <div className="Items">
          <ItemFilter/>
          <div className="Item-Display">
            {currentFilter === 0 && (<p>ALL</p>)}
            {currentFilter === 1 && (<p>MINE</p>)}
            {currentFilter === 2 && (<New/>)}
          </div>
        </div>
    )
}

export default Items;