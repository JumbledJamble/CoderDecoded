const User = require('../../models/User')
const Project = require('../../models/Project')

const findProjectData = async (user) => {
    
    try{
        const foundUser = await User.findOne({username : user.username})

        if(!foundUser){
            console.log("User not found.")
            return null;
        }
        let projects = [];
        for(let project of foundUser.projects){
            console.log(project)
            let thisProject = await Project.findOne({_id : project._id})
            if(thisProject){
                projects.push(thisProject);
            }
        }
        return projects;
    } catch(e){
        console.log("Error finding user or finding projects.")
    }
}

module.exports = findProjectData;