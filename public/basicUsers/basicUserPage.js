async function getAllBooks() {
  const responseFlow = await fetch('http://localhost:9865/books')
  let data = await responseFlow.json()

  for (book of data) {    
    bookRenderer('all-books', book)
  } 
}

getAllBooks() 

document.addEventListener('click', event => {
  switch(event.target.id) {
    case "find-book":
      getBook()
      break
  }
})

async function getBook() {
  const responseFlow = await fetch(`http://localhost:9865/books/title/${document.querySelector('#book-id').value}`)
  const data = await responseFlow.json()
  
  document.querySelector('.get-book').innerHTML = ""

  bookRenderer('get-book', data)
}

function bookRenderer(container, book) {
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
  const bookImage = document.createElement('img')
  bookImage.src = book.image
  bookImage.alt = `Cover of ${book.title}`
  bookContainer.append(bookImage)
  bookContainer.append(bookId)
  document.querySelector(`.${container}`).append(bookContainer)
}