import '../App.css';
import ItemFilter from './ItemFilter';
import Context from './Context';
import React, { useContext, useEffect } from 'react';
import config from '../config';
import New from './New';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
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

  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];



    return (
        <div className="Items">
          <ItemFilter/>
          <div className="Item-Display">
          <DataGrid rows={rows} columns={columns} />
            {currentFilter === 0 && (<p>ALL</p>)}
            {currentFilter === 1 && (<p>MINE</p>)}
            {currentFilter === 2 && (<New/>)}
          </div>
        </div>
    )
}

export default Items;