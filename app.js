const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const detailsRouter = require('./routes/products');
const searchRouter = require('./routes/search');
const categoryRouter = require('./routes/categories');
const adminProductsRouter = require('./routes/admin/products');
const adminCategoryRouter = require('./routes/admin/categories');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

// Middleware för att hämta kategorier och göra dem tillgängliga i alla vyer
const db = require('./data/db');

app.use((req, res, next) => {
    try {
        const categories = db
            .prepare('SELECT * FROM categories')
            .all();

        res.locals.categories = categories;

        next();
    } catch (err) {
        next(err);
    }
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', detailsRouter);
app.use('/search', searchRouter);
app.use('/categories', categoryRouter);
app.use('/admin/products', adminProductsRouter);
app.use('/admin/categories', adminCategoryRouter);
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
