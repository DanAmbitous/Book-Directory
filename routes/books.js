const express = require('express')
const router = express.Router()
const bookSchema = require('../models/bookPrototype.js')

let bookSamples = [
 
]

async function getAllDocuments() {
  const bookDocuments = await bookSchema.find()

  bookDocuments.forEach(async bookDocument => bookSamples.push(bookDocument))

  return bookDocuments
}
getAllDocuments().then(response => response) //{
//   router.get('/bookPagination', paginatedResults(response), (req, res) => {

//   res.json(res.paginatedResults)
//   })
// })

router.get('/bookPagination', async (req, res) => {
  try {
    const bookDocuments = await bookSchema.find()

    console.log(bookDocuments)

    // paginatedResults(bookSamples)
  
    res.json(res.paginatedResults)
  } catch (error) {
    res.json({message: error})
  }
})

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
router.get('/:id', getABook, (req, res) => {
  res.json(res.book)
})

//Getting one via title
router.get('/title/:title', getBookByTitle, (req, res) => {
  res.json(res.book)
})

//Creating one
router.post('/', async (req, res) => {
  const book = new bookSchema({
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author,
    image: req.body.image
  })

  try {
    // console.log(book)

    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({message: error.message}) 
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

  next()
}

async function getBookByTitle(req, res, next) {
  try {
    book = await bookSchema.find({title: req.params.title})

    // console.log(book)

    if (book.length == 0) {
      return res.status(404).json({message: `Can't find a book by the username of ${req.params.title}`})
    }

    book = book[0]

  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.book = book
  next()
}

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
  
    const startIndex = (page- 1) * limit
    const endIndex = page * limit
  
    const results = {}
  
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
  
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
  
    results.output = model.slice(startIndex, endIndex)
  
    res.paginatedResults = results
    next()
  }
}

module.exports = router
