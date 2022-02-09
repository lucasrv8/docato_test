const express = require('express')
const router = express.Router()

// Import service
const userService = require('../service/userService')

// Define endpoint GET: list of users
router.get('/user', async function(req, res){
    const getAllUsers = await userService.getAllUsers()
    res.status(getAllUsers.status_code).json(getAllUsers)
})

// Define endpoint GET: user
router.get('/user/:id', async function(req, res){
    const getUser = await userService.getUser(req.params.id)
    res.status(getUser.status_code).json(getUser)
})

// Define endpoint POST: create user
router.post('/user', async function(req, res){
    const createUser = await userService.createUser(req.body)
    res.status(createUser.status_code).json(createUser)
})

// Define endpoint PUT: update user
router.put('/user/:id', async function(req, res){
    const updateUser = await userService.updateUser(req.params.id, req.body)
    res.status(updateUser.status_code).json(updateUser)
})

module.exports = router