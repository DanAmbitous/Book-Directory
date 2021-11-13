const booksContainer = document.querySelector(".books-container")
const template = document.querySelector(".book-subcontainer")
const removeParticularBook = document.querySelector("#remove-book")
const removeAllBooks = document.querySelector("#clear-books")
const postBookButton = document.querySelector("#post-book")

// const booksContainer = document.querySelector("#books-container")
// let thePageIndex = document.querySelector('#page-index').innerHTML

// async function getAllBooks() {
//   const responseFlow = await fetch('http://localhost:9865/books')
//   const objectData = await responseFlow.json()

//   for (book of objectData) {
//     const bookContainer = document.createElement('div')
//     const title = document.createElement('h2')
//     title.textContent = book.title
//     bookContainer.append(title)
//     const summary = document.createElement('p')
//     summary.textContent = book.summary
//     bookContainer.append(summary)
//     const author = document.createElement('p')
//     author.textContent = book.author
//     bookContainer.append(author)
//     const bookId = document.createElement('p')
//     bookId.textContent = book._id
//     const bookImage = document.createElement('img')
//     bookImage.src = book.image
//     bookImage.alt = `Cover of ${book.title}`
//     bookContainer.append(bookImage)
//     bookContainer.append(bookId)
//     document.querySelector('#books-container').append(bookContainer)
//   }
// }

// let pageIndex = Number(thePageIndex)

// async function paginatedData(index) {
//   booksContainer.innerHTML = ""
//   thePageIndex = index

//   const responseFlow = await fetch(`http://localhost:9865/books/bookPagination?page=${index}&limit=10`)
//   const data = await responseFlow.json()

//   const output = data.output

//   output.forEach(entry => {
//     const container = document.createElement('div')
//     const p = document.createElement('p')

//     p.innerHTML = entry.name
//     container.append(p)

//     booksContainer.append(container)
//   })
// }

// paginatedData(pageIndex)

// async function nextButtonFunctionality() {
//   pageIndex++

//   paginatedData(pageIndex)

//   const responseFlowAhead = await fetch(`http://localhost:9865/books/bookPagination?page=${pageIndex + 1}&limit=10`)
//   const dataAhead = await responseFlowAhead.json()

//   const outputAhead = dataAhead.output

//   if (outputAhead.length !== 0) {
//     paginatedData(pageIndex)
//   } else {
//     document.querySelector('#next').setAttribute('disabled', 'true')
//     document.querySelector('#previous').removeAttribute('disabled')
//   }
// }

// nextButtonFunctionality()

// async function previousButtonFunctionality() {
//   pageIndex--

//   paginatedData(pageIndex)

//   const responseFlowAhead = await fetch(`http://localhost:9865/books/bookPagination?page=${pageIndex - 1}&limit=10`)
//   const dataAhead = await responseFlowAhead.json()

//   const outputAhead = dataAhead.output

//   if (pageIndex !== 1) {
//     paginatedData(pageIndex)
//   } else {
//     document.querySelector('#previous').setAttribute('disabled', 'true')
//     document.querySelector('#next').removeAttribute('disabled')
//   }
// }

// document.querySelector()

// previousButtonFunctionality()

// async function getSpecificBook() {
//   if (document.querySelector('#book-id').value.length > 0) {
//     document.querySelector('.edit-message').innerHTML = ""

//     const responseFlow = await fetch(`http://localhost:9865/books/title/${document.querySelector('#book-id').value}`)
//     const theBook = await responseFlow.json()

//     document.querySelector('#book-output').innerHTML = `${theBook.title}<br>${theBook.summary}<br>${theBook.author}<br><img src="${theBook.image}" alt="${theBook.title}"><br>${theBook._id}`
//   } else {
//     document.querySelector('.edit-message').innerHTML = "You need to provide the book's title"
//   }
// }

postBookButton.addEventListener("click", postBook)

async function postBook() {
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const summary = document.querySelector("#summary").value
  const tag = document.querySelector("#tag").value

  // let image = document.querySelector('#book-covers').querySelector('.dd-selected-image').src
  // const image = document.querySelector('#book-cover').value

  const data = { title, author, summary, tag /*image*/ }

  fetch("http://localhost:9865/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  booksRenderer()
}

/*
async function getAllUsers() {
  const responseFlow = await fetch("http://localhost:9865/users")
  const data = await responseFlow.json()

  document.querySelector("#get-all-users").innerHTML = ""
  console.log(data)
  data.forEach((user) => {
    console.log(user.date)
    const userContainer = document.createElement("div")
    const username = document.createElement("h2")
    const role = document.createElement("p")
    const joinedDate = document.createElement("p")
    const id = document.createElement("p")
    const hr = document.createElement("hr")
    username.innerHTML = user.username
    role.innerHTML = user.role
    joinedDate.innerHTML = user.date
    id.innerHTML = user._id
    userContainer.append(username, role, joinedDate, id, hr)
    document.querySelector("#get-all-users").append(userContainer)
  })
}

getAllUsers()
*/

// async function deleteABook() {
//   const responseFlow = await fetch(`http://localhost:9865/books/title/${document.querySelector('#book-id-delete').value}`)
//   const data = await responseFlow.json()

//   const id = data._id

//   const bookContainer = document.createElement('div')
//   const title = document.createElement('h2')
//   title.textContent = data.title
//   bookContainer.append(title)
//   const summary = document.createElement('p')
//   summary.textContent = data.summary
//   bookContainer.append(summary)
//   const author = document.createElement('p')
//   author.textContent = data.author
//   bookContainer.append(author)
//   const bookId = document.createElement('p')
//   bookId.textContent = data._id
//   const bookImage = document.createElement('img')
//   bookImage.src = data.image
//   bookImage.alt = `Cover of ${data.title}`
//   bookContainer.append(bookImage)
//   bookContainer.append(bookId)
//   document.querySelector('.deleted-book').append(bookContainer)

//   fetch(`http://localhost:9865/books/${id}`, {
//     method: 'DELETE'
//   })

//   reGetBooks()
// }

// async function deleteAllBooks() {
//   const responseFlow = await fetch('http://localhost:9865/books')
//   const data = await responseFlow.json()

//   for (book of data) {
//     console.log(book)
//     const bookContainer = document.createElement('div')
//     const title = document.createElement('h2')
//     title.textContent = book.title
//     bookContainer.append(title)
//     const summary = document.createElement('p')
//     summary.textContent = book.summary
//     bookContainer.append(summary)
//     const author = document.createElement('p')
//     author.textContent = book.author
//     bookContainer.append(author)
//     const bookId = document.createElement('p')
//     bookId.textContent = book._id
//     const bookImage = document.createElement('img')
//     bookImage.src = book.image
//     bookImage.alt = `Cover of ${book.title}`
//     bookContainer.append(bookImage)
//     bookContainer.append(bookId)
//     document.querySelector('.deleted-all-books').append(bookContainer)
//   }

//   fetch('http://localhost:9865/books', {
//     method: 'DELETE',
//   })

//   reGetBooks()
// }

// async function editABook() {
//   const title = document.querySelector('#edit-title').value
//   const summary = document.querySelector('#edit-summary').value
//   const author = document.querySelector('#edit-author').value
//   let image = document.querySelector('#patch-drop-down').querySelector('.dd-selected-image').src

//   const data = {title, summary, author, image}

//   const responseFlow = await fetch(`http://localhost:9865/books/title/${document.querySelector('#edit-books-id').value}`)
//   const jsonData = await responseFlow.json()

//   const id = jsonData._id

//   console.log(jsonData)

//   fetch(`http://localhost:9865/books/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })

//   reGetBooks()
// }

// document.addEventListener('DOMContentLoaded', () => {
//   getAllBooks()
// })

// $('#book-covers').ddslick({
//   onSelected: function(selectedData) {

//   }
// })

// $('#patch-drop-down').ddslick({
//   onSelected: function(selectedData) {

//   }
// })

// function imageChecker(image) {
//   if (image === 'https://i.postimg.cc/7Zxxvp8G/Screenshot-2021-06-01-224838.jpg') {
//     image = 'https://i.postimg.cc/7Zxxvp8G/Screenshot-2021-06-01-224838.jpg'
//   }

//   if (image === 'https://i.postimg.cc/FKRH225F/Screenshot-2021-06-02-113222.jpg') {
//     image = 'https://i.postimg.cc/FKRH225F/Screenshot-2021-06-02-113222.jpg'
//   }

//   if (image === 'https://i.postimg.cc/C1nLKkxW/Screenshot-2021-06-02-113243.jpg') {
//     image = 'https://i.postimg.cc/C1nLKkxW/Screenshot-2021-06-02-113243.jpg'
//   }

//   if (image === "https://i.postimg.cc/zfj3mRkn/Screenshot-2021-06-03-003820.jpg") {
//     image = "https://i.postimg.cc/zfj3mRkn/Screenshot-2021-06-03-003820.jpg"
//   }

//   return image
// }

// async function reGetBooks() {
//   document.querySelector('.books-container').innerHTML = ""

//   const responseFlow = await fetch('http://localhost:9865/books')
//   const getData = await responseFlow.json()

//   for (book of getData) {
//     const bookContainer = document.createElement('div')
//     const title = document.createElement('h2')
//     title.textContent = book.title
//     bookContainer.append(title)
//     const summary = document.createElement('p')
//     summary.textContent = book.summary
//     bookContainer.append(summary)
//     const author = document.createElement('p')
//     author.textContent = book.author
//     bookContainer.append(author)
//     const bookId = document.createElement('p')
//     bookId.textContent = book._id
//     const bookImage = document.createElement('img')
//     bookImage.src = book.image
//     bookImage.alt = `Cover of ${book.title}`
//     bookContainer.append(bookImage)
//     bookContainer.append(bookId)
//     document.querySelector('.books-container').append(bookContainer)
//   }
// }

document.addEventListener("click", (event) => {
  switch (event.target.id) {
    // case "specific-book-searcher":
    //   getSpecificBook()
    //   break
    case "post-book":
      postBook()
      break
    // case "book-search-for-delete":
    //   deleteABook()
    //   break
    // case "delete-all":
    //   deleteAllBooks()
    //   break
    // case "edit-books-button":
    //   editABook()
    //   break
    // case "next":
    //   nextButton()
    //   break
    // case "previous":
    //   previousButton()
    //   break
  }
})

// function nextButton() {
//   nextButtonFunctionality()
// }

// function previousButton() {
//   previousButtonFunctionality()
// }

// To automatically fill up the input elements if a matched entry is found
// document.addEventListener('keyup', async event => {
//   switch(event.target.id) {
//     case "edit-books-id":
//       const responseFlow = await fetch('http://localhost:9865/books')
//       const data = await responseFlow.json()

//       data.forEach(async entry => {
//         if (document.querySelector('#edit-books-id').value === entry._id) {
//           const responseFlow = await fetch(`http://localhost:9865/books/${document.querySelector('#edit-books-id').value}`)
//           const data = await responseFlow.json()

//           document.querySelector('#edit-title').value = data.title
//           document.querySelector('#edit-summary').value = data.summary
//           document.querySelector('#edit-author').value = data.author
//         } else {
//           document.querySelector('#edit-title').value = ""
//           document.querySelector('#edit-summary').value = ""
//           document.querySelector('#edit-author').value = ""
//         }
//       })
//    break
//   }
// })

// async function deleteSpecificUser() {
//   const responseFlow = await fetch(
//     `http://localhost:9865/users/username/${
//       document.querySelector("#specific-user-input-delete").value
//     }`
//   )
//   const data = await responseFlow.json()

//   document.querySelector("#specific-user-input-delete").innerHTML = ""

//   const userContainer = document.createElement("div")
//   const username = document.createElement("h2")
//   const role = document.createElement("p")
//   const id = document.createElement("p")
//   username.innerHTML = data.username
//   role.innerHTML = data.role
//   id.innerHTML = data._id
//   userContainer.append(username, role, id)
//   document
//     .querySelector("#specific-user-container-delete")
//     .append(userContainer)

//   await fetch(
//     `http://localhost:9865/users/${
//       document.querySelector("#specific-user-input-delete").value
//     }`,
//     {
//       method: "DELETE",
//     }
//   )

//   getAllUsers()
// }

removeParticularBook.addEventListener("click", removeBook)
async function removeBook() {
  // const responseFlow = await fetch(
  //   `http://localhost:9865/books/title/${
  //     document.querySelector("#book-title-removal").value
  //   }`
  // )
  // const data = await responseFlow.json()
  // console.log(data)
  // await fetch(
  //   `http://localhost:9865/users/${
  //     document.querySelector("#specific-user-input-delete").value
  //   }`
  // )
}

removeAllBooks.addEventListener("click", deleteAllBooks)
async function deleteAllBooks() {
  await fetch(`http://localhost:9865/books`, {
    method: "DELETE",
  })

  getBooks()
  booksRenderer()
}

async function getBooks() {
  const responseFlow = await fetch("http://localhost:9865/books")
  const books = await responseFlow.json()

  return books
}

booksRenderer()
async function booksRenderer() {
  const books = await getBooks()

  books.forEach((book) => {
    const clone = template.content.cloneNode(true)
    clone.querySelector(".title").textContent = book.title
    clone.querySelector(".author").textContent = book.author
    clone.querySelector(".summary").textContent = book.summary
    const tagContainer = document.createElement("div")
    tagContainer.textContent = book.tag
    clone.querySelector(".tag").append(tagContainer)
    clone.querySelector(".id").textContent = book._id
    clone.querySelector(".book-container").dataset.title = book.title

    booksContainer.append(clone)
  })
}
