const mongoose = require('mongoose');

const historyRemindersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true 
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  notes: {
    type: String,
    trim: true, 
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
  },
}, { timestamps: true }); 


const HistoryReminder = mongoose.model('HistoryReminders', historyRemindersSchema);
module.exports  = HistoryReminder
