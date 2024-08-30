const express = require('express');
const router = express.Router();
const { handleUserSignIn } = require('../controllers/signInController.js')
const { handleUserSignUp } = require('../controllers/signUpController.js')

router.get("/signIn", (req, res) => {
    res.render('signIn')
})

router.post("/signIn", handleUserSignIn)



router.get("/signUp", (req, res) => {
    res.render('signUp')
})

router.post("/", handleUserSignUp, (req, res) => {
    console.log("Logging sign in attempt from /routes/authRoutes.js")
}) 


router.get("/newSignIn", (req, res) => {
    res.render('newSignIn')
})
/*
router.post("/", handleSignUpTest, (req, res) => {
    console.log("Logging sign in attempt from /routes/authRoutes.js")
}) */

module.exports = router;