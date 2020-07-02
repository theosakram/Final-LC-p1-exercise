const express = require('express')
const CommandCenter = require('./controller/CommandCenter')
const books = require('./router/bookRoutes')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', CommandCenter.home)
app.get('/authors', CommandCenter.showAuthor)
app.use('/books', books)

app.listen(port, () => console.log(`Listening on port ${port}`))