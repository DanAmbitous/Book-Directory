async function getData() {
  const responseFlow = await fetch('http://localhost:9865/users')
  const data = await responseFlow.json()

  const entry = data[data.length - 1]

  document.querySelector('#username').textContent = entry.username
  document.querySelector('#role').textContent = entry.role
}

getData()

async function roleChecker() {
  const responseFlow = await fetch('http://localhost:9865/users')
  const data = await responseFlow.json()

  const entry = data[data.length - 1]

  if (entry.role === "admin") {
    document.querySelector('#the-role').textContent = "admin"
    document.querySelector('#next-page-link').href = "http://localhost:9865/bookDirectory.html?title=dfgh&summary=fdhg&author=dfgh"
  } else {
    document.querySelector('#the-role').textContent = "basic"
  }
}

roleChecker()