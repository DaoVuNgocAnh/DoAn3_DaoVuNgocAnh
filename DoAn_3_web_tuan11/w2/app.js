var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productcategoriesRouter = require('./routes/productcategories.route');
var productsRouter = require('./routes/products.route');
var productVariantsRouter = require('./routes/productVariants.route');
var cartRouter = require('./routes/cart.route');
var orderdetailsRouter = require('./routes/orderdetails.route');
var ordersRouter = require('./routes/orders.route');
var paymentsRouter = require('./routes/payments.route');
var reviewsRouter = require('./routes/reviews.route');
var shippingRouter = require('./routes/shipping.route');
var usersRouter = require('./routes/users.route');
var guestRouter = require('./routes/guest.route');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/productcategories', productcategoriesRouter);
app.use('/products', productsRouter);
app.use('/productVariants', productVariantsRouter);
app.use('/cart', cartRouter);
app.use('/orderdetails', orderdetailsRouter);
app.use('/payments', paymentsRouter);
app.use('/reviews', reviewsRouter);
app.use('/shipping', shippingRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/guest', guestRouter);

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
