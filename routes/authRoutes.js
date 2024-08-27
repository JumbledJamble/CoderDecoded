const express = require('express');
const router = express.Router();
const { handleUserSignIn } = require('../controllers/authController.js')

router.get("/", (req, res) => {
    res.render('signIn')
})

router.post("/", handleUserSignIn)
/*
router.get("/signup", (req, res) => {
    res.render('signUp')
})*/

/* TODO ADD SIGN UP POST ROUTE
router.post("signin", handleUserSignUPPPPP, (req, res) => {
    console.log("Logging sign in attempt")
}) */

module.exports = router;