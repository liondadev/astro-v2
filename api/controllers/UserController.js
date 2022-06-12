/*
    The user controller
*/

const jwt = require("jwt")
const UserModel = require("../models/UserModel")

// This method signs a user up for the service
const signUpUser = (req, res) => {
    // Get the user generated inputs.
    // NOTE: uuid, apiKey, & roles need to be added manually
    const { username, password, email, firstName, lastName, phone} = req.body
}
