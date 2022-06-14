/*
    Remade Authentication routeer
*/
const express = require("express")
const router = express.Router()
const userController = require("../controllers/UserController")
const authMiddleware = require("../middleware/authMiddleware")


router.route("/signup")
    .post(userController.signUpUser)

router.route("/login")
    .post(userController.logInUser)

router.use(authMiddleware.checkLoggedUser)
router.route("/me")
    .get(userController.getLoggedInUser)

module.exports = router
