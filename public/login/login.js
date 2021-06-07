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


  const message = responseOutcome.substring(0, 28)
  const id = responseOutcome.substring(28, 52)

  const responseFlowGet = await fetch(`http://localhost:9865/users/${id}`)
  const theData = await responseFlowGet.json()

  const role = theData.role

  document.querySelector('#logging-in-message').innerHTML = ""

  if (message === "Success, you have logged in!") {
    if (role === "basic") {
      window.location = "http://localhost:9865/basicUsers/basicUserPage.html?username=asfd&password=df"
    } else if (role === "admin") {
      window.location = "http://localhost:9865/adminUsers/adminUserPage.html"
    }

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