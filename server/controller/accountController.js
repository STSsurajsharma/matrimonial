const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const loadSettingPage = async (req, res) => {
    try {


        const userId = req.session.user_id;
        console.log(userId);
        const user = await User.findById(userId);
        res.render('setting', { user: user });

    } catch (error) {
        console.log(error.message);
    }
}


// emailUpdate
const emailUpdate = async (req, res) => {
    try {
        const userId = req.session.user_id; // Retrieve user ID from session
        const newEmail = req.body.email; // Retrieve the new email from the request body

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        if (user.email === newEmail) {
            return res.status(400).send({ message: 'The email is already up-to-date.' });
        }

        // Update the user's email
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email: newEmail },
            { new: true }
        );

        res.status(200).send({ message: 'Email updated successfully.', user: updatedUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'An error occurred while updating the email.' });
    }
};

// Update Phone Privacy Controller
const updatePhonePrivacy = async (req, res) => {
    const userId = req.session.user_id;
    console.log('userId', userId);
    const { phonePrivacy } = req.body; // Extract phone-privacy value from the form

    try {
        // Find the user and update their phone privacy
        const user = await User.findByIdAndUpdate(
            userId,
            { phonePrivacy }, // Update the phonePrivacy field
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.render('error', {
                activePage: 'account-settings',
                message: 'User not found',
                error: 'Unable to update phone privacy settings'
            });
        }

        // Redirect to the account settings page with a success message
        res.redirect('/account-setting?success=phonePrivacyUpdated');
    } catch (error) {
        console.error('Error updating phone privacy:', err);
        res.render('error', {
            activePage: 'none',
            message: 'An error occurred while updating phone privacy',
            error: error.message
        });
    }
};

// updatePhotoPrivacy
const updatePhotoPrivacy = async (req, res) => {
    const userId = req.session.user_id;
    console.log('userId', userId);
    const { photoPrivacy } = req.body; // Extract photo-privacy value from the form
    try {
        // console.error('Error updating phone privacy:', err);
        const userId = req.session.user_id; //
        const user = await User.findByIdAndUpdate(
            userId,
            { photoPrivacy }, // Update the photoPrivacy field
            { new: true } // Return the updated document
        );
        if (!user) {
            return res.render('error', {
                activePage: 'account-settings',
                message: 'User not found',
                error: 'Unable to update phone privacy settings'
            });
        }
        res.redirect('/account-setting?success=phonePrivacyUpdated');
    } catch (error) {
        res.render('error', {
            activePage: 'none',
            message: 'An error occurred while updating phone privacy',
            error: error.message
        });
    }
}

// changePassword 
const changePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password is correct
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the password' });
    }
}

module.exports = {
    loadSettingPage,
    emailUpdate,//due
    updatePhonePrivacy,
    updatePhotoPrivacy,
    changePassword

}