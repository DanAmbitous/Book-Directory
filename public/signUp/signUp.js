const usernameFeedback = document.querySelector('#username-error-feedback')

$('#username').on('keypress', function (event) {
  var regex = new RegExp("^[a-zA-Z0-9]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (!regex.test(key)) {
    console.log('asdf')
     event.preventDefault();
     return false;
  }
});

async function signUserUp() {
  const username = document.querySelector('#username').value

  if (username.length > 10) {
    usernameFeedback.textContent = "Your username needs to be less when 10 characters"
  } else {
    const responseFlow = await fetch(`http://localhost:9865/users/username/${document.querySelector("#username").value}`)
    const data = await responseFlow.json()

    if (data.role != 'basic' && data.role != 'admin') {
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
    
      window.location = 'http://localhost:9865/login/login.html'  
    } else {
      usernameFeedback.textContent = "The username is already taken"
    }
  }
}

document.addEventListener('click', event => {
  switch (event.target.id) {
    case "sign-up-button":
      signUserUp()
      break
  }
})
