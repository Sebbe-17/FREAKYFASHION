const express = require('express');
const router = express.Router();

// Import db-objekt/
const db = require('../data/db');
const app = require('../app');

// GET http://localhost:3000/
router.get('/', function(req, res, next) {

  const select = db.prepare('SELECT * FROM products');
  const products = select.all();

  // /views/index.ejs
  res.render('index', {
    title: 'FreakyFashion',
    products: products.slice(0, 8) // Show only the first 8 products on the homepage
  });
});

module.exports = router;
