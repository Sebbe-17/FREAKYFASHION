const express = require('express');
const router = express.Router();

// Importera db-objekt/
const db = require('../data/db');
const app = require('../app');

// Errorhantering för /products utan id
router.get('/', (req, res, next) => {
  res.status(400).send('Du måste ange en produkt-id i URL:en');

});
// GET http://localhost:3000/products/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const select = db.prepare('SELECT * FROM products');
  const products = select.all();
  const product = products.find(p => p.id === parseInt(id));  // Hitta produkten med det angivna id:t

// Om ingen produkt hittas med det angivna id:t, returnera 404
  if (!product) {
    res.status(404).send('Produkt hittades inte');
    return;
  }
// /views/products.ejs
  res.render('products', {
    title: product.name,
    product: product,
    products: products.filter(p => p.price === product.price && p.id !== parseInt(id)).slice(0, 3) // Visa endast de första 3 produkterna i listan med samma pris över relaterade produkter, utan att visa den aktuella produkten
  });
});

module.exports = router;