var express = require('express');
const { buildLoginUrl, getPapiToken } = require('./papi')
var router = express.Router();


router.post('/login', function(req, res, next) {
  res.redirect(buildLoginUrl());
});

router.get('/callback', async function(req, res, next) {
  const { code/* , state */ } = req.query
  const token = await getPapiToken(code)

  res.cookie('AuthToken', token.access_token, {
    httpOnly: false,
    maxAge: token.expires_in * 1000,
    secure: true,
  })
  res.redirect('/');
});

module.exports = router;
