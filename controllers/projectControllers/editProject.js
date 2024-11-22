const Project = require('../../models/Project')

const saveEditedProject = async (project) => {

    try{
        const updatedProject = await Project.findOne({_id : project.id})
        
        if(!updatedProject){
            console.log("Project not found.")
            return null;
        }
        updatedProject.tasks = project.tasks
        updatedProject.techs = project.techs
        await updatedProject.save();
    } catch(e){
        console.log("Project couldn't be found. Error: ")
        console.log(e)
    }
    
}

module.exports = saveEditedProject;