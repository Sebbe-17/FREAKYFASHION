const express = require('express');
const router = express.Router();

// Importera db-objekt/
const db = require('../data/db');

// Errorhantering för /products utan id
router.get('/', (req, res) => {
  res.status(400).send('Du måste ange en produkt-id i URL:en');

});
// GET http://localhost:3000/products/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const select = db.prepare('SELECT * FROM products WHERE id = ?');
  const product = select.get(id);

// Om ingen produkt hittas med det angivna id:t, returnera 404
  if (!product) {
    res.status(404).send('Produkt hittades inte');
    return;
  }
// /views/products.ejs
  res.render('products', {
    title: product.name,
    product: product
  });
});

module.exports = router;