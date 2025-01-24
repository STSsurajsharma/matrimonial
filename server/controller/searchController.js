const { request } = require('express');
const User = require('../models/userModel')
const loadSearchPage = async (req, res) => {
    try {

        // getting the user id from session
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        res.render('search', { activePage: 'search', currentUser: user });
    } catch (error) {
        res.render('error', { message: '404 Not Found', error });
    }
}

// searchController

const searchController = async (req, res) => {
    try {
        const searchCriteria = {};
        const user = req.session.user_id;
        const userData = await User.findById(user);
        console.log(user);
        const oppositeGender = userData.gender === 'Male' ? 'Female' : 'Male';
        console.log(oppositeGender);

        searchCriteria.gender = oppositeGender;

        // searchCriteria.gender = req.body.gender === 'male' ? 'female' : 'male';

        const { minAge, maxAge, minHeight, maxHeight, minIncome, maxIncome } = req.body;

        if (minAge && maxAge) {
            searchCriteria.age = { $gte: minAge, $lte: maxAge };
        }
        // if height is not specified
        if (minHeight && maxHeight) {
            searchCriteria.height = { $gt: minHeight, $lt: maxHeight };
        }
        if (minIncome && maxIncome) {
            searchCriteria.income = { $gte: minIncome, $lte: maxIncome };
        }


        // Pore add korlambda
        if (req.body.religion) {
            searchCriteria.religion = req.body.religion;
        }
        if (req.body.caste) {
            searchCriteria.caste = req.body.caste;
        }
        if (req.body.maritalStatus) {
            searchCriteria.maritalStatus = req.body.maritalStatus;
        }
        if (req.body.motherTongue) {
            searchCriteria.motherTongue = req.body.motherTongue;
        }
        if (req.body.country) {
            searchCriteria.country = req.body.country;
        }
        if (req.body.state) {
            searchCriteria.state = req.body.state;
        }
        if (req.body.city) {
            searchCriteria.city = req.body.city;
        }
        if (req.body.education) {
            searchCriteria.education = req.body.education;
        }
        if (req.body.occupation) {
            searchCriteria.occupation = req.body.occupation;
        }
        if (req.body.astrologicalDosh) {
            searchCriteria.astrologicalDosh = req.body.astrologicalDosh;
        }
        if (req.body.eatinhHabits) {
            searchCriteria.eatinhHabits = req.body.eatinhHabits;
        }



        console.log(searchCriteria);
        const users = await User.find(searchCriteria);
        if (users.length > 0) {
            res.render('searchResults', { users, currentUser: userData });
        }
        else {
            res.render('searchNoResults', { currentUser: userData });

        }

    } catch (error) {
        console.error(error.message);
        res.render('error', { activePage: 'search', message: 'An error occurred while searching', error });
    }
}


// loadNoResultPage




module.exports = {
    loadSearchPage,
    searchController,

}