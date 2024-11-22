const express = require('express')
const router = express.Router()
const findProjectData = require('../controllers/projectControllers/findProjectData')
const findUserById = require("../controllers/userControllers/findUserById")

router.get('/', async (req, res) => {
    let profile = req.user.username
    const usersProjects = await findProjectData(req.user)
    
    res.render('profile', { profile, usersProjects })
})

router.get('/getUsersProjects', async (req, res) => {
    console.log("'/getUsersProjects' was hit")
    const usersProjects = await findProjectData(req.user)
    const user = await findUserById(req.user._id)
    res.json({usersProjects, user})
})

module.exports = router;