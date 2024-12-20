const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.email,
        pass:process.env.password
    }
})

const sendEmail = async(to,subject,htmlContent,file)=>{
    try {
        const mailContent = {
            from:process.env.email,
            to:to,
            subject:subject,
            html:htmlContent,
            attachments:file ? [
                {
                    filename: file.originalname,
                    path: file.path,
                }
            ] : [], 
        } 

        await transporter.sendMail(mailContent);
    } catch (error) {
        console.log('something wrong happened',error);
    }
}

module.exports = sendEmail