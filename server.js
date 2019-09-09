const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectDB = require('./config/database');
const authRoute = require('./routes/authRoute');

const app = express();
// Connect database
connectDB();

const API_PREFIX = '/api/v1';

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use(`${API_PREFIX}/auth`, authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
