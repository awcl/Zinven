const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const app = express();
const config = require('./knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config);

app.use(cors()).use(express.json());

const { hash, compare } = bcrypt;
const SALTS = 12;

app.get('/', (req, res) => { // Home, ensure functionality
  res.set("Access-Control-Allow-Origin", "*").status(200).send('Got / 🙂');
});

app.post('/user', async (req, res) => { // New User
  let num = (await knex('user').max('id as max').first()).max + 1;
  let hashed = await hash(req.body.password, SALTS);
  console.log(hashed);
  console.log(typeof hashed);
  knex('user')
    .insert(
      {
        id: num,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password_hash: hashed
      }
    )
    .then(res.set("Access-Control-Allow-Origin", "*").status(201).end())
    .catch((e) => res.set("Access-Control-Allow-Origin", "*").status(500).end())
});

app.patch('/user/:id', (req, res) => { // Update User
  let { id } = req.params;
  let hashed = await(knex('user').where('username', req.body.username).select('password_hash'));
  try {
    hashed = hashed[0].password_hash;
    compare(req.body.password, hashed)
      .then(match => {
        if (match) {
          knex('user')
            .where('id', id)
            .update({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              password_hash: hashed
            })
            .then(item => {
              res.set("Access-Control-Allow-Origin", "*").status(200).end();
            });
        } else {
          res.set("Access-Control-Allow-Origin", "*").status(403).end();
        }
      })
  } catch (e) {
    res.set("Access-Control-Allow-Origin", "*").status(500).end();
  }
});

app.delete('/user/:id', (req, res) => { // Delete User
  let { id } = req.params;
  knex('user')
    .where('id', id)
    .del()
    .then(item => {
      res.set("Access-Control-Allow-Origin", "*").status(410).end();
    });
});

app.get('/user/id/:username', (req, res) => { // User ID Query
  let { username } = req.params;
  knex('user')
    .select('id')
    .where('username', username)
    .then(user => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(user);
    });
});

app.post('/login', async (req, res) => { // Authentication
  let hashed = await (knex('user').where('username', req.body.username).select('password_hash'));
  try {
    hashed = hashed[0].password_hash;
    compare(req.body.password, hashed)
      .then(match => {
        match ? res.set("Access-Control-Allow-Origin", "*").status(200).end()
          : res.set("Access-Control-Allow-Origin", "*").status(403).end()
      })
  } catch (e) {
    res.set("Access-Control-Allow-Origin", "*").status(500).end();
  }
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
    .then(usernames => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(usernames);
    });
});

app.get('/items', (req, res) => { // List All Items All Data
  knex('item')
    .select('*')
    .then(items => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(items);
    });
});

app.get('/items/merged', (req, res) => { // List All Items With Merged Data from User Table
  knex('item')
    .join('user', 'user.id', 'item.user_id')
    .select('item.id', 'user_id', 'user.first_name', 'user.last_name', 'user.username', 'item.item_name','item.description', 'item.quantity')
    .then(items => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(items);
    });
});

app.get('/items/user/:id', (req, res) => { // List All Items for User by ID
  let { id } = req.params;
  knex('item')
    .select('*')
    .where('user_id', id)
    .then(items => {
      res.set("Access-Control-Allow-Origin", "*").status(200).send(items);
    });
});

app.post('/item', async (req, res) => { // Add an Item
  let num = (await knex('item').max('id as max').first()).max + 1;
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
    }).catch(e => {
      res.set("Access-Control-Allow-Origin", "*").status(500).end();
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