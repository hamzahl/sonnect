const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
require('./config/auth')(passport);

// Routes
app.use('/api/users', require('./api/routes/user'));

// Connect to mongoDB
mongoose.connect(keys.mongoUri, { useNewUrlParser: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));