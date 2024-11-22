const Project = require('../../models/Project')
const User = require('../../models/User')

const logProject = async (logs, projectID, username) => {
    
    const submissionDate = new Date()

    let Year = submissionDate.getFullYear()
    let Month = submissionDate.getMonth()
    let Day = submissionDate.getDate()
    const submissionTimeStamp = `${Month}/${Day}/${Year}`
    console.log(submissionTimeStamp)
    try{
        // update hours in the task, and add tasks if necessary
        const updatedProject = await Project.findOne({_id : projectID})
        if(!updatedProject){
            console.log("No project found.")
            return null;
        }
        
        const updatedUser = await User.findOne({username: username})
        if(!updatedUser){
            console.log("User not found")
            return null
        }

        let updatedTasks = logs.updatedTasks
        // if there are any tasks to update
        if(updatedTasks){
            // then for each one, search for the matching task within the project
            for(let i = 0; i < updatedTasks.length; i++){
                
                for(let j = 0; j < updatedProject.tasks.length; j++){
                    if(updatedProject.tasks[j].id == updatedTasks[i].id){
                        updatedProject.tasks[j].hours += updatedTasks[i].hours

                        // if the task has been marked as complete, mark it as complete in the project as well
                        if(updatedTasks[i].completed == true){
                            updatedProject.tasks[j].active == false
                        }
                    }
                }
            }
        }

        let newTasks = logs.newTasks;
        if(newTasks){
            
            for(let i = 0; i < newTasks.length; i++){
                updatedProject.totalTasks += 1
                newTasks[i].id = updatedProject.totalTasks
                updatedProject.tasks.push(newTasks[i])
            }
        }

        let newTechs = logs.newTechs

        if(newTechs){
            updatedProject.techs += newTechs
        }
        
            
        await updatedProject.save();
        console.log("Project saved successfully. Log added")

        if(logs.logs){
            
            for(let i = 0; i < logs.logs.length; i++){
                updatedUser.logsCreated += 1
                logs.logs[i].timeStamp = submissionTimeStamp
                updatedUser.logs.push(logs.logs[i])
            }
        }
        await updatedUser.save()
        console.log("User's logs have been added")
        
            
    } catch(e){
        console.log("Error updating project.")
        console.log(e);
    }

}


module.exports = logProject;