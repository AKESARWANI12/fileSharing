const mongoose = require('mongoose');

const sharedFileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pdf_file: { type: mongoose.Schema.Types.ObjectId, ref: 'PDFFile', required: true },
  shared_at: { type: Date, default: Date.now }
});

const SharedFile= mongoose.model('SharedFile', sharedFileSchema);
module.exports =SharedFile;
