const nodemailer = require("nodemailer");
const mailSender = async (email, title, body,buffer) => {
    //    console.log("bhai tum yaha tak aye ho ki nhi", process.env.MAIL_HOST,email,title,body)
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })  
        let info = await transporter.sendMail({
            from: 'Spotdraft ||Ayush',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
            attachments: [
                {
                    filename: "document.pdf", 
                    content: buffer,
                }
            ]
        })
        return info;
    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = mailSender;
