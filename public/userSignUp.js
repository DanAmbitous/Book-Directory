document.addEventListener('click', event => {
  switch (event.target.id) {
    case "submit-sign-up":
      createUser()
      break
  }
})

function roleDeterminer() {
  const role = document.querySelector('#role').value


  if (role === "admin") {
    console.log(role)

    document.querySelector('#sign-up-form').action = "http://localhost:9865/bookDirectory.html"
  } 
  
  if (role === "basic") {
    console.log(role)

    document.querySelector('#sign-up-form').action = "http://localhost:9865/bookGetter.html"
  }
}

async function createUser() {
  roleDeterminer()

  const username = document.querySelector('#username').value
  const role = document.querySelector("#role").value

  const data = {username, role}

  fetch('http://localhost:9865/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}