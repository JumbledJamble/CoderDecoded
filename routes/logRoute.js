const express = require('express');
const router = express.Router();
const verifyJWT = require("../middlewear/verifyJWT")

router.get("/log", verifyJWT, (req, res) => {
    res.render('log')
})


module.exports = router;