const Reminder = require('../models/reminder');
const {scheduleReminder,cancelReminder} = require('../scheduler/scheduler')
const reminderTemplate = require('../emailTemplates/sendReminderTemplate');
const schedule = require('../models/scheduleReminder');
const History =  require('../models/historyReminders');

exports.createReminder = async (req, res) => {
  const reminderData = req.body
  try {
    const reminder = new Reminder(reminderData);
    await reminder.save();
    res.status(200).json({ message: 'Reminder Created Successfully',reminder });
  } catch (error) {
    console.error('Error creating reminder:', error.message);
  }
}

exports.getRemindersForUser = async (req, res) => {
  const { userId } = req.query; // Use req.query for GET requests
  try {
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' }); // Validate input
    }

    const reminders = await Reminder.find({ userId }).sort({ createdAt: -1 });

    if (!reminders || reminders.length === 0) {
      return res.status(404).json({ error: 'No reminders found' });
    }

    res.status(200).json({ success: true, data: reminders }); // Consistent response
  } catch (error) {
    console.error('Error fetching reminders:', error.message);
    res.status(500).json({ error: 'Internal server error' }); // Return server error status
  }
};


exports.deleteReminder = async (req, res) => {
  const { reminderId } = req.body
  try {
    await Reminder.findByIdAndDelete(reminderId);
    res.status(200).json('Reminder Deleted Successfully')
  } catch (error) {
    console.error('Error deleting reminder:', error.message);
  }
};

exports.updateReminder = async (req, res) => {
  const { reminderId, data } = req.body

  try {
   const reminder =  await Reminder.findByIdAndUpdate(
      reminderId,
      data,
      { new: true } // Return the updated document
    );
    res.status(200).json({
      message: 'Reminder Updated Successfully',
      reminder: reminder
  });
  
  } catch (error) {
    console.error('Error updating reminder:', error.message);
  }
};

exports.deleteMultipleReminders = async(req,res)=>{
  try {
    const { reminderIds } = req.body; // Expecting an array of reminder IDs

    if (!reminderIds || !Array.isArray(reminderIds)) {
        return res.status(400).json({ message: 'Invalid input: reminderIds should be an array.' });
    }

    // Use deleteMany to delete reminders matching the provided IDs
    const result = await Reminder.deleteMany({ _id: { $in: reminderIds } });

    res.status(200).json({
        message: `${result.deletedCount} reminders deleted successfully.`,
    });
} catch (error) {
    console.error('Error deleting reminders:', error);
    res.status(500).json({ message: 'Failed to delete reminders.', error });
}
}

exports.scheduleReminders = async(req,res)=>{
  try {
    const {reminderId,receiverEmail,subject,receiverName,userId,organization_name,dueDate} = req.body.mailData;
    const scheduleTime = req.body.scheduleTime;

    // Validate input
    if (!reminderId || !scheduleTime || !receiverEmail || !subject) {
        return res.status(400).json({ message: 'Required fields are missing' });
    }

    const htmlContent = await reminderTemplate.sendReminderTemplate(req.body.mailData);

    const mailDetails = {
      userId:userId,
      title:req.body.mailData.title,
      amount:req.body.mailData.amount,
      dueDate:dueDate,
      receiverEmail:receiverEmail,
      receiverName:receiverName,
      organization_name:organization_name,
      subject:subject,
      status:req.body.status,
      notes:req.body.mailData.notes,
      scheduleTime:scheduleTime
    }

    const reminderDetails = { mailDetails, htmlContent};
    const scheduleDate = new Date(scheduleTime);

    const {isScheduled} = await Reminder.findById({_id:reminderId})

    if(isScheduled) return res.status(409).json({message:'Reminder Already Scheduled'})
    
    // Schedule the reminder
    scheduleReminder(reminderId, scheduleDate, reminderDetails);

    const newSchedule = new schedule({
      userId:userId,
      reminderId:reminderId,
      receiverEmail:receiverEmail,
      receiverName:receiverName,
      subject:subject,
      scheduleTime:scheduleDate,
      organization_name:organization_name
    })

    await newSchedule.save();
    await Reminder.findByIdAndUpdate(reminderId, { isScheduled:true });

    return res.status(200).json({ message: 'Reminder scheduled successfully' });
} catch (error) {
    console.error('Failed to schedule reminder:', error);
    res.status(500).json({ message: 'Failed to schedule reminder' });
}
}

exports.cancelScheduleReminder = async(req,res)=>{
  try {
    const { scheduledId } = req.query;

    const {reminderId} = await schedule.findById({_id:scheduledId})
    cancelReminder(reminderId);

    await schedule.findByIdAndDelete({_id:scheduledId});
    await Reminder.findByIdAndUpdate(reminderId, { isScheduled:false});
    

    res.status(200).json({ message: `Reminder with ID: ${reminderId} canceled successfully` });
} catch (error) {
    console.error('Failed to cancel reminder:', error);
    res.status(500).json({ message: 'Failed to cancel reminder' });
}
}

exports.getScheduledReminder = async (req, res) => {
  try {
    const { userId } = req.query; 

    if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

    const data = await schedule.find({ userId }).sort({ createdAt: -1 });

    if (data.length === 0) return res.status(200).json({ length:0 });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch scheduled reminder:', error);
    res.status(500).json({ message: 'Failed to fetch scheduled reminder' });
  }
};

exports.getSingleReminder = async(req,res)=>{
  try {
    const {reminderId} = req.query

    if(!reminderId) return res.status(400).json({ message: 'Invalid reminder ID' });

    const data = await Reminder.findOne({ _id:reminderId }).sort({ scheduleTime: 1 });

    if (data.length === 0) return res.status(404).json({ message: 'No reminder found' });

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message:'Failed to get reminder'})
  }
}

exports.getRemindersHistory = async(req,res)=>{
  try {
    const { userId } = req.query; 

    if (!userId) return res.status(400).json({ message: 'Invalid user ID' });

    const data = await History.find({ userId }).sort({ createdAt: -1 });

    if (data.length === 0) return res.status(200).json({ length:0 });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch scheduled reminder:', error);
    res.status(500).json({ message: 'Failed to fetch scheduled reminder' });
  }
}

exports.getSummary = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Invalid user ID" });

    // Fetch reminders from the database
    const totalReminders = await Reminder.countDocuments({ userId });
    const pendingReminders = await Reminder.countDocuments({ userId, status: "pending" });
    const paidReminders = await Reminder.countDocuments({ userId, status: "paid" });

    // Calculate upcoming reminders (due in the next 7 days)
    const now = new Date();
    const next7Days = new Date(now.setDate(now.getDate() + 7));
    const upcomingReminders = await Reminder.countDocuments({
      userId,
      dueDate: { $gte: new Date(), $lte: next7Days },
    });

    res.status(200).json({
      totalReminders,
      pendingReminders,
      paidReminders,
      upcomingReminders,
    });
  } catch (error) {
    console.error("Error fetching summary data:", error);
    res.status(500).json({ message: "Failed to fetch summary data" });
  }
};

exports.getRemindersByMonth = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Invalid user ID" });

    const remindersByMonth = await Reminder.aggregate([
      { $match: { userId:userId} },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          remindersSent: { $sum: "$remindersSent" }, // Sum reminders sent
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    res.status(200).json(remindersByMonth);
  } catch (error) {
    console.error("Error fetching reminders by month:", error);
    res.status(500).json({ message: "Failed to fetch reminders by month" });
  }
};