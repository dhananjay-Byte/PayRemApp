const sendEmail = require('../service/emailService')
const User = require('../models/user');
const reminderTemplate = require('../emailTemplates/sendReminderTemplate')
const multer = require('multer')
const fs = require('fs')
const Reminder = require('../models/reminder')
const History = require('../models/historyReminders')

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
          cb(null, true);
      } else {
          cb(new Error('Only PDF files are allowed!'), false);
      }
  },
});

exports.sendReminder = [
  upload.single('file'),
  async (req, res) => {
      try {
          const { file } = req;
          const { reminderId, receiverEmail, subject, receiverName, amount, dueDate } = req.body
        
          if (!receiverEmail || !subject || !receiverName || !amount || !dueDate) {
              return res.status(400).json({ message: 'Missing required fields in uploadData.' });
          }


          const htmlContent = await reminderTemplate.sendReminderTemplate(req.body);
          const saveHistory = new History({
            userId:req.body.userId,
            title:req.body.title,
            amount:amount,
            dueDate:dueDate,
            receiverEmail:receiverEmail,
            receiverName:receiverName,
            organization_name:req.body.organization_name,
            subject:subject,
            status:req.body.status,
            notes:req.body.note
          })

          await saveHistory.save();

          await sendEmail(receiverEmail, subject, htmlContent, file);

          if (file) {
              fs.unlinkSync(file.path);
          }

          await Reminder.findByIdAndUpdate(reminderId, { $inc: { remindersSent: 1 } });

          res.status(200).json({ message: 'Payment reminder sent successfully!' });
      } catch (error) {
          console.error('Failed to send reminder:', error.message);
          res.status(500).json({ message: 'Failed to send reminder.', error: error.message });
      }
  },
];

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    try {

      const user = await User.findOne({ verificationToken:token });

      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      // res.status(200).json({ message: 'Email verified successfully. You can now log in.'});
      res.redirect(process.env.url_redirect)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };