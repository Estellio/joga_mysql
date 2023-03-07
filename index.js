const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine(  {
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const mysql = require('mysql')

// create database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

// Import and use article routes
const articleRoutes = require('./routes/article');
app.use('/', articleRoutes);
app.use('/article', articleRoutes);

// Show authors articles
app.get("/author/:author_id", (req, res) => {
    let query = `SELECT article.*, author.name AS author_name FROM article join author on article.author_id=author.id where article.author_id = '${req.params.author_id}'`;
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        let author_name = result[0].author_name
        res.render("author", {
            articles: articles,
            author: author_name
        })
    })
});

app.listen(4000, () => {
    console.log('App is starting at http://localhost:4000')
})