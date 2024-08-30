const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    let project = "project object"
    let profile = req.user
    res.render("editProject", { project, profile })
})

router.post("/", (req, res) => {
    const { changes } = req.body.changes;
    //console.log("Changes:")
    //console.log(changes)
    //handleDeckEdit(changes);
})

module.exports = router;