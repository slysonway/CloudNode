'use strict';
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const RouterBuilder = require('./route');

const app = express();
app.use(morgan('dev'));
app.use(cors());

RouterBuilder.build(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

