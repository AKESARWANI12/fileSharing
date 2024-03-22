const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pdf_file: { type: mongoose.Schema.Types.ObjectId, ref: 'PDFFile', required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports=Comment;