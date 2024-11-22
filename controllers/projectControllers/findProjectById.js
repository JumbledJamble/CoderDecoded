const Project = require('../../models/Project')

export const findProjectById = async (id) => {
    const foundProject = await User.findOne({_id : id})

    if(!foundProject){
        return false;
    }
    return foundProject
}