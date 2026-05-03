const express = require('express');
const router = express.Router();

// Importera db-objekt/
const db = require('../data/db');

// Product-details
router.get('/', (req, res) => {
  res.status(400).send('Du måste ange en produkt-id i URL:en');

});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const select = db.prepare('SELECT * FROM products WHERE id = ?');
  const product = select.get(id);

  if (!product) {
    res.status(404).send('Produkt hittades inte');
    return;
  }

  res.render('products', {
    title: product.name,
    product: product
  });
});

module.exports = router;