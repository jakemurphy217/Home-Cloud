const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
        // password: req.body.password -- not encryted can see passwords in the database not secure
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'user is created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  //trying to find if user exists
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'authentication denied',
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'authentication denied',
        });
      }
      //creating a web token
      const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
        "secret_for_me_on_server",
        {expiresIn: "1h"}
      );
      res.status(200).json({
        token: token
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: 'authentication denied',
      });
    })

});

module.exports = router;
