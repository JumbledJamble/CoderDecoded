const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    profile = req.user
    // db fetch on req.user here to create profile
    res.render('profile', { profile })
})

module.exports = router;