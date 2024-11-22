const Project = require('../../models/Project')
const User = require('../../models/User')

const createProject = async (project, user) => {

    let newDate = new Date()
    let falsemonth = newDate.getMonth()
    let year = newDate.getFullYear()

    let month = falsemonth + 1

    console.log(`Month: ${month}  | Year: ${year}`)

    let curTimeStamp = `${month}-${year}`
    
    const updatedUser = await User.findOne({_id : user._id})
    if(!updatedUser){
        console.log("User not found")
        return null
    }
    let newTasks = []
    if(project.tasks.length > 0){
        for(let i = 0; i < project.tasks.length; i++){
            
            newTasks.push({
                name: project.tasks[i],
                hours : [],
                active : true,
                id: i + 1,
                description: '',
                timeStamp : curTimeStamp
            })
        }
    }
    try{
        const newProject = await Project.create(
            {
                name : project.name,
                owner : {_id: user._id, username : user.username},
                contributors : [
                    {
                        username: user.username,
                        role: "Admin"
                    }
                ],
                techs : project.techs,
                tasks : newTasks,
                active : true,
                totalTasks : project.tasks.length,
                description : project.description,
            }
        )
        if(!newProject){
            console.log("Project creation failed.")
            return null;
        }

        updatedUser.projects.push({name : newProject.name, _id : newProject._id.toString()})
        await updatedUser.save();
        return newProject._id.toString()

    } catch(e){
        console.log("Project creation failed! Reason: ")
        console.log(e)
        throw(e)
    }
    
    
}

module.exports = createProject;