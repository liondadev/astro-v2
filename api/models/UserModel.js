/*
    The User's mongoose model
*/

const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Please enter a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name"]
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone number"]
    },
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    roles: [{ // The user has an array of roles, each with a different set of permissions
        type: String
    }],
})

const UserModel = new mongoose.model("User", UserSchema)
module.exports = UserModel
