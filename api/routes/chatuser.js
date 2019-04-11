const express = require('express');
const router = express.Router();
const Chatkit = require ('@pusher/chatkit-server');

const keys = require('../../config/keys');

const chatkit = new Chatkit.default({
  instanceLocator: keys.chatkitInstanceLocator,
  key: keys.chatkitKey
})

router.post('/', (req, res) => {
  const { userId } = req.body;

  chatkit
    .createUser({
      id: userId,
      name: userId,
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        console.log(`User already exists: ${userId}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});

router.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
});

module.exports = router;
