const express = require('express');
const passport = require('passport');
const sign = require('../services/jwt.service');

const router = express.Router();

router.post('/login',
  passport.authenticate('local', {
    session: false
  }),
  (req, res) => {
    const user = req.user;
    const token = sign(user);

    res.status(200).json({
      user,
      token
    });
  });


module.exports = router;
