const User = require('../../models/User')
const Project = require('../../models/Project')


// should this function take in a user? userful for adding permissions in the future to validate role
// but.. not necessary yet
const findOneProject = async (user, projectID) => {
    
    try{
        const foundProject = await Project.findOne({_id : projectID})

        if(!foundProject){
            console.log("Project not found.")
            return null;
        }
        return foundProject;
    } catch(e){
        console.log("Error finding project by that ID.")
        console.log(e)
    }
}

module.exports = findOneProject;