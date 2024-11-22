const express = require('express');
const router = express.Router();
const { handleUserSignIn } = require('../controllers/userControllers/signInController.js')
const { handleUserSignUp } = require('../controllers/userControllers/signUpController.js')

router.get("/", (req, res) => {
    res.render('signIn')
})

router.post("/", handleUserSignIn)



router.get("/signUp", (req, res) => {
    res.render('signUp')
})

router.post("/signUp", handleUserSignUp, (req, res) => {
    console.log("Logging sign up attempt from /routes/authRoutes.js")
}) 

module.exports = router;