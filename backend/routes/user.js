const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

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

module.exports = router;
