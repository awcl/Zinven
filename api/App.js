const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const app = express();

const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config);

app.use(cors()).use(express.json());

app.get('/', (req, res) => {
  res.set("Access-Control-Allow-Origin", "*").status(200).send('Get /');
});

module.exports = app;