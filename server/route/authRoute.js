const express = require('express')
const router = express.Router()

// Import service
const authService = require('../service/authService')

// Define endpoint login
router.post('/login', async function(req, res){
    const validateUser = await authService.validateUser(req.body.username, req.body.password)
    res.status(validateUser.status_code).json(validateUser)
})

module.exports = router