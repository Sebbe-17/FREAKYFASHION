const express = require('express');
const router = express.Router();

// Importera db-objekt/
const db = require('../../data/db');
const app = require('../../app');

// Use admin layout for admin routes
router.use((req, res, next) => {
  res.locals.layout = 'layouts/admin-layout'; // Sätt layouten för admin-sidor
  next();
});

// GET http://localhost:3000/admin/products
router.get('/', (req, res) => {
  const select = db.prepare('SELECT * FROM products');
  const products = select.all(); // Hämta alla produkter från databasen
  
  // /views/admin/index.ejs
  res.render('admin/products', {
    title: 'Admin - Produkter',
    products // Skicka produkterna till admin-produktvyn
  });

});


module.exports = router;