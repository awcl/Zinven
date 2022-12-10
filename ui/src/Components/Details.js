import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Context from './Context';
import config from '../config';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Details = () => {
  const { isLoggedIn, setIsLoggedIn, setCurrentFilter } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  let navigate = useNavigate();
  let { id } = useParams();

  const trim = (e) => {
    e.target.value = e.target.value.trim().replace(/\s\s+/g, ' ');
  }


  return (
    <div className="Details">
      <div className="Details-Container">
        <div className="Details-Entry">
          <div className="Details-Info">
            CANNOT EDIT
          </div>
          <input id="itemId" className="Details-Item-Id" type="text" placeholder="Item ID" onBlur={(e) => trim(e)} disabled />
          <input id="owner" className="Details-Owner" type="text" placeholder="Owner" onBlur={(e) => trim(e)} disabled />
          <input id="username" className="Details-Username" type="text" placeholder="Username" onBlur={(e) => trim(e)} disabled />
          <input id="UserId" className="Details-User-Id" type="text" placeholder="User ID" onBlur={(e) => trim(e)} disabled />
          <div className="Details-Info">
            CAN EDIT IF THE ITEM IS YOURS
          </div>
          <input id="itemName" className="Details-Item-Name" type="text" placeholder="Item Name" onBlur={(e) => trim(e)} disabled={!editing} />
          <input id="quantity" className="Details-Item-Quantity" type="number" placeholder="Item Quantity" onBlur={(e) => trim(e)}
            onKeyDown={(e) => {
              return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.code) ? true : !isNaN(Number(e.key))
                && e.code !== 'Space'
            }} disabled={!editing} />
          <textarea id="description" className="Details-Item-Description" type="text" placeholder="Item Description"
            rows={5} onBlur={(e) => trim(e)} disabled={!editing} />
        </div>
        {canEdit ? (
          <>
            <button className="Details-Edit-Button" onClick={() => { setEditing(true) }} hidden={editing}>Edit</button>
            {editing && (
              <>
                <div className="Details-Button-Box">
                  <button className="Details-Cancel-Button" onClick={() => { setEditing(false) }}>Cancel</button>
                  <button className="Details-Save-Button" onClick={() => { setEditing(false) }}>Save</button>
                  <button className="Details-Delete-Button" onClick={() => { setEditing(false) }}>Delete</button>
                </div>
              </>
            )}
          </>)
          :
          (<>
            <button className="Cant-Edit-Button">This item isn't yours 🙁</button></>
          )}
      </div>
    </div>
  )
}

export default Details;