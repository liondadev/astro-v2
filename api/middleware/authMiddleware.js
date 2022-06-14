/*
    Middleware for authentication management with JWT Tokens
*/

const jwt = require("jsonwebtoken")
const log = require("../utils/log")
const UserModel = require("../models/UserModel")
const { JWTSecret } = require("../config/jsonwebtoken")
const { userHasPermission } = require("../utils/roles")

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

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        userToken = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
        userToken = req.cookies.jwt
    } else {
        return res.status(400).json({
            success: false,
            errorCode: "userNotLoggedIn",
            message: "User is not logged in! (1)"
        })
    }

    if (!userToken) {
        return res.status(400).json({
            success: false,
            errorCode: "userNotLoggedIn",
            message: "User is not logged in! (2)"
        })
    }

    const [isVerified, decoded, verifyErr] = jwtVerify(userToken)
    if (!isVerified || verifyErr) {
        return res.status(400).json({
            success: false,
            errorCode: "userFailToVerifyJWT",
            message: "Failed to verify JWT Token"
        })
    }

    const foundUser = await UserModel.findOne({ uuid: decoded.uuid })
    if (!foundUser) {
        return res.status(400).json({
            success: false,
            errorCode: "userInvalidJWT",
            message: "Invalid JWT Token"
        })
    }

    // Deelete Sensitive Things
    const user = foundUser.toObject()
    user._id = undefined
    user.password = undefined
    user.passwordSalt = undefined

    // Set the req.user
    req.user = user
    next()
}

const protectedRoute = (permission) => (req, res, next) => {
    return userHasPermission(req.user.uuid, permission)
}

module.exports = {
    checkLoggedUser,
    protectedRoute
}
