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

app.get('/user', (req, res) => {
  knex('user')
    .select('*')
    .then(users => {
      res.status(200).json(users);
  });
});

app.get('/usernames', (req, res) => {
  knex('user')
    .select('username')
    .then(users => {
      res.status(200).json(users);
  });
});

app.get('/item', (req, res) => {
  knex('item')
    .select('*')
    .then(items => {
      res.status(200).json(items);
  });
});

module.exports = app;