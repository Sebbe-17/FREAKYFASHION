const express = require('express');
const router = express.Router();

// Importera db-objekt
const db = require('../../data/db');

// Use admin layout for admin routes
router.use((req, res, next) => {
  res.locals.layout = 'layouts/admin-layout';
  next();
});

// GET /admin/categories
router.get('/', (req, res) => {
  const select = db.prepare('SELECT * FROM categories');
  const categories = select.all();

  res.render('admin/categories', {
    title: 'Admin - Kategorier',
    categories
  });
});

// GET /admin/categories/new
router.get('/new', (req, res) => {
  res.render('admin/new', {
    title: 'Admin - Lägg till kategori',
    type: 'category'
  });
});

// POST /admin/categories/new
router.post('/new', (req, res) => {
  const { name } = req.body;

  try {
    const insert = db.prepare(`
      INSERT INTO categories (name)
      VALUES (?)
    `);

    insert.run(name);

    res.redirect('/admin/categories');

  } catch (err) {
    console.error(err);

    res.render('admin/new', {
      title: 'Admin - Lägg till kategori',
      error: 'Kategorin finns redan eller kunde inte sparas.'
    });
  }
});

module.exports = router;