const User = require('../models/userModel');

// sendInterest

const sendInterest = async (req, res) => {
    const { receiverId } = req.body;
    console.log('id from re', receiverId);
  
    try {
      const userId = req.session.user_id;
      // Check if the sender and receiver exist
      const sender = await User.findById(userId);
      const receiver = await User.findById(receiverId);
  
      if (!sender || !receiver) {
        return res.status(404).json({ message: 'User not found!' });
      }
  
      // Check if the interest already exists (check by userId and status)
      const existingRequest = sender.sentRequests.find(req => req.userId.toString() === receiverId);
  
      if (existingRequest) {
        return res.status(400).json({ message: 'Interest already sent!' });
      }
  
      // Add the request to sender's sentRequests and receiver's receivedRequests
      sender.sentRequests.push({ userId: receiverId, status: 'pending' });
      receiver.receivedRequests.push({ userId: userId, status: 'pending' });
  
      await sender.save();
      await receiver.save();
  
      res.status(200).json({ message: 'Interest sent successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error!' });
    }
  };
  

module.exports = {
    sendInterest
}