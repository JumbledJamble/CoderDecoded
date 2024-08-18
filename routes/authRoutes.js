const express = require('express');
const router = express.Router();

router.get("/signin", (req, res) => {
    res.render('signIn')
})

router.get("/signup", (req, res) => {
    res.render('signUp')
})

module.exports = router;