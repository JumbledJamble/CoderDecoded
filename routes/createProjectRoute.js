const express = require("express")
const router = express.Router()
const cookieParser = require("cookie-parser");
// const createProject = require('')
router.use(cookieParser())
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const createProject = require('../controllers/projectControllers/createProject')


router.get("/", (req, res) => {
    res.render("createProject", {profile : req.user.username})
})

router.post("/", async (req, res) => {
    const { project } = req.body
    let projID = await createProject(project, req.user)
    res.json({projID : projID})
})

module.exports = router;