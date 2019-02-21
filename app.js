const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const morgan = require('morgan');
const app = express();
const http = require('http');
const socketEvents = require('./socketEvents');


// server
const server = http.createServer(app);
const io = require('socket.io').listen(server);
socketEvents(io);
// const io = require('socket.io');
// serve using static files
// app.use(express.static(__dirname));

// Logger middleware
app.use(morgan('combined'));


// Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
require('./config/auth')(passport);

// Routes
app.use('/api/users', require('./api/routes/user'));
// app.get('/messages', (req, res) => {
// 	res.send('works');
// })
app.use('/api/messages', require('./api/routes/message'));
app.use('/api/posts', require('./api/routes/post'));

// Connect to mongoDB
mongoose.connect(keys.mongoUri, { useNewUrlParser: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

// io.on('connection', () => {
// 	console.log('a user is connected');
// })

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;