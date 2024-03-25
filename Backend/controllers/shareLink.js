const { contactUsEmail } = require("../email/pdf");
const mailSender = require("../utils/Emailsender");
const PDFFile=require("../modals/pdfFileModal")
const shareLink = async (req, res, next) => { // Changed function name to match route
    const { email, file } = req.body;
    try {     
        const findFileContent = await PDFFile.findById(file);
        const buffer = Buffer.from(findFileContent.filecontent);
        const emailResponse = await mailSender(
            email,
             "Testing the Email Setup",
              contactUsEmail(email, "Respected","Sir"),buffer);
        console.log("Email sent successfully", emailResponse);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error while sending link to person:", error);
        res.status(500).json({ message: "Error while sending email" });
    }
};

module.exports =shareLink; 
