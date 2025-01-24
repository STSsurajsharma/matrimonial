const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: String,
  senderId: String,
  recipientId: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;