const User = require('../models/userModel');
const Message = require('../models/chatModel');


const getChatPage = async (req, res) => {
    try {
        // Get the user id from the parameters passed
        const userId = req.params.id;
        const sender = req.session.user_id;
        console.log(sender);
        console.log(userId);
        // Find details of the user by their id

        const receiverId = await User.findById(userId);
        const senderId = await User.findById(sender);
        res.render('chats/chat', { receiver: receiverId, sender: senderId });
    } catch (error) {
        console.error(error.message);
    }
}


// Show the list of the users whose already chats 

// const chatsLoad = async (req, res) => {
//     try {
//         const userId = req.session.user_id;
//         console.log(userId);
//         const user = await User.findById(userId);
//         const chats = await Message.find({ $or: [{ senderId: userId }, { recipientId: userId }]});
//         console.log('chats' ,chats);
//         res.render('chats/chatList', { user: user, chats: chats });

//     } catch (error) {
//         console.log(error.message);
//     }
// }
const chatsLoad = async (req, res) => {
    try {
        const userId = req.session.user_id;
        console.log(userId);

        // Find all messages involving the logged-in user
        const chats = await Message.find({ $or: [{ senderId: userId }, { recipientId: userId }] });

        // Map over chats to fetch recipient details
        const enrichedChats = await Promise.all(
            chats.map(async (chat) => {
                const recipientId = chat.senderId.toString() === userId
                    ? chat.recipientId
                    : chat.senderId;

                const recipient = await User.findById(recipientId);

                return {
                    ...chat.toObject(), // Convert Mongoose document to plain object
                    recipient: {
                        name: recipient.name,
                        profilePic: recipient.profilePic
                    }
                };
            })
        );

        // Render the chat list page
        res.render('chats/chatList', { chats: enrichedChats });
    } catch (error) {
        console.log(error.message);
    }
};



module.exports = {
    getChatPage,
    chatsLoad
}