const express = require('express');
const router = express.Router();
const findOneProject = require('../controllers/projectControllers/findOneProject');
const { findProjectById } = require('../controllers/projectControllers/findProjectById.js');
const { saveProjectLogs } = require('../controllers/projectControllers/saveProjectLogs.js')


// should be a dynamic link, figuring out the id on the fly via the user's id/username
router.get("/:id", (req, res) => {
    // set to null for now, as it currently doesn't check user's permissions before allowing them to edit
    const projectByID = findOneProject(null, req.params.id)

    // need to replicate to allow for searching project by projectname
    let profile = req.user.username
    console.log(profile)
    res.render('logProject', {profile, projectByID})
})



router.post("/:id", async (req, res) => {
    console.log("Post route hit.")
    let projID = req.params.id
    console.log(`Id is: ${projID}`)
    let projChanges = req.body.changes

    // const sanitisedData = sanitizeData(projChanges)
    
    const savedProj = await saveProjectLogs(projID, projChanges, req.user._id)
    if(savedProj?.error){
        res.json({error : savedProj.error})
    }else{
        res.json({success: true})
    }
    
})

router.get("/getProject/:id", async (req, res) => {
    const projectId = req.params.id
    const projectData = await findProjectById(projectId)
    let user = req.user.username
    if(!projectData){
        res.json({error: "No project data"})
    }
    res.json({projectData, user})
})

module.exports = router;