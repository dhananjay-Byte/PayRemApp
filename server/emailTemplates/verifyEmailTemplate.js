exports.verifyEmailTemplate = async (username,verificationLink)=>{
    return htmlcontent = `
           <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <tr>
            <td style="background-color: #4CAF50; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Verify Your Email Address</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333;">Hello, ${username}</p>
                <p style="font-size: 16px; color: #333;">
                    Thank you for signing up in PayRem! Please confirm your email address by clicking the button below:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${verificationLink}" 
                       style="background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; display: inline-block;">
                        Verify Email
                    </a>
                </div>
                <p style="font-size: 14px; color: #666;">
                    If you didn’t create an account, please ignore this email.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>

        `
}