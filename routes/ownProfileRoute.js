const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
    router.render('ownProfile')
})

module.exports = router;