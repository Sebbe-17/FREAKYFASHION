const express = require('express');
const router = express.Router();

// import db-objekt/
const db = require('../data/db');
const app = require('../app');

// GET http://localhost:3000/search?q=...
router.get('/', (req, res) => {
    const query = req.query.q; // Get the search query from the URL query parameters
    const select = db.prepare('SELECT * FROM products WHERE name LIKE ?');  // Prepare a SQL statement to search for products where the name is similar to the search query
    const products = select.all(`%${query}%`); // Search for products that are similar to the search query in the name

    // /views/search.ejs
    res.render('search', { 
        title: `Sökresultat för "${query}"`,
        products, 
        query }); // Render the search results page with the search query and the products that match the search query
});

module.exports = router;