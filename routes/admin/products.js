const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  dest: 'public/uploads/'
});

// Importera db-objekt/
const db = require('../../data/db');
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
router.get('/new', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories').all();

  res.render('admin/new', {
    title: 'Admin - Lägg till produkt',
    type: 'product',
    categories
  });
});
router.post('/new', upload.single('image'), (req, res) => {
  const { name, price, SKU, description, brand, category_id } = req.body;

  const insert = db.prepare(`
    INSERT INTO products (name, price, SKU, description, brand, category_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run(name, price, SKU, description, brand, category_id);

  res.redirect('/admin/products');
});


module.exports = router;