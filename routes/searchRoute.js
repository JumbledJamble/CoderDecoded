const express = require('express');
const router = express.Router();
const User = require('../models/User')
const findProjectData = require('../controllers/projectControllers/findProjectData')

router.get("/:id", (req, res) => {
    const username = req.params.username;
    const data = findProjectData(username)
    // send in user profile
    res.render('/searchProfile', {data})
})


module.exports = router;