const mongoose = require("mongoose")
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    owner: {
        type : String,
        required : true
    },
    contributors: {
        type : Array,
        required : true,
    },
    techs: {
        type : Array,
        required : true,
    },
    tasks: {
        type : Array,
        required : true,
    }
})

module.exports = mongoose.model('Projects', projectSchema)