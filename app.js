const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const config = require('./config/config');

// Create an HTTP server with the Express app
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app); // Use this server for socket.io
const io = new Server(server); // Initialize socket.io

// Session middleware
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Middleware for parsing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', './layouts/main');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// Models are required
const User = require('./server/models/userModel');
const Message = require('./server/models/chatModel');
// Routers
const userRoutes = require('./server/router/userRouter');
const userEditRoutes = require('./server/router/userEditRouter');
const chatRoutes = require('./server/router/chatRouter');
const matchRoutes = require('./server/router/matchRouter');
const shortlistsRoutes = require('./server/router/shortlistsRoutes');
const searchRoutes = require('./server/router/searchRouter');
const partnerPreferenceRoutes = require('./server/router/partnerPreferenceRouter');
const accountSetting = require('./server/router/accountSetting');
const profileActivity = require('./server/router/profileActivityRouter');
const sendInterestRoutes = require('./server/router/sendInterestRoutes');
const { DefaultDeserializer } = require('v8');
app.use('/', userRoutes);
app.use('/edit', userEditRoutes);
app.use('/chat', chatRoutes);
app.use('/sendInterest', sendInterestRoutes);
app.use('/match', matchRoutes);
app.use('/shortlists', shortlistsRoutes);
app.use('/search', searchRoutes);
app.use('/partner-preference', partnerPreferenceRoutes);
app.use('/account-setting', accountSetting);
app.use('/profile-activity', profileActivity);

function getRoomId(userId1, userId2) {
  return [userId1, userId2].sort().join('_'); // Sorting ensures consistent order
}
// Socket.io handlers
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  

  // Handle video call request
  socket.on('video-call-request', receiverId => {
    // Emit to the receiver that they have an incoming video call
    socket.to(receiverId).emit('incoming-video-call', {
      receiverName: 'Receiver Name', // Fetch receiver's name from the DB
    });
  });

  // Handle accepting the video call
  socket.on('accept-video-call', (offer, receiverId) => {
    socket.to(receiverId).emit('video-call-accepted', offer);
  });

  // Handle signaling messages: offer, answer, and ice candidates
  socket.on('offer', (offer, receiverId) => {
    socket.to(receiverId).emit('offer', offer);
  });

  socket.on('answer', (answer, receiverId) => {
    socket.to(receiverId).emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate, receiverId) => {
    socket.to(receiverId).emit('ice-candidate', candidate);
  });

  // Handle disconnection




  const userId = socket.handshake.query.userId;

  // Mark user as online
  User.findByIdAndUpdate(userId, { isOnline: true }, { new: true })
    .then(user => {
      // console.log(user );
      // Broadcast to other users
      socket.broadcast.emit('userStatus', { userId, isOnline: true });
    });
  // Join a private chat room
  socket.on('joinRoom', ({ userId, recipientId }) => {
    const roomId = getRoomId(userId, recipientId);
    socket.join(roomId);
    console.log(`User ${userId}, rec ${recipientId} joined room: ${roomId}`);
  });

  // Handle private messages
  socket.on('privateMessage', async ({ userId, recipientId, message }) => {
    const roomId = getRoomId(userId, recipientId);
    // console.log(`Message from ${userId} to ${recipientId}: ${message}`);
    try {
      // Save the message to the database
      const newMessage = new Message({
        roomId,
        senderId: userId,
        recipientId,
        message,
      });

      await newMessage.save();

      // Broadcast the message to the room
      io.to(roomId).emit('privateMessage', { senderId: userId, message });
      console.log('Message saved and broadcasted:', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', async () => {
    console.log('A user disconnected:', socket.id);

    const formatLastSeen = (date) => {
      if (!date) return null; // Handle null/undefined case
      const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
      return new Intl.DateTimeFormat('en-GB', options).format(date); // e.g., "26 Dec, 14:35"
    };

    // Example usage in disconnect handler
    const formattedDate = formatLastSeen(new Date()); // Format the date before updating
    User.findByIdAndUpdate(
      userId,
      { isOnline: false, lastSeen: formattedDate },
      { new: true } // Return the updated user document
    )
      .then(user => {
        socket.broadcast.emit('userStatus', {
          userId,
          isOnline: false,
          lastSeen: user.lastSeen // This will now already be formatted
        });
      })
      .catch(error => {
        console.error('Error updating user status:', error);
      });



  });
  // console.log('A user disconnected:', socket.id);
});

// Example API Route
app.get('/chat/private/:recipientId/history', async (req, res) => {
  try {
    const { recipientId } = req.params;
    console.log(recipientId);
    const userId = req.session.user_id; // Replace this with your user session logic
    console.log(userId);

    // Fetch chat history from the database
    const chatHistory = await Message.find({
      $or: [
        { senderId: userId, recipientId: recipientId },
        { senderId: recipientId, recipientId: userId }
      ]
    }).sort({ timestamp: 1 });
    // console.log('chat history ss: ', chatHistory);

    res.json(chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});


// Start the server
server.listen(3020, () => console.log('Server is running on port 3020'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           