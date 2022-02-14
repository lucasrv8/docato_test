const express = require('express')
const router = express.Router()

// Import service
const userService = require('../service/userService')

// Define endpoint GET: list of users
router.get('/api/user', async function(req, res){
    const getAllUsers = await userService.getAllUsers()
    res.status(getAllUsers.status_code).json(getAllUsers)
})

// Define endpoint GET: user
router.get('/api/user/:id', async function(req, res){
    const getUser = await userService.getUser(req.params.id)
    res.status(getUser.status_code).json(getUser)
})

// Define endpoint POST: create user
router.post('/api/user', async function(req, res){
    const createUser = await userService.createUser(req.body)
    res.status(createUser.status_code).json(createUser)
})

// Define endpoint PUT: update user
router.put('/api/user/:id', async function(req, res){
    const updateUser = await userService.updateUser(req.params.id, req.body)
    res.status(updateUser.status_code).json(updateUser)
})

// Define endpoint DELETE: delete user
router.delete('/api/user/:id', async function(req, res){
    const deleteUser = await userService.deleteUser(req.params.id)
    res.status(deleteUser.status_code).json(deleteUser)
})

module.exports = router