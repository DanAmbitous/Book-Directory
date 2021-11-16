const booksContainer = document.querySelector(".books-container")
const template = document.querySelector(".book-subcontainer")
const removeParticularBook = document.querySelector("#remove-book")
const removeIndiviualBookInput = document.querySelector("#book-title-removal")
const removeAllBooks = document.querySelector("#clear-books")
const postBookButton = document.querySelector("#post-book")
const removedBookContainer = document.querySelector("#removed-book-feedback")
const editBookButton = document.querySelector("#edit-book")

postBookButton.addEventListener("click", postBook)
async function postBook() {
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const summary = document.querySelector("#summary").value
  const tag = document.querySelector("#tag").value

  const data = { title, author, summary, tag }

  fetch("http://localhost:9865/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  booksRenderer()
  clearInputs()
}

/*
async function editSpecificUser() {
  const username = document.querySelector("#specific-user-input-username").value
  const role = document.querySelector("#specific-user-input-role").value

  const responseFlow = await fetch(
    `http://localhost:9865/users/username/${
      document.querySelector("#specific-user-input-edit").value
    }`
  )
  const jsonData = await responseFlow.json()
  const id = jsonData._id

  const data = { username, role }

  await fetch(`http://localhost:9865/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  getAllUsers()
}
*/

editBookButton.addEventListener("click", editBook)
async function editBook() {
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const summary = document.querySelector("#summary").value
  const tag = document.querySelector("#tag").value

  const data = { title, author, summary, tag }

  const booksResponseFlow = await fetch(
    `http://localhost:9865/books/${title}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const booksJsonData = await booksResponseFlow.json()
  const id = booksJsonData._id

  console.log(id)
  clearInputs()
}

removeParticularBook.addEventListener("click", removeBook)
async function removeBook() {
  if (removeIndiviualBookInput.value.length === 0) {
    alert("Please type in the name of the book to remove it")
    return
  }

  removedBookContainer.textContent = ""

  const responseFlow = await fetch(
    `http://localhost:9865/books/title/${removeIndiviualBookInput.value}`
  )
  const data = await responseFlow.json()

  if (!data.title) {
    alert(
      `The book by the name of "${removeIndiviualBookInput.value}" doesn't exist`
    )
    return
  }

  const clone = contentRendering(data, true)
  removedBookContainer.append(clone)
  booksRenderer()

  await fetch(`http://localhost:9865/books/${removeIndiviualBookInput.value}`, {
    method: "DELETE",
  })

  booksRenderer()
}

removeAllBooks.addEventListener("click", deleteAllBooks)
async function deleteAllBooks() {
  await fetch(`http://localhost:9865/books`, {
    method: "DELETE",
  })

  booksRenderer()
}

async function getBooks() {
  const responseFlow = await fetch("http://localhost:9865/books")
  const books = await responseFlow.json()

  return books
}

booksRenderer()
async function booksRenderer() {
  booksContainer.textContent = ""

  const books = await getBooks()

  books.forEach((book) => {
    const clone = contentRendering(book)

    booksContainer.append(clone)
  })
}

function contentRendering(book, removed) {
  const clone = template.content.cloneNode(true)
  clone.querySelector(".title").textContent = book.title
  clone.querySelector(".author").textContent = book.author
  clone.querySelector(".summary").textContent = book.summary
  const tagContainer = document.createElement("div")
  tagContainer.textContent = book.tag
  clone.querySelector(".tag").append(tagContainer)
  clone.querySelector(".id").textContent = book._id
  clone.querySelector(".book-container").dataset.title = book.title

  if (removed) {
    clone.querySelector(".book-container").classList.add("removed")
  }

  return clone
}

function clearInputs() {
  const inputs = document.querySelectorAll("input")

  inputs.forEach((input) => {
    input.value = ""
  })

  console.log("hi")
}
