const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../../data/db');
const router = express.Router();

// Upload configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) =>
      cb(null, 'public/images/categories'),

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

// Categories

// GET /admin/categories
router.get('/', (req, res) => {
  const categories = db
    .prepare('SELECT * FROM categories')
    .all();

  res.render('admin/categories', {
    title: 'Admin - Kategorier',
    categories
  });
});

// Categories/new

// GET /admin/categories/new
router.get('/new', (req, res) => {
  res.render('admin/new', {
    title: 'Admin - Lägg till kategori',
    type: 'category'
  });
});

// POST /admin/categories/new
router.post('/new', upload.single('c_image'), (req, res) => {
  const { name } = req.body;
  const imageFilename = req.file?.filename ?? null;

  try {
    db.prepare(`
      INSERT INTO categories (name, c_image)
      VALUES (?, ?)
    `).run(name, imageFilename);

    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);

    res.render('admin/new', {
      title: 'Admin - Lägg till kategori',
      type: 'category',
      error: 'Kategorin finns redan eller kunde inte sparas.'
    });
  }
});

module.exports = router;