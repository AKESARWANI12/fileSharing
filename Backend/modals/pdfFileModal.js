// models/PDFFile.js
const mongoose = require('mongoose');
const User=require("../modals/userModal");
const pdfFileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    file: { type: String, required: true }, // Assuming file paths are stored
    uploaded_at: { type: Date, default: Date.now },
    uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filecontent:{type:String},
});

 const PDFFile= mongoose.model('PDFFile', pdfFileSchema);
 module.exports=PDFFile;
