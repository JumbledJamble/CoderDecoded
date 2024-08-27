const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('ownProfile', { profile : req.profile})
})

module.exports = router;