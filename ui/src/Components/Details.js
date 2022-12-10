import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Context from './Context';
import config from '../config';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Details = () => {
  const { isLoggedIn, setIsLoggedIn, setCurrentFilter, currentUser, setCurrentUser } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [itemIdText, setItemIdText] = useState('');
  const [ownerText, setOwnerText] = useState('');
  const [usernameText, setUsernameText] = useState('');
  const [userIdText, setUserIdText] = useState('');
  const [itemNameText, setItemNameText] = useState('');
  const [quantityText, setQuantityText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    try {
      setCurrentUser(document.cookie.split('=')[1]);
    } catch (e) {console.log(e)};
    fetch(`${API_URL}/items/merged`)
      .then(res => res.json())
      .then(item => {
        for (let i = 0; i < item.length; i++) {
          if (item[i].id === +id) {
            setItemIdText(item[i].id);
            setOwnerText(`${item[i].first_name} ${item[i].last_name}`);
            setUsernameText(item[i].username);
            setUserIdText(item[i].user_id);
            setItemNameText(item[i].item_name);
            setQuantityText(item[i].quantity);
            setDescriptionText(item[i].description);
          }
        }
      }).catch(e => {
        console.log(e);
        setIsValid(false);
      });
    },[]);

  const trim = (e) => {
    e.target.value = e.target.value.trim().replace(/\s\s+/g, ' ');
  }

  const deleteItem = async () => {
    fetch(`${API_URL}/item/${id}`, {
      method: 'DELETE'}
      ).catch(e => console.log(e));
    setEditing(false);
    navigate('/Home');
  }

  const editItem = async () => {
    let itemName = document.getElementById('itemName').value;
    let descriptionIn = document.getElementById('description').value;
    let quantityIn = document.getElementById('quantity').value;

    if (itemName === '' || descriptionIn === '' || quantityIn === '') {
      window.alert(`You've left a field blank 🙁`);
    } else if (!(/^[0-9]+$/).test(quantityIn)) {
      window.alert(`Your quantity can only be numeric 🙁`);
    } else if (itemName.length > 50 || quantityIn.length > 50) {
      window.alert(`Item Name and Quantity fields cannot exceed 50 characters 🙁`);
    } else if (descriptionIn.length > 500) {
      window.alert(`The Item Description field cannot exceed 500 characters 🙁`);
    } else {
      var res = await fetch(`${API_URL}/item/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: +id,
          item_name: itemName,
          description: descriptionIn,
          quantity: quantityIn
        })
      }).catch(e => window.alert(e))
      if (res.status === 200) {
        setEditing(false);
      }
    }
  }

  return (
    <div className="Details">
      <div className="Details-Container">
        <div className="Details-Entry">
          <div className="Details-Info">
            CANNOT EDIT
          </div>
          <input id="itemId" className="Details-Item-Id" type="text" placeholder="Item ID" onBlur={(e) => trim(e)} disabled defaultValue={itemIdText}/>
          <input id="owner" className="Details-Owner" type="text" placeholder="Owner" onBlur={(e) => trim(e)} disabled defaultValue={ownerText}/>
          <input id="username" className="Details-Username" type="text" placeholder="Username" onBlur={(e) => trim(e)} disabled defaultValue={usernameText}/>
          <input id="UserId" className="Details-User-Id" type="text" placeholder="User ID" onBlur={(e) => trim(e)} disabled defaultValue={userIdText}/>
          <div className="Details-Info">
            CAN EDIT IF THE ITEM IS YOURS
          </div>
          <input id="itemName" className="Details-Item-Name" type="text" placeholder="Item Name" onBlur={(e) => trim(e)}
            disabled={!editing} defaultValue={itemNameText}/>
          <input id="quantity" className="Details-Item-Quantity" type="number" placeholder="Item Quantity" onBlur={(e) => trim(e)}
            onKeyDown={(e) => {
              return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.code) ? true : !isNaN(Number(e.key))
                && e.code !== 'Space'
            }} disabled={!editing} defaultValue={quantityText}/>
          <textarea id="description" className="Details-Item-Description" type="text" placeholder="Item Description"
            rows={5} onBlur={(e) => trim(e)} disabled={!editing} defaultValue={descriptionText}/>
        </div>
        {(usernameText === document.cookie.split('=')[1]) ? (
          <>
            <button className="Details-Edit-Button" onClick={() => { setEditing(true) }} hidden={editing}>Edit</button>
            {editing && (
              <>
                <div className="Details-Button-Box">
                  <button className="Details-Cancel-Button" onClick={() => setEditing(false)}>Cancel</button>
                  <button className="Details-Save-Button" onClick={() => editItem()}>Save</button>
                  <button className="Details-Delete-Button" onClick={() => deleteItem()}>Delete</button>
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