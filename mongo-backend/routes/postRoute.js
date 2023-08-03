const express = require('express')
const router = express.Router()
const { createproject, getproject, deleteproject, updateproject } = require('../controllers/projectController')
const multer = require('multer')
const path = require("path")




const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/postImages'), function (error, success) {
            if (error) {
                console.log(error)
            }
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name, function (error, success) {
            if (error) {
                console.log(error)
            }
        })
    }
})

const upload = multer({ storage: storage })

router.post('/create-project', upload.single('attachFile'), createproject)
router.get('/get-project', getproject)
router.get('/delete-project/:id', deleteproject)
router.put('/update-project/:id', upload.single('attachFile'), updateproject)

module.exports = router;

