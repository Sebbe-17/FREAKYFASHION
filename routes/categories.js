// Page for displaying products in a specific category,
// e.g. http://localhost:3000/categories/kläder
const express = require('express');
const router = express.Router();

// Import db-objekt/
const db = require('../data/db');
const app = require('../app');

// Error handling for missing category_id
router.get('/', (req, res, next) => {
  res.status(400).send('Du måste ange en kategori i URL:en');
});

// GET http://localhost:3000/categories/:category_id
router.get('/:category_id', (req, res) => {
  const category_id = req.params.category_id;
  const select = db.prepare('SELECT * FROM products WHERE category_id = ?');
  const products = select.all(category_id); // Get all products in the specified category
  const categoryStmt = db.prepare(
    'SELECT name FROM categories WHERE id = ?'
  );
  const category = categoryStmt.get(category_id);


  // If no products are found for the specified category, return 404
  if (products.length === 0) {
    res.status(404).send('Ingen produkt hittades i den angivna kategorin');
    return;
  }

  //views/categories.ejs
  res.render('categories', {
    title: `${category.name} - FreakyFashion`,
    products: products.slice(0, 4)
  });

});

module.exports = router;