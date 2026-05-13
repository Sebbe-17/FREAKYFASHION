// sida för att visa produkter i en viss kategori, t.ex. http://localhost:3000/categories/kläder
const express = require('express');
const router = express.Router();

// Importera db-objekt/
const db = require('../data/db');
const app = require('../app');

// Errorhantering för /category utan kategori
router.get('/', (req, res, next) => {
  res.status(400).send('Du måste ange en kategori i URL:en');
});

// GET http://localhost:3000/categories/:category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  const select = db.prepare('SELECT * FROM products WHERE category = ?');
  const products = select.all(category); // Hämta alla produkter som matchar den angivna kategorin


  // Om ingen produkt hittas med den angivna kategorin, returnera 404
  if (products.length === 0) {
    res.status(404).send('Ingen produkt hittades i den angivna kategorin');
    return;
  }

  //views/categories.ejs
  res.render('categories', {
    title: `Kategori: ${category}`,
    products: products
  });

});

module.exports = router;