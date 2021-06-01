async function getBook() {
  const responseFlow = await fetch('http://localhost:9865/books')
  const objectData = await responseFlow.json()

  for (book of objectData) {    
    const bookContainer = document.createElement('div')
    const title = document.createElement('h2')
    title.textContent = JSON.stringify(book.title)
    bookContainer.append(title)
    const summary = document.createElement('p')
    summary.textContent = JSON.stringify(book.summary)
    bookContainer.append(summary)
    const author = document.createElement('p')
    author.textContent = JSON.stringify(book.author)
    bookContainer.append(author)
    const bookId = document.createElement('p')
    bookId.textContent = JSON.stringify(book._id)
    bookContainer.append(bookId)
    document.querySelector('.books-container').append(bookContainer)
  } 
}

getBook()

async function getSpecificBook() {
  const responseFlow = await fetch(`http://localhost:9865/books/${document.querySelector('#book-id').value}`)
  const theBook = await responseFlow.json()
  const bookDataJsonififed = JSON.stringify(theBook)
  
  console.log(theBook)

  // document.querySelector('#book-output').textContent = bookDataJsonififed.title
  
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "specific-book-searcher":
      getSpecificBook()
      break
  }
})