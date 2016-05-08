var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n-2');//Modulo para internacionalización de mensajes

// Conexión a BD con mongoose
require('connectMongoose');

// Modelos
require('./models/Advertisement');
require('./models/User');
require('./models/PushToken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Attach the i18n property to the express request object
// And attach helper methods for use in templates
i18n.expressBind(app, {
  // setup some locales - other locales default to en silently
  locales: ['en', 'es'],
  // set the default locale
  defaultLocale: 'en',
  // change the cookie name from 'lang' to 'locale'
  cookieName: 'locale'
});

// This is how you'd set a locale from query string.
app.use(function(req, res, next) {
  req.i18n.setLocaleFromQuery();
  next();
});

// rutas del API
app.use('/api/v1/advertisements', require('./routes/v1/advertisements'));
app.use('/api/v1/users', require('./routes/v1/users'));
app.use('/api/v1/pushtokens', require('./routes/v1/pushTokens'));

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  var err = new Error(req.i18n.__('Not Found'));
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.json({
      succes: false,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.json({
    succes: false,
    message: err.message,
    error: {}
  });
});

module.exports = app;
