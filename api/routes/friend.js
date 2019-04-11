const express = require('express');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
// const crypto = require('crypto');
// const Chatkit = require ('@pusher/chatkit-server');
const User = require('../../models/User');
const Friend = require('../../models/Friend');

router.get('/', (req,res) => {
  res.send('friends works')
})

router.get('/add/:fromid/:receiverid', (req,res) => {
  console.log('Sender: ' + req.params.fromid)
  console.log('Recipient: ' + req.params.receiverid);
  // User
  // .findById(req.params.fromid)
  // .then( user => {
  //   user.friends.unshift(req.params.receiverid);
  //   Friend
  //   .insertMany( {} )

  //   user
  //   .save()
  //   .then(u => res.json(u))
  // })
})

// Add friend
router.post('/add/from/:fromid/sender:senderid', (req, res) =>{
  User.findByIdAndUpdate
})

module.exports = router;