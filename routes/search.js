const express = require('express');
const router = express.Router();

// importera db-objekt/
const db = require('../data/db');
const app = require('../app');

// GET http://localhost:3000/search?q=...
router.get('/', (req, res) => {
    const query = req.query.q; // Hämta sökfrågan från URL:en
    const select = db.prepare('SELECT * FROM products WHERE name LIKE ?');  // Förbered SQL-frågan för att söka efter produkter baserat på namnet
    const products = select.all(`%${query}%`); // Sök efter produkter som liknar sökfrågan i namnet

    // /views/search.ejs
    res.render('search', { 
        title: `Sökresultat för "${query}"`,
        products, 
        query }); // Rendera sökresultatsidan med de hittade produkterna och sökfrågan
});

module.exports = router;