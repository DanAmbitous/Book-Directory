document.addEventListener('click', event => {
  switch (event.target.id) {
    case "submit-sign-up":
      createUser()
      break
  }
})

async function createUser() {
  const username = document.querySelector('#username').value
  const role = document.querySelector("#role").value

  console.log(username)

  const data = {username, role}

  fetch('http://localhost:9865/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}