require('dotenv').config();
const connectToMongo=require('./config/db');
const express = require('express')
const mongoose = require("mongoose");
connectToMongo();

const cors = require('cors')
const userRoutes=require('./routes/userRoutes');
const shareRoutes=require("./routes/shareRoutes")
const commentRoutes1=require("./routes/commentRoutes1")
const User =require("./modals/userModal")
const {protect}=require("./middleware/authMiddleware")
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
const app = express()
app.use(cors())
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("files"));
app.use("/api/user",userRoutes);
app.use('/api/comments', commentRoutes1);
app.use("/api",shareRoutes);

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files'); // Specify the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
require("./modals/pdfFileModal")
const PDFFile =mongoose.model("PDFFile");
const upload = multer({ storage: storage });
 
app.get("/api/pdf-files", async (req, res) => {
    try {
      console.log("Fetching all PDF files...");
      const pdfFiles = await PDFFile.find({}).populate('uploaded_by','name');;
 
      res.json({ status: "ok", data: pdfFiles });
    } catch (error) {
      console.error("An error occurred while fetching PDF files:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

      
app.post("/upload-files",protect, upload.single("file"),async(req,res)=>{
    try {
          const databuffer = await fs.readFile(req.file.path);
        const title=req.body.title;
        const fileName=req.file.filename;
        console.log(title,fileName);
        console.log("finally upload ke backend me ghus gaye");
        if (!fileName || !title) {
            return res.status(400).json({ error: 'Invalid request' });
        }
        const uploaded_by = req.user._id; 
        await PDFFile.create({title:title,file:fileName,uploaded_by:uploaded_by,filecontent:databuffer});
            console.log("chor")
            res.send({status:"ok"})
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send("An error occurred");
    }
});

app.use(notFound);   // agar routing me kisi prakar ka error aata hai..to ham ismiddlewareko call karege manlo fetchlink he galat hai
app.use(errorHandler); // agar req wale line sahe hai to bhi kuch aur he error hai to uske liye

const server=app.listen(port,console.log(`Server started on the  PORT ${port}` .yellow.bold) );
