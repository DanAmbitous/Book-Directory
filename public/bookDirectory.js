async function getAllBooks() {
  const responseFlow = await fetch('http://localhost:9865/books')
  const objectData = await responseFlow.json()

  for (book of objectData) {    
    const bookContainer = document.createElement('div')
    const title = document.createElement('h2')
    title.textContent = book.title
    bookContainer.append(title)
    const summary = document.createElement('p')
    summary.textContent = book.summary
    bookContainer.append(summary)
    const author = document.createElement('p')
    author.textContent = book.author
    bookContainer.append(author)
    const bookId = document.createElement('p')
    bookId.textContent = book._id
    bookContainer.append(bookId)
    document.querySelector('.books-container').append(bookContainer)
  } 
}

async function getSpecificBook() {
  const responseFlow = await fetch(`http://localhost:9865/books/${document.querySelector('#book-id').value}`)
  const theBook = await responseFlow.json()

  document.querySelector('#book-output').innerHTML = `${theBook.title}<br>${theBook.summary}<br>${theBook.author}<br>${theBook._id}`
}

async function postBook() {
  const title = document.querySelector('#title').value
  const summary = document.querySelector('#summary').value
  const author = document.querySelector('#author').value

  const data = { title, summary, author }

  fetch('http://localhost:9865/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

async function deleteABook() {
  fetch(`http://localhost:9865/books/${document.querySelector('#book-id-delete').value}`, {
    method: 'DELETE'
  })
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "specific-book-searcher":
      getSpecificBook()
      break
    case "add-book":
      postBook()
      break
    case "book-search-for-delete":
      deleteABook()
      break
  }
})

document.addEventListener('DOMContentLoaded', () => {
  getAllBooks()
})