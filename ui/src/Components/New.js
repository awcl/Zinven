import '../App.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import Context from './Context';
import React, { useState, useContext, useEffect } from 'react';
const API_URL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const New = () => {
  const { setIsLoggedIn, setCurrentFilter, currentId, setCurrentId } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/user/id/${document.cookie.split('=')[1]}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentId(data.map(item => item.id))
      }
      ).catch(e => console.log(e));
  }, []);

  const trim = (e) => {
    e.target.value = e.target.value.trim().replace(/\s\s+/g, ' ');
  }

  const newSubmit = async (e) => {
    e.preventDefault();
    let itemName = e.target.itemname.value;
    let descriptionIn = e.target.description.value;
    let quantityIn = e.target.quantity.value;

    if (itemName === '' || descriptionIn === '' || quantityIn === '') {
      window.alert(`You've left a field blank 🙁`);
    } else if (!(/[\w\s]+/i).test(descriptionIn)) {
      window.alert(`Your first and last names can only contain English letters and a single hyphen between letters 🙁`);
    } else if (!(/^[0-9]+$/).test(quantityIn)) {
      window.alert(`Your quantity can only be numeric 🙁`);
    } else if (itemName.length > 50 || quantityIn.length > 50) {
      window.alert(`Item Name and Quantity fields cannot exceed 50 characters 🙁`);
    } else if (descriptionIn.length > 500) {
      window.alert(`The Item Description field cannot exceed 500 characters 🙁`);
    } else {
      var res = await fetch(`${API_URL}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: +currentId,
          item_name: itemName,
          description: descriptionIn,
          quantity: quantityIn
        })
      }).catch(e => window.alert(e))
      if (res.status === 201) {
        setIsLoggedIn(true);
        setCurrentFilter(1);
        navigate('/Home');
      }
    }
  }
  return (
    <div className="New">
      <form className="New-Container" onSubmit={(e) => newSubmit(e)}>
        <div className="New-Entry">
          <input id="itemname" className="New-Item-Name" type="text" placeholder="Item Name" onBlur={(e) => trim(e)} />
          <input id="quantity" className="New-Item-Quantity" type="number" placeholder="Item Quantity" onBlur={(e) => trim(e)}
            onKeyDown={(e) => { return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.code) ? true : !isNaN(Number(e.key))
            && e.code !== 'Space' }} />
          <textarea id="description" className="New-Item-Description" type="text" placeholder="Item Description" rows={5} onBlur={(e) => trim(e)} />

        </div>
        <button className="New-Submit-Button">Create</button>
      </form>
    </div>
  )
}

export default New;