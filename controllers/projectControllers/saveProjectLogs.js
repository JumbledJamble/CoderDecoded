const Project = require('../../models/Project')
const User = require('../../models/User')

const saveProjectLogs = async (projectID, changes, userID) => {
    console.log(changes.newTasks)
    const submissionDate = new Date()
    console.log("-----Changes-----")
    try{
        // update hours in the task, and add tasks if necessary
        let updatedProject = await Project.findOne({_id : projectID})
        if(!updatedProject){
            console.log("No project found.")
            return {error: "No project with that uid found."};
        }
        
        let updatedUser = await User.findOne({_id: userID})
        if(!updatedUser){
            console.log("User not found")
            return {error: "No user found with that id."}
        }


        

        let Year = submissionDate.getFullYear()
        let Month = submissionDate.getMonth()
        const submissionTimeStamp = `${Month}-${Year}`

        // if there are any tasks to update
        if(changes.newLogs.length > 0){
            // then for each one, search for the matching task within the project
            for(let i = 0; i < changes.newLogs.length; i++){
                
                for(let j = 0; j < updatedProject.tasks.length; j++){
                    if(updatedProject.tasks[j].id == changes.newLogs[i].id){
                        updatedProject.tasks[j].hours.push(changes.newLogs[i])

                        /* TODO allow for completing the task in the UI
                        if(updatedTasks[i].completed == true){
                            updatedProject.tasks[j].active == false
                        }*/
                       break;
                    }
                }
            }
        }

        if(changes.newTasks.length > 0){
            
            for(let i = 0; i < changes.newTasks.length; i++){
                changes.newTasks[i].id = updatedProject.totalTasks
                changes.newTasks[i].active = true
                updatedProject.tasks.push(changes.newTasks[i])
                updatedProject.totalTasks += 1
                // TODO figure this out. when to increment totalTasks
            }
        

            if(changes.newTaskLogs.length > 0){
                for(let i = 0; i < changes.newTaskLogs.length; i++){
                    //                      back of the arr , back     the log's id spots, and + 1 to account for 0 indexing
                    updatedProject.tasks[updatedProject.tasks.length - (changes.newTaskLogs.length - changes.newTaskLogs[i].id)].hours.push(changes.newTaskLogs[i])// wtf.
                    // TODO update user with these logs as well. also, ensure contributor gets into the proj in above line
                }
            }
        }


        updatedProject.techs = changes.techs

        
        await updatedProject.save();
        console.log("Project saved successfully. Log added")

        if(changes.newLogs.length > 0){
            for(let i = 0; i < changes.newLogs.length; i++){
                delete changes.newLogs[i].contributor
                changes.newLogs[i].projectID = projectID
                changes.newLogs[i].projectName = updatedProject.name
                changes.newLogs[i].id += updatedUser.logsCreated - 1
                changes.newLogs[i].timeStamp = submissionTimeStamp

                updatedUser.logs.push(changes.newLogs[i])
                
            }
            updatedUser.logsCreated += changes.newLogs.length
        }



        if(changes.newTaskLogs.length > 0){
            for(let i = 0; i < changes.newTaskLogs.length; i++){
                delete changes.newTaskLogs[i].contributor
                changes.newTaskLogs[i].projectID = projectID
                changes.newTaskLogs[i].projectName = updatedProject.name
                changes.newTaskLogs[i].id += updatedUser.logsCreated
                changes.newTaskLogs[i].timeStamp = submissionTimeStamp

                updatedUser.logs.push(changes.newTaskLogs[i])
            }
            updatedUser.logsCreated += changes.newTaskLogs.length
        }
        

    
        console.log("User's logs have been added")
        await updatedUser.save()
        //console.log(JSON.stringify(updatedUser.logs))
            
    } catch(e){
        console.log("Error updating project.")
        console.log(e);
        return {error: e}
    }

}


module.exports = { saveProjectLogs };