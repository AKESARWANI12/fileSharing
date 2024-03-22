
exports.share = async (req, res) => {
    try {
        const { file: fileId, email: sharedWithEmail } = req.body;

        const userExists = await User.exists({ email: sharedWithEmail });
        if (!userExists) {
            return res.status(404).send("Account Does not Exist");
        }

        const userObj = await User.findOne({ email: sharedWithEmail });
        const pdfFileObj = await PDFFile.findById(fileId);

        // Check if a SharedFile with the given user and pdf_file already exists
        const sharedFileExists = await SharedFile.exists({ user: userObj._id, pdf_file: pdfFileObj._id });
        if (sharedFileExists) {
            return res.status(409).send("SharedFile already exists");
        }
        
        // Check if the user is the owner of the file
        if (pdfFileObj.uploaded_by.toString() === userObj._id.toString()) {
            return res.status(409).send("Selected Email is Owner of this File");
        }

        const sharedFile = new SharedFile({ user: userObj._id, pdf_file: pdfFileObj._id });
        await sharedFile.save();
            
        res.status(200).json(sharedFile);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("An error occurred");
    }
};


