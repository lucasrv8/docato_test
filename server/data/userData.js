const User = require('../model/user')

exports.findAllUsers = async function(){
    return await User.findAll()
}

exports.createNewUser = async function(params){
    return await User.create(params)
}