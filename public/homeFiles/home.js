// const postBooksIcon = document.querySelector('#information-section-post-books')
// const searchBooksIcon = document.querySelector('#information-section-search-books')

// postBooksIcon.addEventListener('mouseenter', () => {
//   document.querySelector('#information-post-books').classList.remove('visibilityOff')
// })

// postBooksIcon.addEventListener('mouseout', () => {
//   document.querySelector('#information-post-books').classList.add('visibilityOff')
// })

// searchBooksIcon.addEventListener('mouseenter', () => {
//   document.querySelector('#information-search-books').classList.remove('visibilityOff')
// })

// searchBooksIcon.addEventListener('mouseout', () => {
//   document.querySelector('#information-search-books').classList.add('visibilityOff')
// })

function postBooks() {
  window.location.href =
    "http://localhost:9865/bookDirectory/bookDirectory.html"
}

function searchBooks() {
  window.location.href = "http://localhost:9865/basicUsers/basicUserPage.html"
}

document.addEventListener("click", (event) => {
  switch (event.target.id) {
    case "post-books":
      postBooks()
      break
    case "search-books":
      searchBooks()
      break
  }
})
