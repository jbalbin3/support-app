/* eslint-disable no-console */
const express = require('express');
// this is now being handled in the routes?
// const { attemptLogin, availableCities, addNewUser } = require('../db/controllers');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.static('dist'));
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(port, () => console.log(`Listening on port ${port}`));
