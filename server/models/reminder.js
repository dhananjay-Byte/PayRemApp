const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, 
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
  remindersSent: { type: Number, default: 0 },
  isScheduled: {type:Boolean,default:false}
}, { timestamps: true }); 


const Reminder = mongoose.model('Reminder', reminderSchema);
module.exports  = Reminder
