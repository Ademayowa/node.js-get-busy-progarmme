const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const connectDB = require('./config/database');
const user = require('./routes/user');
const app = express();

// Connect database
connectDB();

// View engine
app.engine('.hbs', expressHbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Bodyparser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', user);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
