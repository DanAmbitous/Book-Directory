const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/userPrototype')

//Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.send(users)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get one user
router.get('/:id', getUser, (req , res) => {
  res.send(res.user)
})

//Create a user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    role: req.body.role
  })

  try {
    //Saves the data of newUser to the database
    const newUser = await user.save()

    res.status(201).json(newUser)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
})

//Update a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name
  }

  if (req.body.role != null) {
    res.user.role = req.body.role
  }

  try {
    const updatedUser = await res.user.save()
    
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Delete all users
router.delete('/', async (req, res) => {
  try {
    const users = await User.find()

    users.forEach(user => {
      let userIndex = findIndex(user)

      console.log(userIndex)

      // if ()
      theUsers.push(`${user.name}`)  
    })

    console.log(theUsers)

    console.log(users)

    await User.find().deleteMany()

    res.json({message: `Deleted all of the users ${theUsers}`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()

    res.json({message:`Removed the user of ${res.user}`})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)

    if (user == null) {
      return res.status(404).json({message: `Cannot find the user by the id of ${req.params.id}`})
    }
  } catch (error) {
    res.status(500).json({message: error.message})    
  }

  res.user = user
  
  next()
}

module.exports = router
