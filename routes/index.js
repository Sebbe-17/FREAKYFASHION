const express = require('express');
const router = express.Router();

// Importera db-objekt/
const db = require('../data/db');
const app = require('../app');

// GET http://localhost:3000/
router.get('/', function(req, res, next) {

  const select = db.prepare('SELECT * FROM products');
  const products = select.all();

  // /views/index.ejs
  res.render('index', {
    title: 'FreakyFashion',
    products: products.slice(0, 8) // Visa endast de första 8 produkterna på startsidan
  });
});

module.exports = router;
