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
    const bookImage = document.createElement('img')
    bookImage.src = book.image
    bookImage.alt = `Cover of ${book.title}`
    bookContainer.append(bookImage)
    bookContainer.append(bookId)
    document.querySelector('.books-container').append(bookContainer)
  } 
}

async function getSpecificBook() {
  const responseFlow = await fetch(`http://localhost:9865/books/${document.querySelector('#book-id').value}`)
  const theBook = await responseFlow.json()  

  document.querySelector('#book-output').innerHTML = `${theBook.title}<br>${theBook.summary}<br>${theBook.author}<br><img src="${theBook.image}" alt="${theBook.title}"><br>${theBook._id}`
}

async function postBook() {
  const title = document.querySelector('#title').value
  const summary = document.querySelector('#summary').value
  const author = document.querySelector('#author').value
  let image = document.querySelector('#book-covers').querySelector('.dd-selected-image').src

  imageChecker(image)

  const data = { title, summary, author, image }

  fetch('http://localhost:9865/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  reGetBooks()
}

async function deleteABook() {
  const responseFlow = await fetch(`http://localhost:9865/books/${document.querySelector('#book-id-delete').value}`)
  const data = await responseFlow.json()

  const bookContainer = document.createElement('div')
  const title = document.createElement('h2')
  title.textContent = data.title
  bookContainer.append(title)
  const summary = document.createElement('p')
  summary.textContent = data.summary
  bookContainer.append(summary)
  const author = document.createElement('p')
  author.textContent = data.author
  bookContainer.append(author)
  const bookId = document.createElement('p')
  bookId.textContent = data._id
  const bookImage = document.createElement('img')
  bookImage.src = data.image
  bookImage.alt = `Cover of ${data.title}`
  bookContainer.append(bookImage)
  bookContainer.append(bookId)
  document.querySelector('.deleted-book').append(bookContainer)

  fetch(`http://localhost:9865/books/${document.querySelector('#book-id-delete').value}`, {
    method: 'DELETE'
  })

  reGetBooks()
}

async function deleteAllBooks() {
  const responseFlow = await fetch('http://localhost:9865/books')  
  const data = await responseFlow.json()

  console.log(data)

  for (book of data) {  
    console.log(book)  
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
    document.querySelector('.deleted-all-books').append(bookContainer)
  } 

  fetch('http://localhost:9865/books', {
    method: 'DELETE',
  })

  reGetBooks()
}

function editABook() {
  const title = document.querySelector('#edit-title').value
  const summary = document.querySelector('#edit-summary').value
  const author = document.querySelector('#edit-author').value
  let image = document.querySelector('#patch-drop-down').querySelector('.dd-selected-image').src

  console.log(image)

  const data = {title, summary, author, image}

  fetch(`http://localhost:9865/books/${document.querySelector('#edit-books-id').value}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  reGetBooks()
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
    case "delete-all":
      deleteAllBooks()
      break
    case "edit-books-button":
      editABook()
      break
  }
})

document.addEventListener('DOMContentLoaded', () => {
  getAllBooks()
})

$('#book-covers').ddslick({
  onSelected: function(selectedData) {
    console.log(selectedData.selectedData.value)
  }   
})

$('#patch-drop-down').ddslick({
  onSelected: function(selectedData) {
    console.log(selectedData.selectedData.value)
  }   
})

function imageChecker(image) {
  if (image === 'https://i.postimg.cc/7Zxxvp8G/Screenshot-2021-06-01-224838.jpg') {
    image = 'https://i.postimg.cc/7Zxxvp8G/Screenshot-2021-06-01-224838.jpg'
  } 

  if (image === 'https://i.postimg.cc/FKRH225F/Screenshot-2021-06-02-113222.jpg') {
    image = 'https://i.postimg.cc/FKRH225F/Screenshot-2021-06-02-113222.jpg'
  }

  if (image === 'https://i.postimg.cc/C1nLKkxW/Screenshot-2021-06-02-113243.jpg') {
    image = 'https://i.postimg.cc/C1nLKkxW/Screenshot-2021-06-02-113243.jpg'
  }

  if (image === "https://i.postimg.cc/zfj3mRkn/Screenshot-2021-06-03-003820.jpg") {
    image = "https://i.postimg.cc/zfj3mRkn/Screenshot-2021-06-03-003820.jpg"
  }

  return image
}

async function reGetBooks() {
  document.querySelector('.books-container').innerHTML = ""

  const responseFlow = await fetch('http://localhost:9865/books')
  const getData = await responseFlow.json()

  for (book of getData) {    
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
    document.querySelector('.books-container').append(bookContainer)
  } 
}

// To automatically fill up the input elements if a matched entry is found
document.addEventListener('keyup', async event => {
  switch(event.target.id) {
    case "edit-books-id":
      const responseFlow = await fetch('http://localhost:9865/books')
      const data = await responseFlow.json()

      data.forEach(async entry => {
        if (document.querySelector('#edit-books-id').value === entry._id) {
          const responseFlow = await fetch(`http://localhost:9865/books/${document.querySelector('#edit-books-id').value}`)
          const data = await responseFlow.json()

          document.querySelector('#edit-title').value = data.title
          document.querySelector('#edit-summary').value = data.summary
          document.querySelector('#edit-author').value = data.author
        } else {
          document.querySelector('#edit-title').value = ""
          document.querySelector('#edit-summary').value = ""
          document.querySelector('#edit-author').value = ""
        }
      })
   break
  }
})

function autofill(entryIdentifier) {

}