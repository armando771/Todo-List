require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const router = require('../routes/tasks');

app.use(bodyParser.json());
app.use(cors());

app.use('/task', router);

module.exports = app;
