const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const crypto = require('crypto');
const Chatkit = require ('@pusher/chatkit-server');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sgApiKey);

// Chat kit
const chatkit = new Chatkit.default({
  instanceLocator: keys.chatkitInstanceLocator,
  key: keys.chatkitKey
})

// Models
const User = require('../../models/User');
const Token = require('../../models/Token');

// router.get('/login', (req, res) => res.send('Login'));
// router.get('/register', (req, res) => res.send('Register'));
router.get('/all', (req, res) => {
  User.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
})

// Route which creates a user in the DB if user doesn't already exist
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne( { email: req.body.email } )
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(500).json(errors);
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isVerified: false,
      });

      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;

        newUser
          .save()
          .then(user => {
            // chatkit
            //   .createUser({
            //     id: req.body.email,
            //     name: req.body.name
            //   })
            //   .then(() => res.sendStatus(201))
            //   .catch(err => {
            //     if (err.error === 'services/chatkit/user_already_exists') {
            //       res.sendStatus(200);
            //     } else {
            //       res.status(error.status).json(error)
            //     }
            //   })

            const newToken = new Token({
              userId: user._id,
              token: crypto.randomBytes(16).toString('hex')
            });

            newToken.save()
              .then(token => {
                const msg = {
                  to: req.body.email,
                  from: {
                    email: 'support@sonnect.com',
                    name: 'Sonnect'
                  },
                  subject: 'Email verification',
                  template_id: 'd-3f47d8e640e14bbaa1f79bbed948f058',
                  dynamic_template_data: {
                    verifyLink: `http://${req.headers.host}/api/users/activate/${token.token}`
                  }

                };
                sgMail.send(msg)
                  .then(() => {
                    console.log(msg);
                    console.log(`Activation email sent succesfully`)
                  })
                  .catch(err => {
                    console.error(err.toString());
                  });
              })
              .catch(err => console.error(err));

            return res.status(200).json(user);
          })
          .catch(err => console.log(err));
      })
    })
})

// Route which allows users to log in
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne( { email } )
    .then(user => {
      if (!user) {
        errors.email = 'Email not found'
        return res.status(404).json(errors);
      }
      if (user.isVerified === false) {
        errors.email = 'Email requires verification. Please check junk folder.'
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name
            }
            jwt.sign(payload, keys.secretOrKey, {
              expiresIn: 3600
            }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            });
          } else {
            res.status(400).json({
              error: 'Invalid password'
            });
          }
        })
        .catch(err =>{
          return res.status(400).json(err);
        })
    })
})

// get current user
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {  
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})

router.post('/chat', (req, res) => {
  chatkit
    .createUser({
      id: req.body.email,
      name: req.body.email
    })
    .then(() => res.sendStatus(201))
    .catch(err => {
      if (err.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    })
})

router.post('/chat/authenticate', (req, res) => {
  // const authData = chatkit.authenticate({ userId: req.query.user_id});
  // res.status(authData.status).send(authData.body);
      const authData = chatkit.authenticate({
        userId: req.query.user_id,
      });
      res.status(authData.status).send(authData.body);
})

router.get('/activate/:token', (req, res) => {
  Token.findOne({
      token: req.params.token
    })
    .then(token => {
      if (!token) {
        return res.status(400).send({
          error: 'token not there'
        })
      }
      User.findById({
          _id: token.userId
        })
        .then(user => {
          if (user.isVerified) {
            return res.status(400).send({
              msg: 'already verified'
            });
          }
          user.isVerified = true;
          user.save()
            .then(u => {
              return res.redirect('/');
            })
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

module.exports = router;