async function getAllUsers() {
  const responseFlow = await fetch("http://localhost:9865/users")
  const data = await responseFlow.json()

  document.querySelector("#get-all-users").innerHTML = ""
  console.log(data)
  data.forEach((user) => {
    const userContainer = document.createElement("div")
    const username = document.createElement("h2")
    const role = document.createElement("p")
    const id = document.createElement("p")
    username.innerHTML = user.username
    role.innerHTML = user.role
    id.innerHTML = user._id
    userContainer.append(username, role, id)
    document.querySelector("#get-all-users").append(userContainer)
  })
}

getAllUsers()

async function getSpecificUser() {
  const responseFlow = await fetch(
    `http://localhost:9865/users/username/${
      document.querySelector("#specific-user-input").value
    }`
  )
  const data = await responseFlow.json()

  document.querySelector("#specific-user-container").innerHTML = ""

  const userContainer = document.createElement("div")
  const username = document.createElement("h2")
  const role = document.createElement("p")
  const id = document.createElement("p")
  username.innerHTML = data.username
  role.innerHTML = data.role
  id.innerHTML = data._id
  userContainer.append(username, role, id)
  document.querySelector("#specific-user-container").append(userContainer)
}

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

async function deleteSpecificUser() {
  const responseFlow = await fetch(
    `http://localhost:9865/users/username/${
      document.querySelector("#specific-user-input-delete").value
    }`
  )
  const data = await responseFlow.json()

  document.querySelector("#specific-user-input-delete").innerHTML = ""

  const userContainer = document.createElement("div")
  const username = document.createElement("h2")
  const role = document.createElement("p")
  const id = document.createElement("p")
  username.innerHTML = data.username
  role.innerHTML = data.role
  id.innerHTML = data._id
  userContainer.append(username, role, id)
  document
    .querySelector("#specific-user-container-delete")
    .append(userContainer)

  await fetch(
    `http://localhost:9865/users/${
      document.querySelector("#specific-user-input-delete").value
    }`,
    {
      method: "DELETE",
    }
  )

  getAllUsers()
}

async function deleteAllUsers() {
  await fetch(`http://localhost:9865/users`, {
    method: "DELETE",
  })

  getAllUsers()
}

document.addEventListener("click", (event) => {
  switch (event.target.id) {
    case "search-specific-user":
      getSpecificUser()
      break
    case "search-specific-user-edit":
      editSpecificUser()
      break
    case "search-specific-user-delete":
      deleteSpecificUser()
      break
    case "delete-all-users":
      deleteAllUsers()
      break
  }
})
