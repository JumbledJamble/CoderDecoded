const express = require('express');
const router = express.Router();
const findOneProject = require('../controllers/projectControllers/findOneProject')


// should be a dynamic link, figuring out the id on the fly via the user's id/username
router.get("/:id", (req, res) => {
    // set to null for now, as it currently doesn't check user's permissions before allowing them to edit
    const projectByID = findOneProject(null, req.params.id)

    // need to replicate to allow for searching project by projectname
    let profile = req.user.username
    res.render('logProject', {profile, projectByID})
})

router.post("/", (req, res) => {
    const { handleLogging } = req.body.logging;
    console.log(`Logging:`)
    console.log(handleLogging)
})


module.exports = router;