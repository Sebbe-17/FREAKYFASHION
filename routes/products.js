const express = require('express');
const router = express.Router();

// Import db-objekt/
const db = require('../data/db');
const app = require('../app');

// Error handling for /products without id
router.get('/', (req, res, next) => {
  res.status(400).send('Du måste ange en produkt-id i URL:en');

});
// GET http://localhost:3000/products/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const select = db.prepare('SELECT * FROM products');
  const products = select.all();
  const product = products.find(p => p.id === parseInt(id));  // Find the product with the specified id

// If no product is found with the specified id, return 404
  if (!product) {
    res.status(404).send('Produkt hittades inte');
    return;
  }
// /views/products.ejs
  res.render('products', {
    title: product.name + " - FreakyFashion",
    product: product,
    products: products.filter(p => p.category_id === product.category_id && p.id !== parseInt(id)).slice(0, 3) // Exclude the current product and show only 3 similar products based on category
  });
});

module.exports = router;