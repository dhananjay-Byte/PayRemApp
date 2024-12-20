const Reminder = require('../models/reminder')
const XLSX = require('xlsx')
const fs = require('fs');
const path = require('path');

exports.generateExcelSheet = async(req,res)=>{
    const {id} = req.body
    try {
        const reminderData = await Reminder.find({ userId: id });

        const workbook =  XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(reminderData);

           // Add worksheet to workbook
           XLSX.utils.book_append_sheet(workbook, worksheet, "Reminders");

           // Save the file temporarily
           const filePath = path.join(__dirname, 'reminders.xlsx');
           XLSX.writeFile(workbook, 'reminders.xlsx');
   
           // Send file as a response
           res.download(filePath, 'reminders.xlsx', (err) => {
            if (err) {
                console.error('Error during file download:', err);
                res.status(500).send('Could not download file');
            }
        });
    } catch (error) {
        console.error('Error generating Excel:', error);
        res.status(500).send('Failed to generate Excel file.');
    }
}