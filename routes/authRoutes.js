const express = require('express');
const router = express.Router();
const { handleUserSignIn } = require('../controllers/userControllers/signInController.js')
const { handleUserSignUp } = require('../controllers/userControllers/signUpController.js')





router.post("/", handleUserSignIn)


router.get("/", (req, res) => {
    console.log("get /signIn hit")
    res.render('signIn')
})


router.get("/signUp", (req, res) => {
    console.log("get /signIn/signUp hit")
    res.render('signUp')
})

router.post("/signUp", handleUserSignUp, (req, res) => {
    console.log("post /signIn/signUp hit")
    console.log("Logging sign up attempt from /routes/authRoutes.js")
})

module.exports = router;