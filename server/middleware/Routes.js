const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController')
const signupController = require('../controller/signupController')
const reminderController = require('../controller/reminderController')
const emailController = require('../controller/emailController')
const excelSheetController = require('../controller/excelSheetController')

const verifyToken = require('./verifyToken');
const rateLimiter = require('../service/apiRateLimiter')

// Login and signup routes
router.post('/login',rateLimiter,loginController.loginUser);
router.post('/register',rateLimiter,signupController.registerUser);

// reminder routes
router.post('/create',verifyToken,reminderController.createReminder);
router.get('/fetch',reminderController.getRemindersForUser);
router.delete('/delete',verifyToken,reminderController.deleteReminder);
router.post('/update',verifyToken,reminderController.updateReminder);
router.post('/delete-multiples',verifyToken,reminderController.deleteMultipleReminders);
router.post('/schedule',verifyToken,reminderController.scheduleReminders);
router.delete('/schedule-reminder/cancel',verifyToken,reminderController.cancelScheduleReminder);
router.get('/fetch/schedule-reminder',verifyToken,reminderController.getScheduledReminder)
router.get('/fetch/single-reminder',verifyToken,reminderController.getSingleReminder);
router.get('/fetch/history-reminders',verifyToken,reminderController.getRemindersHistory);
router.get('/summary',verifyToken,reminderController.getSummary);
router.get('/monthly',verifyToken,reminderController.getRemindersByMonth);

// Email routes
router.post('/sendMail',verifyToken,emailController.sendReminder);
router.get('/verify-email',emailController.verifyEmail);


module.exports = router;