const express = require('express');
const router = express.Router();
const { handleUserSignIn } = require('../controllers/authController.js')





router.get("/signin", (req, res) => {
    res.render('signIn')
})

router.get("/signup", (req, res) => {
    res.render('signUp')
})

router.post("signin", handleUserSignIn, (req, res) => {
    console.log("Logging sign in attempt")
})

module.exports = router;