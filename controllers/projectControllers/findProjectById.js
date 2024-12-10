const Project = require('../../models/Project')

const findProjectById = async (id) => {
    const foundProject = await Project.findOne({_id : id})

    if(!foundProject){
        return false;
    }
    return foundProject
}

module.exports = { findProjectById }