const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('logProject')
})

router.post("/", (req, res) => {
    const { handleLogging } = req.body.logging;
    console.log(`Logging:`)
    console.log(handleLogging)
})


module.exports = router;