const express = require('express');
const passport = require('passport');
const router = express.Router();

const Message  = require('../../models/Message');

router.get('/', (req, res) =>{
  res.send('works');

})

router.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  })
})

module.exports = router;