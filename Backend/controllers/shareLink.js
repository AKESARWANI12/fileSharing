const { contactUsEmail } = require("../email/pdf");
const mailSender = require("../utils/Emailsender");
const { v4: uuidv4 } = require('uuid');
const shareLink = async (req, res, next) => { // Changed function name to match route
    const { email, file } = req.body;
    try {     
         const uniqueLink = `pdf/${uuidv4()}/${file}`;
        const emailResponse = await mailSender(email, "Testing the Email Setup", contactUsEmail(email, "ayush","kesarwani", uniqueLink));
        console.log("Email sent successfully", emailResponse);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error while sending link to person:", error);
        res.status(500).json({ message: "Error while sending email" });
    }
};

module.exports =shareLink; 
