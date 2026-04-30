var express = require('express');
var router = express.Router();

// Importera db-objekt/
const db = require('../data/db');

// GET http://localhost:3000/
router.get('/', function(req, res, next) {

  const select = db.prepare('SELECT * FROM products');
  const products = select.all();

  // /views/index.ejs
  res.render('index', {
    title: 'FreakyFashion',
    products: products
  });
});

module.exports = router;
