var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var tasksRouter = require('./routes/tasks');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res, next) {
  if (!req.cookies['AuthToken']) return res.redirect('/login.html')
  next()
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

module.exports = app;
