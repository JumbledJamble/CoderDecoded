const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log('logging log route')
    res.render('log')
})


module.exports = router;