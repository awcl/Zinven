import '../App.css';
import ItemFilter from './ItemFilter';
import Context from './Context';
import React, { useState, useContext, useEffect } from 'react';
import config from '../config';
import New from './New';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Items = () => {
  const { isLoggedIn, currentUser, currentFilter, allItems, setAllItems, myItems, setMyItems, setCurrentFilter } = useContext(Context);
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    {field: 'item_id', headerName: 'Item ID', flex: 1, minWidth: 50 },
    {field: 'user_id', headerName: 'User ID', flex: 1, minWidth: 100 },
    {field: 'owner', headerName: 'Owner', flex: 1, minWidth: 100 },
    {field: 'username', headerName: 'Username', flex: 1, minWidth: 100 },
    {field: 'quantity', headerName: 'Quantity', flex: 1, minWidth: 100 },
    {field: 'description', headerName: 'Item Description', flex: 1, minWidth: 100 }
  ];

  useEffect(() => {
    fetch(`${API_URL}/items/merged`)
      .then(res => res.json())
      .then(items => setAllItems(items))
      .then(items => {
        let filter = [];
        let working = [];
        for (let i = 0; i < allItems.length; i++) {
          if (allItems[i].username === currentUser) {
            filter.push(allItems[i]);
          }
        }
        setMyItems(filter);

        if (currentFilter === 0) {
          filter = allItems;
        }

        for (let i = 0; i < filter.length; i++) {
          working.push({
            id: (i + 1),
            item_id: filter[i].id,
            user_id: filter[i].user_id,
            owner: `${filter[i].first_name} ${filter[i].last_name}`,
            username: filter[i].username,
            quantity: filter[i].quantity,
            description: `${filter[i].description.slice(0,100)}...`})
        }
        setRows(working);
      })
      .catch(e => console.log(e))
  }, [currentFilter]);

    return (
        <div className="Items">
          <ItemFilter/>
          <div className="Item-Display">
          {(currentFilter === 0 || currentFilter === 1) &&
          <DataGrid
            onCellDoubleClick={(params, event) => {
              if (!event.ctrlKey) {
                event.defaultMuiPrevented = true;
                console.log(params)
              }
            }}
            getRowHeight={() => 'auto'}
            className="Result-Table"
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            />}
            {currentFilter === 2 && (<New/>)}
          </div>
        </div>
    )
}

export default Items;