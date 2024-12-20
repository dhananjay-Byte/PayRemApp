const mongoose = require('mongoose');

const scheduleReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  reminderId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type:String,
    required: true, 
  },
  organization_name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required:true
  },
  scheduleTime:{
    type:String,
    required:true
  },
}, { timestamps: true }); 


const ScheduleReminder = mongoose.model('ScheduleReminder', scheduleReminderSchema);
module.exports  = ScheduleReminder
