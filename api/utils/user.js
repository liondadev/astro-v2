/*
    Utilities for user management
*/

const UserModel = require("../models/UserModel")

const generateStr = require("../utils/randstring")
const { v4: uuidv4 } = require('uuid');
const { emailRegex, phoneRegex } = require("../config/regex");
const { passwordSaltRounds } = require("../config/bcrypt");

const createUser = async (username, password, email, firstName, lastName, phone) => {
    if (!username || !password || !email || !firstName || !lastName || !phone) return false, "One of the required values was not provided!"

    // Generate UUID & APIKey
    const apiKey = generateStr(64)
    const uuid = uuidv4()

    // Validate the email & phone number
    const valid = (email.match(emailRegex) && phone.match(phoneRegex))
    if (!valid) return false, "Email or Phone Number is not valid!"

    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, passwordSaltRounds)

        const user = new UserModel({
            username: username,
            password: hashedPassword,
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            uuid: uuid,
            apiKey: apiKey,
            roles: []
        })
        await user.save()
        return true, "User created & Saved correctly!"
    } catch (e) {
        // Log the error, just incase
        log(`Exception when creating user:\n${e}`, red)

        return false, "Error when creating user!"
    }
}

const login = (emailOrUsername, password) => {
    if (!emailOrUsername || !password) return false, "Email/Username or Password not provided!"
}
