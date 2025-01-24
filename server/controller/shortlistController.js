
// const loadShortListPage = (req, res) => {
//     try {
//         const currectUser = req.session.user_id;
        
//         res.render('shortList');
        
//     } catch (error) {
//         res.render('error', { message: '404 Not Found', error });
//     }
// }
// const User = require('./models/userModel'); // Adjust the path as necessary
const User = require('../models/userModel');

const getShortlistedUsers = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const currentUser = await User.findById(userId);
        // console.log('cccc', userId);
        // Find the user by ID and populate the shortList field
        const user = await User.findById(userId).populate('shortList');
        // console.log('Details: ', user);
        
        // If not Found show ""not Found ""
        if (!user) {
            return { success: false, message: 'User not found!' };
        }
        res.render('shortList', { activePage: 'profile', users: user.shortList, currentUser: currentUser });
    } catch (error) {
        console.error('Error fetching shortlisted users:', error);
        return { success: false, message: 'An error occurred while fetching shortlisted users.' };
    }
};

// Example usage
// getShortlistedUsers('userIdHere')
//     .then(response => {
//         if (response.success) {
//             console.log('Shortlisted Users:', response.data);
//         } else {
//             console.log(response.message);
//         }
//     });



module.exports = {
    // loadShortListPage
    getShortlistedUsers
}