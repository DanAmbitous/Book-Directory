async function loginFunctionality() {
  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value

  const data = {username, password}

  const responseFlow = await fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const responseOutcome = await responseFlow.text()

  document.querySelector('#logging-in-message').innerHTML = ""

  if (responseOutcome === "Success, you have logged in!") {
    window.location = "http://localhost:9865/basicUsers/basicUserPage.html?username=asfd&password=df"
  } else {
    document.querySelector('#logging-in-message').innerHTML = "Incorrect password or username"
  }
}

document.addEventListener('click', event => {
  switch(event.target.id) {
    case "login-button":
      loginFunctionality()
      break
  }
})