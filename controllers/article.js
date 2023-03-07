// Import database connection
const con = require('../utils/db')

// Articles index page
const getAllArticles = ("/", (req, res) => {
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
});

// Show article by this slug
const getArticleBySlug = ('/article/:slug', (req, res) => {
    let query = `SELECT article.*, author.name AS author_name FROM article JOIN author ON article.author_id = author.id WHERE article.slug="${req.params.slug}"`;
    let article
    con.query(query, (err, result) => {
        if (err) throw err
        article = result
        console.log(article)
        res.render('article', {
            article: article
        });
    });
});

// Export controller function
module.exports = {
    getAllArticles,
    getArticleBySlug
}