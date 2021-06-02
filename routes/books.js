const express = require('express')
const router = express.Router()
const bookSchema = require('../models/bookPrototype.js')

//Getting all
router.get('/', async (req, res) => {
  try {
    const books = await bookSchema.find()

    res.json(books)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Getting one
router.get('/:id', getABook, async (req, res) => {
  res.json(res.book)
})

//Creating one
router.post('/', async (req, res) => {
  const book = new bookSchema({
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author
  })

  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({message: error.message}) 
  }
})

//Updating one
router.patch('/:id', getABook, async (req, res) => {
  //Checks if the request's body (content) and title property (from schema object probably isn't empty)
  if (req.body.title != null) {

    //If it isn't the response's book object and title property will gain the value of the request's body title property
    res.book.title = req.body.title
  }

  if (req.body.summary != null) {
    res.book.summary = req.body.summary
  }

  if (req.body.author != null) {
    res.book.author = req.body.author
  }

  if (req.body.image != null) {
    res.book.image = req.body.image
  }

  try {
    const updatedBook = await res.book.save()

    res.json(updatedBook)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Deleting all
router.delete('/', async (req, res) => {
  try {
    const books = await bookSchema.find()

    const bookStorer = books

    console.log(bookStorer)

    await bookSchema.deleteMany()

    if (books.length > 0) {
      res.send(`Deleted the following books ${bookStorer.map(book => ` ${book.title}`)}`)
    } else {
      res.send("There aren't any books")
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Deleting one
router.delete('/:id', getABook, async (req, res) => {
  try {
    await res.book.remove()

    res.json({message: `Deleted book "${book.title}" successfully`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Middleware to not do the DRY
async function getABook(req, res, next) {
  try {
    book = await bookSchema.findById(req.params.id)

    if (book == null) {
      return res.status(404).json({message: `Cannot find the book by the id of ${req.params.id}`})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.book = book

  next()
}

module.exports = router
