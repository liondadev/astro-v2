/*
    The user controller
*/

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("../models/UserModel")
const { generateStr } = require("../utils/randstring")
const log = require("../utils/log")
const { v4: uuidv4, v4 } = require("uuid")
const { JWTSecret } = require("../config/jsonwebtoken")
const { passwordSaltRounds } = require("../config/bcrypt")

// POST: Signs a new user up
const signUpUser = async (req, res) => {
    try {
        // Get the user generated inputs.
        // NOTE: uuid, apiKey, passwordSalt, & roles need to be added manually
        const { username, password, email, firstName, lastName} = req.body
        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({
                success: false,
                errorCode: "invalid_input",
                message: "Invalid forum input!"
            })
        }

        // Search for other users with the email or username
        const foundUserEmail = await UserModel.findOne({email: email}).exec()
        const foundUserUsername = await UserModel.findOne({username: username}).exec()

        if (foundUserEmail || foundUserUsername) {
            return res.status(400).json({
                success: false,
                errorCode: "email_username_taken",
                message: "Another account has that email or username!" // TODO: Word this better
            })
        }

        // Generate the password salt and hash the password
        const passSalt = generateStr(24)
        const hashedPassword = await bcrypt.hash(`${password}-${passSalt}`, passwordSaltRounds)

        const createdUser = new UserModel({
            username: username,
            password: hashedPassword,
            passwordSalt: passSalt,
            email: email,
            firstName: firstName,
            lastName: lastName,
            uuid: uuidv4(),
            apiKey: generateStr(64),
            roles: []
        })
        await createdUser.save()

        let user = user.toObject()
        user._id = undefined
        user.password = undefined
        user.passwordSalt = undefined
        user.apiKey = undefined

        return res.status(201).json({
            success: true,
            data: {
                user
            }
        })
    } catch (e) {
        log(`Error when attempting to register user user:password.\nError:\n${e}\n\n`, "red")

        return res.status(500).json({
            success: false,
            errorCode: "internal_error",
            message: "An internal error has occured when attempting to save this data. This error has been logged!"
        })
    }
}

// POST: Signs a new user in
const logInUser = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body
        if (!usernameOrEmail || !password) {
            return res.status(400).json({
                success: false,
                errorCode: "invalid_input",
                message: "You didn't pass username/email or password!" // TODO: Make this more worded nicer
            })
        }
        let user = await UserModel.findOne({email: usernameOrEmail}).exec()
        if (!user) user = await UserModel.findOne({username: usernameOrEmail}).exec()
        if (!user) {
            return res.status(400).json({
                success: false,
                errorCode: "email_username_not_found",
                message: "A user with that Email or Username was not found!"
            })
        }

        // Check the password
        const passwordSalt = user.passwordSalt
        const passwordTotal = `${password}-${passwordSalt}`
        const passwordIsCorrect = await bcrypt.compare(passwordTotal, user.password)

        if (!passwordIsCorrect) {
            return res.status(403).json({
                success: false,
                errorCode: "authentication_failed",
                message: "Invalid Password!"
            })
        }

        // Sign a JWT Token, and send it to the client
        const token = jwt.sign({
            _id: user._id,
            apiKey: user.apiKey,
            uuid: user.uuid,
        }, JWTSecret)

        res.cookie("jwt", token) // We still need to handle this front-end, so this is only used for API calls on the backend

        return res.status(200).json({
            success: true,
            token: token
        })
    } catch (e) {
        log(`Error when attempting to login user ${usernameOrEmail}.\nError:\n${e}\n\n`, "red")

        return res.satus(500).json({
            success: false,
            errorCode: "internal_error",
            message: "An internal error has occured when attempting to retrieve this data. This error has been logged!"
        })
    }
}

const getLoggedInUser = (req, res) => {
    try {
        const user = req.user

        return res.status(200).json({
            success: true,
            data: { user }
        })
    } catch (e) {
        return res.status(404).json({
            success: false,
            errorCode: "userNotLoggedIn",
            message: "User is not signed in! (3)"
        })
    }
}

module.exports = {
    signUpUser,
    logInUser,
    getLoggedInUser
}
