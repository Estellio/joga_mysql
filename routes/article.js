const express = require('express');
// Get by using express router
const router = express.Router();
// Define article controller and export it for this file
const articleController = require('../controllers/article');

// Use controller functions according to the route
router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

// Export article route for using in default application file
module.exports = router;