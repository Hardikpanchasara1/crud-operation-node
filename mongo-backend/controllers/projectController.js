const Project = require("../models/projectModel")

exports.createproject = async (req, res) => {
    try {
        const post = new Project({
            project_name: req.body.project_name,
            project_desc: req.body.project_desc,
            language: req.body.language,
            created_by: req.body.created_by,
            priority: req.body.priority,
            start_date: req.body.start_date,
            deadline: req.body.deadline,
            attachFile: req.file.filename,
        })
        const postData = await post.save()
        res.status(200).send({ success: true, msg: 'Post data' , data : postData })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

exports.getproject = async (req ,res) => {
    try {
        const projects = await Project.find({})
        res.status(200).send({ success: true, msg: 'Post data' , data : projects
     })

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

exports.updateproject = async (req ,res) => {
    try {

        if(req.file !== undefined){

            var id = req.params.id;
            var project_name = req.body.project_name
            var project_desc = req.body.project_desc
            var language = req.body.language
            var created_by = req.body.created_by
            var priority = req.body.priority
            var start_date = req.body.start_date
            var deadline = req.body.deadline
            var attachFile = req.file.filename

            await Project.findByIdAndUpdate({_id : id} , { $set : {project_name :project_name ,project_desc :project_desc ,language :language ,created_by :created_by ,priority :priority ,start_date :start_date ,deadline :deadline ,attachFile :attachFile ,}})
            res.status(200).send({ success: true, msg: 'project updated successfully!'})
        }
        else{
            var id = req.params.id 
            var project_name = req.body.project_name
            var project_desc = req.body.project_desc
            var language = req.body.language
            var created_by = req.body.created_by
            var priority = req.body.priority
            var start_date = req.body.start_date
            var deadline = req.body.deadline

            await Project.findByIdAndUpdate({_id : id} , { $set : {project_name :project_name ,project_desc :project_desc ,language :language ,created_by :created_by ,priority :priority ,start_date :start_date ,deadline :deadline
            }})
            res.status(200).send({ success: true, msg: 'project updated successfully!'})
        }
            

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

exports.deleteproject = async (req ,res) => {
    try {
        const id = req.params.id
        await Project.deleteOne({ _id : id })
        res.status(200).send({ success: true, msg: 'project deleted successfully!'})

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

// exports.deleteproject = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const project = await Project.findById(id);

//         if (!project) {
//             return res.status(404).send({ success: false, msg: 'Project not found' });
//         }

//         // Remove the image file from the filesystem
//         const imagePath = path.join(__dirname, '../public/postImages', project.attachFile);
//         fs.unlink(imagePath, (err) => {
//             if (err) {
//                 console.error('Error deleting image:', err);
//             }
//         });

//         // Delete the project from the database
//         await Project.deleteOne({ _id: id });

//         res.status(200).send({ success: true, msg: 'Project deleted successfully!' });
//     } catch (error) {
//         res.status(400).send({ success: false, msg: error.message });
//     }
// };
