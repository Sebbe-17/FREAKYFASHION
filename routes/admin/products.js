const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../../data/db');
const router = express.Router();

// Upload configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) =>
      cb(null, 'public/images/products'),

    filename: (_, file, cb) =>
      cb(
        null,
        Date.now() + path.extname(file.originalname)
      )
  })
});

// Admin layout
router.use((req, res, next) => {
  res.locals.layout = 'layouts/admin-layout';
  next();
});

// Products

// GET /admin/products
router.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();

  res.render('admin/products', {
    title: 'Admin - Produkter',
    products
  });
});

// Products/new

// GET /admin/products/new
router.get('/new', (req, res) => {
  res.render('admin/new', {
    title: 'Admin - Lägg till produkt',
    type: 'product',
    categories: db.prepare('SELECT * FROM categories').all()
  });
});

// POST /admin/products/new
router.post('/new', upload.single('p_image'), (req, res) => {
  const {
    name,
    price,
    SKU,
    description,
    brand,
    category_id
  } = req.body;

  db.prepare(`
    INSERT INTO products
    (name, price, SKU, description, brand, category_id, p_image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    name,
    price,
    SKU,
    description,
    brand,
    category_id,
    req.file?.filename ?? null
  );

  res.redirect('/admin/products');
});

module.exports = router;