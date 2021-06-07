const express = require('express')
const router = express.Router()
const User = require('../models/usersPrototype')

const bcrypt = require('bcrypt')

//Get all users
router.get('/', getAllUsers, async (req, res) => {
  try {
    res.json(users)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get a user
router.get('/:id', getUser, (req, res) => {
  res.json(user)
})

//Get a user (Alternative way)
router.get('/username/:username', getUserByUsername, async (req, res) => {
  res.json(user)
})

/* 
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)

    if (user == null) {
      return res.status(404).json({message: `Can't find a user by the ID of ${req.params.id}`})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
  res.user = user
  next()
}
*/

//Create a user (Sign Up)
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    console.log(hashedPassword)

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: 'basic'
    })

    const newUser = await user.save()
    res.status(201).send(newUser)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Login
router.post('/login', async (req, res) => {
  let userArray = []

  userArray = ""

  userArray = await User.find()

  const user = userArray.find(user => user.username === req.body.username)

  if (user == null) {
    return res.status(400).send('Cannot find the user')
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send(`Success, you have logged in!${user._id}`)
    } else {
      res.send('Not allowed')
    }
  } catch {
    res.status(500).send()
  }
})

//Edit a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username
  }

  if (req.body.role != null) {
    res.user.role = req.body.role
  }

  try {
    console.log(res.user)

    const updatedUser = await res.user.save()

    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Delete all users
router.delete('/', getAllUsers, async (req, res) => {
  try {
    const usernames = []

    users.forEach(user => usernames.push(user.username))

    await User.find().deleteMany()

    res.json({message: `Removed all of the users ${usernames}`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Delete a user
router.delete('/:id', getUser, (req, res) => {
  try {
    const username = user.username

    user.remove()

    res.json({message: `Deleted ${username}`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Gets a specific entry (which is a user) from db by the id and returns it
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)

    if (user == null) {
      return res.status(404).json({message: `Can't find a user by the ID of ${req.params.id}`})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
  res.user = user
  next()
}

//Gets a specific document (the user) from the collection via its username property
async function getUserByUsername(req, res, next) {
  try {
    user = await User.find({username: req.params.username})

    if (user.length == 0) {
      return res.status(404).json({message: `Can't find a user by the username of ${req.params.username}`})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.user = user
  next()
}

//Gets all of the users
async function getAllUsers(req, res, next) {
  try {
    users = await User.find()
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.users = users

  next()
}

module.exports = router