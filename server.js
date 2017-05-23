const express = require('express')
const app = express()
const request = require('request')
app.use(express.static('public'))

// set 'html' as the engine, using ejs's renderFile function

var ejs = require('ejs');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

let books;

request('https://mutably.herokuapp.com/books', (err, res, body) => {
  books = body
  console.log(body)
})

app.get('/', (req, res) => {
  res.render('index', {books: books})
})

app.get('/books', (req, res) => {
  res.redirect('/')
})

app.post('/books', (req, res) => {
  res.redirect('/')
})

app.get('/books/:id', (req, res) => {
  res.redirect('/')
})

app.put('/books:id', (req, res) => {
  res.redirect('/')
})

app.delete('/books/:id', (req, res) => {
  res.redirect('/')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})