const express = require("express");
const router = express.Router();
const Comment = require("../modals/commentModal");
const PDFFile = require("../modals/pdfFileModal");

// Add a new comment
const addComment = router.post("/", async (req, res) => {
  try {
    const { content, filename } = req.body;
    // Assuming you have middleware to authenticate and set the user ID in req.user
    const userId = req.user._id;

    // Retrieve the PDFFile object based on the unique_link
    const pdfFile = await PDFFile.findOne({ file: filename });
    // Create a new Comment object and save it to the database
    const comment = new Comment({
      content,
      user: userId,
      pdf_file: pdfFile._id, // Correct the field name to match the schema
    });
    const savedComment = await comment.save();
    // Send the PDF object ID along with the success message
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
