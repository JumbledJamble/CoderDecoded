const express = require("express")
const router = express.Router()
const cookieParser = require("cookie-parser");
// const createProject = require('')
router.use(cookieParser())
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", (req, res) => {
    res.render("createProject", {profile : req.user})
})

router.post("/", (req, res) => {
    const { project } = req.body

    console.log("Project Submitted:")
    console.log(project)
    res.json({project})
    //handleUserPost(project)
    // redirect to the edit page for the project
})

module.exports = router;