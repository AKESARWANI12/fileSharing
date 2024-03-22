const express = require("express");
const router = express.Router();
const { addComment } = require("../controllers/CommentControllers");
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../modals/commentModal");
const PDFFile = require("../modals/pdfFileModal");

router.route("/").post(protect, addComment);
router.get("/:unique_link",protect, async (req, res) => {
  try {
    const { unique_link } = req.params;
    // console.log("Fetching comments for unique link:", unique_link);    
    const userId = req.user._id; 
     const comments = await Comment.find({ pdf_file: unique_link }).populate(
      "user"
    );
    return res.json({
      comments: comments,
    });
  } catch (error) {
    console.error("Fetch comments error:", error);
    res.status(500).json({ error: "An error occurred while fetching comments" });
  }
});

module.exports = router;