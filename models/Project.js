const mongoose = require("mongoose")
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    owner: {
        type : Object,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    contributors: {
        type : Array,
        required : true,
    },
    totalTasks : {
        type : Number,
        required : true,
    },
    techs: {
        type : Array,
        required : true,
    },
    tasks: {
        type : Array,
        required : true,
    },
    active: {
        type : Boolean,
        required : true,
    }
})

module.exports = mongoose.model('Projects', projectSchema)