const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const crypto = require('crypto');

// Sendgrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sgApiKey);
console.log(process.env.SENDGRID_API_KEY);

const User = require('../models/User');
const Token = require('../models/Token'); 

router.get('/login', (req, res) => res.send('Login'));
router.get('/register', (req, res) => res.send('Register'));
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
  User.findOne({email: req.body.email})
      .then(user => {
        if (user) {
          return res.status(500).json({error: 'email already exists'});
        }
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;

          newUser
            .save()
            .then(user => {
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
                                console.log(`email sent succesfully`)
                              })
                              .catch(err => {
                                console.error(err.toString());
                              });
                      })
                      .catch(err => console.error(err));

              res.json(user)
            })
            .catch(err => console.log(err));
        })
      })
})

// Route which allows users to log in
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
      .then(user => {
        if(!user) {
          return res.status(404).json({error: 'Invalid email'});
        }

        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if (isMatch) {
                  const payload = {
                    id: user.id
                  }
                  jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  });
                } else {
                  res.status(400).json({error: 'Invalid password'});
                }
              })
      })
})

// get current users
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user);
  res.json({
    id: req.user.id,
    email: req.user.email
  });
})

router.get('/activate/:token', (req,res) => {
  Token.findOne({token: req.params.token}) 
        .then(token => {
          if(!token) {
            return res.status(400).send({error: 'token not there'})
          }
          User.findById({_id: token.userId})
              .then(user => {
                if (user.isVerified) {
                  return res.status(400).send({msg: 'already verified'});
                }
                user.isVerified = true;
                user.save()
                    .then(u => {
                      return res.json({msg: 'verified'})
                    })
              })
              .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

module.exports = router;