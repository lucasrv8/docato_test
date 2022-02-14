require("dotenv-safe").config()
const User = require('../model/user')
const jwt = require('jsonwebtoken')

exports.validateUser = async function(username, password){
    let findUserInstance = await User.findOne({
        where: {
            username: username,
            password: password
        }
    })


    if(findUserInstance){
        let userId = findUserInstance.id
        
        // Generate access token
        const token = jwt.sign({ userId }, process.env.SECRET, {
            // expires in 1 day
            expiresIn: 86400 
        });

        return {status_code: 200, message: 'Login successfully', token: token, username: findUserInstance.username }

    }else{
        return {status_code: 401, message: 'Access not authorized: Invalid login'}
    }
}