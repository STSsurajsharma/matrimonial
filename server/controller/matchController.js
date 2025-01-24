const User = require('../models/userModel');
const PartnerPreference = require('../models/partnerPreference');

const loadMatchPage = async (req, res) => {
  try {
    if (req.session.user_id) {
      const currentUser = await User.findById(req.session.user_id);
      console.log('currentUser', currentUser);
      if (!currentUser) {
        return res.redirect('/login');
      }

      // Fetch the current user's partner preferences
      const preferences = await PartnerPreference.findOne({ userId: currentUser._id });
      console.log('preference', preferences);
      if (!preferences) {
        console.log('No partner preferences found for the user.');
        return res.render('match', { activePage: 'match', currentUser, users: [] });
      }

      // Build the filter query based on partner preferences
      const filterQuery = {
        gender: preferences.preferredGender,
        age: { $gte: preferences.ageRange.minAge, $lte: preferences.ageRange.maxAge },
        // height: { $gte: preferences.heightRange.minHeight, $lte: preferences.heightRange.maxHeight },
        // annualIncome: { $gte: preferences.incomeRange.minIncome, $lte: preferences.incomeRange.maxIncome },
        // annualIncome: {
        //   $gte: (preferences.incomeRange.minIncome),
        //   $lte: (preferences.incomeRange.maxIncome),
        // },
        maritalStatus: preferences.maritalStatus,
        religion: preferences.religion,
        // motherTongue: preferences.motherTongue,
      };
      console.log('filterQuery', filterQuery);

      // Filter users based on preferences
      const userData = await User.find(filterQuery);
      console.log('dd', userData);

      // Render the match page with filtered user data
      res.render('match', { activePage: 'match', currentUser, users: userData });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error loading match page:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  loadMatchPage,
};
