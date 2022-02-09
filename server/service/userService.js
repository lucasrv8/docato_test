const userData = require('../data/userData')
const User = require('../model/user')

// require("dotenv-safe").config();
// const jwt = require('jsonwebtoken');


// const findUser = []//await authData.findUserByUsernameAndPassword(username, password)

// if(findUser.length > 0){
//     let userId = findUser[0].id
//     // Generate access token
//     const token = jwt.sign({ userId }, process.env.SECRET, {
//         expiresIn: 86400 // expires in 1 day
//     });

//     return {statusCode: 200, message: 'Login successfully', token: token }

// }else{
//     return {statusCode: 401, message: 'Access not authorized: Invalid login'}
// }
exports.getAllUsers = async function(){
    return {status_code: 200, users: await User.findAll()}
}

exports.getUser = async function(id){
    return {status_code: 200, user: await User.findOne({
        where: {id: id}
    })}
}


exports.createUser = async function(params){
    let userInstance = User.build(params)

    return await userInstance.save().then((result) => {
        return {status_code: 201, message: 'User created successfully'}
    }, (error) => {
        let errorMessages = []
        for(err of error.errors){
            errorMessages.push({
                field: err.path,
                rejectValue: err.value,
                message: err.message
            })
        }
        return {status_code: 400, message: 'User created failed', errors: errorMessages}
    })

}
exports.updateUser = async function(id, params){
    let userInstance = await User.findByPk(id)
    userInstance.set(params)

    return await userInstance.save().then((result) => {
        return {status_code: 201, message: 'User updated successfully'}
    }, (error) => {
        let errorMessages = []
        for(err of error.errors){
            errorMessages.push({
                field: err.path,
                rejectValue: err.value,
                message: err.message
            })
        }
        return {status_code: 400, message: 'Failed update user', errors: errorMessages}
    })
}