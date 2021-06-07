async function signUserUp() {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  const data = {username, password}

  fetch('http://localhost:9865/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "sign-up-button":
      signUserUp()
      break
  }
})
