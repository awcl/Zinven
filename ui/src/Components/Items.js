import '../App.css';
import ItemFilter from './ItemFilter';
import Context from './Context';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import New from './New';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Items = () => {
  const { currentUser, currentFilter, allItems, setAllItems } = useContext(Context);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const [sortModel, setSortModel] = useState([
    {
      field: "item_id",
      sort: "asc"
    }
  ]);

  const columns: GridColDef[] = [
    {field: 'item_id', headerName: 'Item ID', flex: 1, minWidth: 50 },
    {field: 'item_name', headerName: 'Item Name', flex: 1, minWidth: 50 },
    {field: 'description', headerName: 'Item Description', flex: 1, minWidth: 150 },
    {field: 'user_id', headerName: 'User ID', flex: 1, minWidth: 50 },
    {field: 'owner', headerName: 'Owner', flex: 1, minWidth: 50 },
    {field: 'username', headerName: 'Username', flex: 1, minWidth: 50 },
    {field: 'quantity', headerName: 'Quantity', flex: 1, minWidth: 50 },

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
        if (currentFilter === 0) {
          filter = allItems;
        }
        for (let i = 0; i < filter.length; i++) {
          if (filter[i].description.length > 100) {
            filter[i].description = `${filter[i].description.slice(0,100)}...`;
          }
          working.push({
            id: (i + 1),
            item_id: filter[i].id,
            user_id: filter[i].user_id,
            owner: `${filter[i].first_name} ${filter[i].last_name}`,
            username: filter[i].username,
            item_name: filter[i].item_name,
            quantity: filter[i].quantity,
            description: filter[i].description})
        }
        setRows(working);
      })
      .catch(e => console.log(e))
  }, [currentFilter, currentUser]);

    return (
        <div className="Items">
          <ItemFilter/>
          <div className="Item-Display">
          {((currentFilter === 0 || currentFilter === 1) && rows.length) &&
          <DataGrid
            onCellClick={(params, event) => {
              console.log(params.row)
              if (!event.ctrlKey) {
                event.defaultMuiPrevented = true;
                navigate(`/Details/${params.row.item_id}`)
              }
            }}
            onSortModelChange={(model) => setSortModel(model)}
            sortModel={sortModel}
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