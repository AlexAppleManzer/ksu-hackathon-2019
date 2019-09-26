/* eslint-disable no-unused-vars */
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config');
const auth = require('./auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accTypesRouter = require('./routes/accTypes');
var listingsRouter = require('./routes/listings');

var app = express();

const db = mongoose.connect(config.mongoDB.connectionString);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/*', usersRouter);
app.use('/accTypes', accTypesRouter);
app.use('/listings', listingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
