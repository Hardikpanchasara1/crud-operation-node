const express = require('express')
const app = express()
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/postRoute')
const path = require("path")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('./public/postImages', express.static(path.join(__dirname, './public/postImages')));
app.use(cors({
    origin: '*'
}))

mongoose.connect("mongodb+srv://hardiksyndell:usvwaNc0TqFqL9r9@mongolearning.2aeqadj.mongodb.net/nodejs").then((conn)=>{
    console.log("connected with ",conn.connection.host)
}).catch((err)=>{
    console.log("error in connection with datbase",err)
})

app.use("/api/",router)
app.get('/project-image/:filename',(req,res)=>{
const filname = req.params.filename;
const filepath = path.join(__dirname,'./public/postImages',filname)
res.sendFile(filepath);
})


const port = 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})