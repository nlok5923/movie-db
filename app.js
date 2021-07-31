var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var session = require('express-session');
const { dbSetup } = require('./connections/db')
require('dotenv').config();

var app = express();
dbSetup();

app.use(cors({ credentials: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("app is listening ");
})

module.exports = app;
