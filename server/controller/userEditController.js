const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// userEditController
// Page load for user edit
const photoupdateLoad = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the route has a dynamic `:id`
        console.log(userId);
        const user = await User.findById(userId);
        res.render('userEdit/photoEdit', { user: user });
    } catch (error) {
        console.log(error.message);
    }
}

// Upload photo
const uploadImage = async (req, res) => {
    try {
        console.log(req.file); // Log the uploaded file

        // find id from the session and update the image field 
        const userId = req.session.user_id;
        const user = await User.findByIdAndUpdate(userId, { profileImage: `/uploads/${req.file.filename}` }, { new: true });
        res.redirect('/profile');
        console.log(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Failed to upload image');
    }
};

const shortlist = async (req, res) => {
    try {
        const { userId, shortlistUserId } = req.body; // Get current user and target user IDs
        console.log(userId, shortlistUserId);
        console.log('receiver id is : ->', shortlistUserId);
        console.log('user is', userId);

        // Trim any spaces from the shortlistUserId to ensure it is a valid ObjectId
        const trimmedShortlistUserId = shortlistUserId.trim();

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isShortlisted = user.shortList.includes(trimmedShortlistUserId);

        if (isShortlisted) {
            // Remove from shortlist
            user.shortList = user.shortList.filter((id) => id.toString() !== trimmedShortlistUserId);
            await user.save();
            return res.status(200).json({ message: 'User removed from shortlist' });
        } else {
            // Add to shortlist
            user.shortList.push(trimmedShortlistUserId);
            await user.save();
            return res.status(200).json({ message: 'User added to shortlist' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// loadBasicEdit

const loadBasicEdit = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/basicEdit', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// Save the basic details of the user
const basicDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);

        const { dob } = req.body; // Get the updated date of birth
        console.log('Request body data:', req.body); // To see the incoming data

        // Fetch the user from the database
        const user = await User.findById(userId);

        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        // If DOB is being updated, calculate the age
        if (dob) {
            const calculateAge = (dob) => {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--; // Adjust if the birthday hasn't occurred yet this year
                }
                return age;
            };

            // Calculate the age dynamically
            const age = calculateAge(dob);

            // Add the calculated age and updated DOB flag to the request body
            req.body.age = age;
            req.body.dobUpdated = true; // Set the flag to indicate DOB has been updated
            console.log('Calculated Age:', age);
        }

        // Update the user with the new details
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        console.log('Updated user:', updatedUser);
        res.redirect('/profile'); // Redirect to profile page after update
    } catch (error) {
        console.log(error);
        res.render('error', { message: 'An error occurred', error });
    }
};


// Contact Details Load page
const loadContactDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/contactDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}
// Save to the contactDetails
const contactDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile'); // Redirect to profile page after update

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });

    }
}

// loading loadPersonalDetails
const loadPersonalDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/personalDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}
// save and update personal
const personalDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);

        // Fetch the user by ID to check the current status
        const user = await User.findById(userId);
        console.log('User data:', user);

        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        // Update the user details, including marital status
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        console.log('Updated user:', updatedUser);

        // If marital status is being updated, set `maritalStatusUpdated` to true
        if (req.body.maritalStatus && user.maritalStatus !== req.body.maritalStatus) {
            updatedUser.maritalStatusUpdated = true;
            await updatedUser.save();
        }

        // Redirect to the profile page
        res.redirect('/profile');

    } catch (error) {
        console.error('Error occurred:', error);
        res.render('error', { message: 'An error occurred', error });
    }
};


// loadReligionDetails 
const loadReligionDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/religionDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// religionDetails
const religionDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile');

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });

    }
}

// familyDetails
const loadfamilyDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/familyDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// familyDetails
const familyDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile');

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });
    }
}

// loadEducationDetails
const loadEducationDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/educationDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// educationDetails
const educationDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile');

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });
    }
}

// loadHoroscopeDetails
const loadHoroscopeDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/horoscopeDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// horoscopeDetails
const horoscopeDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile');

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });
    }
}

// loadLifeStyleDetails
const loadLifeStyleDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/lifeStyleDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// lifeStyleDetails

const lifeStyleDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile');

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });
    }
}

// loadProfessionalDetails

const loadProfessionalDetails = async (req, res) => {
    try {
        const userId = req.session.user_id; // Assuming the route has a dynamic `:id`
        const data = await User.findById(userId);
        console.log(data);
        res.render('userEdit/professionalDetails', { user: data, activePage: 'profile' });
    } catch (error) {
        console.error(error.message);
    }
}

// professionalDetails

const professionalDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed in the URL
        console.log('User ID:', userId);
        const dd = await User.findById(userId);
        console.log('User data:', dd);
        console.log('Request body data:', req.body); // To see the incoming data
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // If the user wasn't found, send a 404 error
        if (!user) {
            return res.status(404).render('error', { message: 'User not found', error: 'User not found' });
        }
        console.log('Updated user:', user);
        res.redirect('/profile');

    } catch (error) {
        res.render('error', { message: 'An error occurred', error });
    }
}


module.exports = {
    photoupdateLoad,
    uploadImage,
    shortlist,
    // basicEdit
    loadBasicEdit,
    basicDetails,
    loadContactDetails,
    contactDetails,
    loadPersonalDetails,
    personalDetails,
    loadReligionDetails,
    religionDetails,
    loadfamilyDetails,
    familyDetails,
    loadEducationDetails,
    educationDetails,
    loadHoroscopeDetails,
    horoscopeDetails,
    loadLifeStyleDetails,
    lifeStyleDetails,
    loadProfessionalDetails,
    professionalDetails,

}