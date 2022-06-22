/*
    Middleware for authentication management with JWT Tokens
*/

const jwt = require("jsonwebtoken")
const log = require("../utils/log")
const UserModel = require("../models/UserModel")
const { JWTSecret } = require("../config/jsonwebtoken")

// Function to verify a JWT Token
// We also return the decoded value
const jwtVerify = (jwtToken) => {
    // return good, decoded, err (optional)
    try {
        const decoded = jwt.verify(jwtToken, JWTSecret)
        return [true, decoded, null]
   } catch (e) {
        return [false, null, e]
   }
}

const checkLoggedUser = async (req, res, next) => {
    let userToken

    // Check first if the authorization header is sent with the request
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        userToken = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) { // Next check if we are able to get a 'jwt' cookie from the request
        userToken = req.cookies.jwt
    } else if (req.body && req.body.jwt) { // Next check if the JSON body of the reuqest contains the token in a 'jwt' property
        userToken = req.body.jwt
    } else if (req.body && req.body.apiKey) { // Check if the JSON body has the API key instead of the JWT Token
        // If we are using the apiKey, we should ignore the userToken stuff and do our own magic
        const apiKey = req.body.apiKey
        const foundUser = await UserModel.findOne({apiKey: apiKey}).exec()
        if (!foundUser) {
            return res.status(400).json({
                success: false,
                errorCode: "invalidAPIKey",
                message: "An invalid API Key was passed when this request was made. Make sure your 'apiKey' property in the JSON body is correct!"
            })
        }
        // Make a copy of the user's object
        // We also delete internal keys that would be unsafe
        // if sent to the client
        const user = foundUser.toObject()
        user._id = undefined
        user.password = undefined
        user.passwordSalt = undefined

        // Assign the req.user property to be equal to the user
        // from the API Key
        req.user = user
        next()
    } else {
        // If all fails, return a 400
        return res.status(400).json({
            success: false,
            errorCode: "userNotLoggedIn",
            message: "User is not logged in! (1)"
        })
    }

    // If it fails successfully, throw a 400
    // Yeah, I also don't know why this is here
    // Just go with the flow
    if (!userToken) {
        return res.status(400).json({
            success: false,
            errorCode: "userNotLoggedIn",
            message: "User is not logged in! (2)"
        })
    }

    // Verify the JWT Token
    const [isVerified, decoded, verifyErr] = jwtVerify(userToken)
    // If the token is invalid, or there was an error
    // Throw a 400
    if (!isVerified || verifyErr) {
        return res.status(400).json({
            success: false,
            errorCode: "userFailToVerifyJWT",
            message: "Failed to verify JWT Token"
        })
    }

    // Find the user from the JWT Token's decoded UUID
    const foundUser = await UserModel.findOne({ uuid: decoded.uuid })

    // If the foundUser is not found, throw a 400 with userInvalidJWT
    if (!foundUser) {
        return res.status(400).json({
            success: false,
            errorCode: "userInvalidJWT",
            message: "Invalid JWT Token"
        })
    }

    // Delete sensitive things
    // (before they are sent to the client)
    const user = foundUser.toObject()
    user._id = undefined
    user.password = undefined
    user.passwordSalt = undefined

    // Set the req.user property for future requests
    req.user = user
    next()
}

const protectedRoute = (permission) => (req, res, next) => {
    return false // TODO: Update this with the new role system
}

module.exports = {
    checkLoggedUser,
    protectedRoute
}
