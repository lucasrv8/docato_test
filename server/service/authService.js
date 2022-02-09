// const authData = require('../data/authData')

// require("dotenv-safe").config();
// const jwt = require('jsonwebtoken');


exports.validateUser = async function(username, password){
    const findUser = []//await authData.findUserByUsernameAndPassword(username, password)

    if(findUser.length > 0){
        let userId = findUser[0].id
        // Generate access token
        const token = jwt.sign({ userId }, process.env.SECRET, {
            expiresIn: 86400 // expires in 1 day
        });

        return {statusCode: 200, message: 'Login successfully', token: token }

    }else{
        return {statusCode: 401, message: 'Access not authorized: Invalid login'}
    }
}