let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let categoryRouter = require('./routes/category');
let singleProductRouter = require('./routes/single-product');
let cartRouter = require('./routes/cart');
let checkoutRouter = require('./routes/checkout');
let confirmationRouter = require('./routes/confirmation');
let loginRouter = require('./routes/login');
let trackingRouter = require('./routes/tracking');
let registrationRouter = require('./routes/registration');
let forgotRouter = require('./routes/forgot');
let profileRouter = require('./routes/profile');
let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error.....'));


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/category', categoryRouter);
app.use('/single-product',singleProductRouter);
app.use('/checkout',checkoutRouter);
app.use('/cart',cartRouter);
app.use('/confirmation',confirmationRouter);
app.use('/login',loginRouter);
app.use('/tracking',trackingRouter);
app.use('/registration',registrationRouter);
app.use('/forgot',forgotRouter);
app.use('/profile',profileRouter);


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
