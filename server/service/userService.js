const User = require('../model/user')

exports.getAllUsers = async function(){
    return {status_code: 200, users: await User.findAll()}
}


exports.getUser = async function(id){
    const userInstance = await User.findOne({
        where: {id: id}
    })

    if(userInstance){
        return {status_code: 200, user: userInstance}
    }else{
        return {status_code: 404, message: 'User not found'}
    }
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
exports.deleteUser = async function(id){
    return await User.destroy({where: {id:id}}).then((result) => {
        return {status_code: 201, message: 'User deleted successfully'}
    }, (error) => {
        console.log(error);
        return {status_code: 400, message: 'Failed delete user', errors: errorMessages}
    })
}