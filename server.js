const express=require("express");
const app=express();
const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const PORT=process.env.PORT||5000
const mongoose=require("mongoose")
require('dotenv').config();
const routes=require("./routes/authRoutes")
const cookieParser=require("cookie-parser")
const bodyParser=require('body-parser');
const { handleIndex } = require("./controllers/authcontrollers");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req,res,next)=>{
    res.header('Cache-Control','no-cache,no-store,must-revalidate');
    res.header('Pragma','no-cache');
    res.header('Expires',0);
    next();
})

app.use('/static',express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(express.json()) 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())



AWS.config.update({
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key,
    region: 'ap-south-1'
});

const s3 = new AWS.S3();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploads3=(req, res) => {
    const imageData = req.body.imageData;
    const fileName = req.body.ticketName;
    const imageBuffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ''), 'base64');
 
    // Upload image to S3
    const params = {
        Bucket: 'triptreats',
        Key: `${fileName}`,
        Body: imageBuffer,
        ContentType: 'image/jpeg'
    };
 
    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading image to S3:', err);
            res.status(500).send('Error uploading image to S3');
        } else {
            console.log('Image uploaded to S3:', data);
            res.send('Image uploaded successfully');
        }
    });
}

app.post('/uploadToS3', uploads3);

const DbURL= process.env.URL
const connection=() =>{
    mongoose.connect(DbURL).then(async()=>{
    console.log("Connected to db")
    app.listen(PORT,()=>{
        console.log(`Server started at port : ${PORT}`)
    })
}).catch((err)=>{
    console.error(err);
})
}
 connection()
app.get('/',handleIndex)

app.use(routes)


module.exports={app,connection,uploads3};
