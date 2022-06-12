/*
    Auth Routes
*/
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { JWTSecret, JWTExpires, JWTCookieExpires } = require("../config/jsonwebtoken")
const UserModel = require("../models/UserModel")

const signToken = (uuid) => {
    jwt.sign({ uuid }, JWTSecret, {
        expiresIn: JWTExpires
    })
}

const createToken = (user, status, req, res) => {
    const userToken = signToken(user.uuid)
    const cookieSettings = {
        expires: new Date(Date.now() + JWTCookieExpires * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] == "https"
    }

    res.cookie("jwt", userToken, cookieSettings)

    user.password = undefined
    res.status(status).json({
        status: "success",
        token,
        data: { user }
    })
}

const SignUpUser = async (username, email, password, req, res) => {

    try {
        // Hash the password

        const createdUser = new UserModel({
            
        })

    } catch {
        res.status(500).json({
            status: "fail"
        })
    }
}
