const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    project_name: {
        type: String ,
        required : true
    },
    project_desc: {
        type: String ,
        required : true
    },
    language: {
        type: String ,
        required : true
    },
    created_by: {
        type: String ,
        required : true
    },
    priority: {
        type: String ,
        required : true
    },
    start_date: {
        type: String ,
        required : true
    },
    deadline: {
        type: String ,
        required : true
    },
    attachFile: {
        type: String ,
        required : true
    }
})

module.exports = mongoose.model("Project" , projectSchema)

