const cron = require('node-cron');
const sendEmail = require('../service/emailService'); // Your email utility

const scheduledJobs = {}; // Object to track active jobs by reminder ID
const schedule = require('../models/scheduleReminder')
const Reminder = require('../models/reminder')
const History =  require('../models/historyReminders');

/**
 * Schedule a reminder
 * @param {String} reminderId - Unique ID for the reminder
 * @param {Date} scheduleTime - Date and time of the reminder
 * @param {Object} reminderDetails - Details for the email
 */
const scheduleReminder = async (reminderId, scheduleTime, reminderDetails) => {
    const cronTime = `${scheduleTime.getSeconds()} ${scheduleTime.getMinutes()} ${scheduleTime.getHours()} ${scheduleTime.getDate()} ${scheduleTime.getMonth() + 1} *`;

    const job = cron.schedule(cronTime, async () => {
        try {

            await sendEmail(
                reminderDetails.mailDetails.receiverEmail,
                reminderDetails.mailDetails.subject,
                reminderDetails.htmlContent,
                reminderDetails.mailDetails.file
            );

            await Reminder.findByIdAndUpdate(reminderId, { $inc: { remindersSent: 1 } },{ isScheduled: false });
            await Reminder.findByIdAndUpdate(reminderId, { isScheduled: false });

            
            const saveHistory = new History(reminderDetails.mailDetails);
            await saveHistory.save();


            // Stop and delete the job after it runs
            job.stop();
            await schedule.findOneAndDelete({ reminderId: reminderId });
            delete scheduledJobs[reminderId];
        } catch (error) {
            console.error(`Failed to send remin der for ID: ${reminderId}`, error);
        }
    });

    // Start the CRON job
    job.start();

    // Store the job in the tracker
    scheduledJobs[reminderId] = job;
};

/**
 * Cancel a scheduled reminder
 * @param {String} reminderId - Unique ID for the reminder
 */
const cancelReminder = (reminderId) => {
    if (scheduledJobs[reminderId]) {
        scheduledJobs[reminderId].stop();
        delete scheduledJobs[reminderId];
    } else {
        console.log(`No active job found for ID: ${reminderId}`);
    }
};

module.exports = { scheduleReminder, cancelReminder };
