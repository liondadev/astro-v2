/*
    API Controller for the UserModel
*/

const UserModel = require('../models/UserModel')

exports.createUser = (req, res) => {
    try {
        const user = new UserModel.create(req.body)

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail'
        })
    }
}

exports.deleteUser = (req, res) => {
    try {
        const user = req.body
        
    } catch {

    }
}
