exports.sendReminderTemplate = async (data,date) => {
    return htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Reminder</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <!-- Header Section -->
        <tr>
            <td style="background-color: #0073e6; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Payment Reminder</h1>
            </td>
        </tr>
        <!-- Message Section -->
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; color: #333;">Dear ${data.receiverName},</p>
                <p style="font-size: 16px; color: #333;">
                    This is a gentle reminder from <strong>${data.organization_name}</strong> regarding your pending payment. Please find the details below:
                </p>
                <!-- Payment Details Table -->
                <table width="100%" border="0" cellspacing="0" cellpadding="5" style="border: 1px solid #e5e5e5; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background-color: #f4f4f4;">
                        <th style="border: 1px solid #e5e5e5; text-align: left; padding: 10px;">Title</th>
                        <th style="border: 1px solid #e5e5e5; text-align: left; padding: 10px;">Amount</th>
                        <th style="border: 1px solid #e5e5e5; text-align: left; padding: 10px;">Due Date</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #e5e5e5; padding: 10px;">${data.title}</td>
                        <td style="border: 1px solid #e5e5e5; padding: 10px;">${data.amount}</td>
                        <td style="border: 1px solid #e5e5e5; padding: 10px;">${data.dueDate}</td>
                    </tr>
                </table>
                ${data.note ? `<p style="font-size: 16px; color: #333;">
            <strong>Note: </strong> ${data.note}
        </p>` : `<span></span>`}
                <p style="font-size: 16px; color: #333;">
                    Kindly ensure that the payment is completed by the due date to avoid any inconvenience. If you have already made the payment, please ignore this email.
                </p>

                 ${data.file ? `<div> <h1> PLease find the attachment below </h1> </div>` : `<span></span>`}

        
                <p style="font-size: 14px; color: #666;">
                    If you have any questions or concerns, feel free to contact the sender.
                </p>
            </td>
        </tr>
        <!-- Footer Section -->
        <tr>
            <td style="background-color: #f4f4f4; text-align: center; padding: 10px; font-size: 12px; color: #888;">
                &copy; 2024. All rights reserved.
            </td>
        </tr>
    </table>
   
</body>
</html>
`
}