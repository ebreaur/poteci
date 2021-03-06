var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var citiesRouter = require('./routes/cities');
var trailsRouter = require('./routes/trails');
var trailRouter = require('./routes/trail');
var trailDetailRouter = require('./routes/trailDetail');
var database = require('./database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/detail/:code', indexRouter);
app.use('/trails/:type', indexRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/trails', trailsRouter);
app.use('/api/trail', trailRouter);
app.use('/api/detail', trailDetailRouter);

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

database.setupDatabase();

module.exports = app;
