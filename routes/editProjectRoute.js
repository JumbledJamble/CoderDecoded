const express = require("express")
const router = express.Router()
const findProject = require('../controllers/projectControllers/findOneProject')


router.get("/:id", (req, res) => {
    // set to null for now, as it currently doesn't check user's permissions before allowing them to edit
    const projectByID = findProject(null, req.params.id)

    // need to replicate to allow for searching project by projectname
    let profile = req.user.username
    res.render("editProject", { projectByID , profile })
})

router.post("/", (req, res) => {
    const { changes } = req.body.changes;
    //console.log("Changes:")
    //console.log(changes)
    //handleDeckEdit(changes);
})

module.exports = router;