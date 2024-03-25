const express = require("express");
const router = express.Router();
const Comment = require("../modals/commentModal");
const PDFFile = require("../modals/pdfFileModal");

// Add a new comment
const addComment = router.post("/", async (req, res) => {
  try {
    const { content, filename } = req.body;
    const userId = req.user._id; 
    const pdfFile = await PDFFile.findOne({ file: filename });
    const comment = new Comment({
      content,
      user: userId,
      pdf_file: pdfFile._id,
    });
    const savedComment = await comment.save();
    res.status(201).json({
      message: "Comment added successfully",
      pdf_file_id: pdfFile._id,
      comment: savedComment, // Optionally include the saved comment details
    });
  
  } catch (error) {
    console.error("Add comment error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the comment" });
  }
});

module.exports = { addComment };
