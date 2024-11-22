const { json } = require("body-parser")
const User = require("../../models/User")

const findUserById = async(id) => {
    const foundUser = await User.findOne({_id:id})
    if(!foundUser){
        console.log("User not found.")
        return null
    }

    let user = JSON.parse(JSON.stringify(foundUser))
    delete user.password
    delete user.refreshToken
    delete user.email
    delete user.__v
    return user
}

module.exports = findUserById 