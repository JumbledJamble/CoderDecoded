const express = require('express')
const router = express.Router()
const verifyJWT = require("../middlewear/verifyJWT")

router.get('/profile', verifyJWT, (req, res) => {
    router.render('ownProfile')
})

module.exports = router;