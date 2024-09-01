const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("createProject", {profile : req.user})
})

router.post("/", (req, res) => {
    const { project } = req.body.project
    console.log("Project Submitted:")
    console.log(project)
    //handleUserPost(project)
    // redirect to the edit page for the project
})

module.exports = router;