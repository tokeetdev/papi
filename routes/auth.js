var express = require('express');
var router = express.Router();


router.post('/login', function(req, res, next) {
  res.cookie('AuthToken', 'very secret token', {
    httpOnly: false,
    secure: true,
    maxAge: 3600000, // 1h
  })
  res.redirect('/');
});

module.exports = router;
