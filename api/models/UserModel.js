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
        unique: true,
        validate: {
            validator: (emailStr) => { // I really love regex (Just kidding, someone should make an easier way of doing thais)
                return String(emailStr).toLowerCase().match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
            },
            message: "Invalid email!"
        }
    },
    firstName: {
        type: String,
        required: [true, "Please enter a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name"]
    },
    passwordSalt: {
        type: String,
        required: [true, "Please add a password salt"]
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
