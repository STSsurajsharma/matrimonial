const User = require('../models/userModel')


const loadActivity = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        res.render('activity', { currentUser: user, activePage: 'profile_activity' });
    } catch (error) {
        res.render('error', { message: error.message, error: error.message });
    }
}

// loadSendInterest
const loadSendInterest = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const currentUser = await User.findById(userId);

        // Populate the 'userId' field within 'sentRequests'
        const user = await User.findById(userId)
            .populate({
                path: 'sentRequests.userId', // Populate the userId field inside sentRequests
                // select: 'name age profilePicture' // Specify the fields to select from the referenced User model
            });

        const rUser = await User.findById(userId).populate({
            path: 'receivedRequests.userId', // Populate the userId field inside receivedRequests
            // select: 'name age profilePicture' // Specify the fields to select from the referenced User model
        })

        console.log('Details: ', user.sentRequests);
        console.log('Details from receiver end : ', rUser.receivedRequests);

        res.render('activity/sendInterest', {
            currentUser: currentUser,
            activePage: 'profile_activity',
            sentRequests: user.sentRequests,
            receivedRequests: rUser.receivedRequests  // Pass receivedRequests to the view 
        });
    } catch (error) {
        res.render('error', { message: error.message, error: error.message });
    }
}


// loadReceivedInterest

const loadReceivedInterest = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        res.render('activity/receivedInterest', { currentUser: user, activePage: 'profile_activity' });
    } catch (error) {
        res.render('error', { message: error.message, error: error.message });
    }
}

// loadPendingInterest

const loadPendingInterest = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        res.render('activity/pendingInterest', { currentUser: user, activePage: 'profile_activity' });
    } catch (error) {
        res.render('error', { message: error.message, error: error.message });
    }
}

// loadRejectInterest
const loadRejectInterest = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        res.render('activity/rejectInterest', { currentUser: user, activePage: 'profile_activity' });
    } catch (error) {
        res.render('error', { message: error.message, error: error.message });
    }
}

// cancelSendInterest 
const cancelSendInterest = async (req, res) => {

    try {
        // Remove from sender's sentRequests
        const requestId  = req.params.id; // ID of the user whose interest is being canceled
        const userId = req.session.user_id; // Assuming you have user authentication middleware that sets req.user
        console.log(userId, requestId); //
        const user = await User.findByIdAndUpdate(userId, {
            $pull: { sentRequests: { userId: requestId } },
        });
        console.log('xx :', user);

        // Remove from receiver's receivedRequests
        await User.findByIdAndUpdate(requestId, {
            $pull: { receivedRequests: { userId } },
        });

        res.json({ success: true, message: 'Interest canceled successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to cancel interest.' });
    }
}

// 
const acceptInterest = async (req, res) => {
    const requestId = req.params.id; // ID of the sender whose interest is being accepted
    const userId = req.session.user_id; // Assuming `auth.isLogin` middleware sets `req.user`
  
    try {
      // Update the receiver's `receivedRequests` status to 'accepted'
      const cuser = await User.findOneAndUpdate(
        { _id: userId, 'receivedRequests.userId': requestId },
        { $set: { 'receivedRequests.$.status': 'accepted' } }
      );
      console.log( 'xxxxxxx' ,'cuser');
  
      // Update the sender's `sentRequests` status to 'accepted'
      await User.findOneAndUpdate(
        { _id: requestId, 'sentRequests.userId': userId },
        { $set: { 'sentRequests.$.status': 'accepted' } }
      );
  
      res.json({ success: true, message: 'Interest accepted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to accept interest.' });
    }
  };

module.exports = {
    loadActivity,
    loadSendInterest,
    loadReceivedInterest,
    loadPendingInterest,
    loadRejectInterest,
    cancelSendInterest,
    acceptInterest
}