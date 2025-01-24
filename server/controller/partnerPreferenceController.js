const User = require('../models/userModel')
const loadPartnerPreference = async (req, res) => {
    try {
        const userId = req.session.user_id;
        const user = await User.findById(userId);
        res.render('partnerPreference', { currentUser: user,user: user, activePage: 'partnerPreference'});  // render the partner preferences page
        
    } catch (error) {
        // res.render('error', { message: error.message});
        console.error(error.message);  // log error for debugging purposes
    }

}
module.exports = {
    loadPartnerPreference
}