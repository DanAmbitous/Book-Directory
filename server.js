require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 9865

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.json())


const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to the Database'))

app.use(express.static('public'))

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))