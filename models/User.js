const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // validate: [validateUsername, "Please enter a valid username"]
    },
    email: {
        type:String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, 'Minimum password length is 6 characters'],
        // validate: [validatePassword, "Please enter a valid password"]
    },
    projects: {
        type: Array,
        required: true,
    },
    notifications:{
        type: Array,
        required: true,
    },
    refreshToken: String,
    logsCreated: {
        type: Number,
        required: true,
    },
    logs: {
        type: Array
    }
})

module.exports = mongoose.model('Users', userSchema)