const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const app = express();
const config = require('./knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config);

app.use(cors()).use(express.json());

app.get('/', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*").status(200).send('Got /, nice');
});

app.get('/users', (req, res) => { // List Users Items All Data
  knex('user')
    .select('*')
    .then(users => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(users);
    });
});

app.get('/usernames', (req, res) => { // List All Users Usernames
  knex('user')
    .select('username')
    .then(users => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(users);
  });
});

app.get('/items', (req, res) => { // List All Items All Data
  knex('item')
    .select('*')
    .then(items => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(items);
  });
});

app.post('/item', async (req, res) => { // Add an Item
  const maxIdQuery = await knex('item').max('id as maxId').first();
  let num = (await knex('item').max('id as max').first()).max + 1;
  console.log(num);
  knex('item')
  .insert(
    {
      id: num,
      user_id: req.body.user_id,
      item_name: req.body.item_name,
      description: req.body.description,
      quantity: req.body.quantity
    }
  )
  .then(res.set("Access-Control-Allow-Origin", "*").status(201).end())
});
// {id: 1, user_id: 1, item_name: "Placeholder", description: "We've been trying to reach you concerning your vehicle's extended warranty. You should've received a notice in the mail about your car's extended warranty eligibility. Since we've not gotten a response, we're giving you a final courtesy call before we close out your file. Press 2 to be removed and placed on our do-not-call list. To speak to someone about possibly extending or reinstating your vehicle's warranty, press 1 to speak with a warranty specialist.", quantity: 111}

app.get('/item/:id', (req, res) => { // Get Item by ID All Data
  let { id } = req.params;
  knex('item')
    .where('id', id)
    .then(item => {
      console.log(typeof item)
      res.set("Access-Control-Allow-Origin", "*").status(200).send(item);
    });
});

app.patch('/item/:id', (req, res) => { // Update Item
  let { id } = req.params;
  knex('item')
    .where('id', id)
    .update({
      item_name: req.body.item_name,
      description: req.body.description,
      quantity: req.body.quantity
    })
    .then(item => {
      res.set("Access-Control-Allow-Origin", "*").status(200).end();
    });
});

app.delete('/item/:id', (req, res) => { // Delete Item
  let { id } = req.params;
  knex('item')
    .where('id', id)
    .del()
    .then(item => {
      res.set("Access-Control-Allow-Origin", "*").status(410).end();
    });
});

app.post('*', function (req, res) { // Handle Undefined Posts
  res.status(404).end();
});

app.get('*', function (req, res) { // Handle Undefined Gets
  res.status(404).end();
});

app.patch('*', function (req, res) {  // Handle Undefined Patches
  res.status(404).end();
});

app.delete('*', function (req, res) { // Handle Undefined Deletes
  res.status(404).end();
});

module.exports = app;