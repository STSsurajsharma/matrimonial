const isLogin = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            next(); // Proceed to the next middleware or route if user is logged in
        } else {
            res.redirect('/login'); // Redirect to login if not logged in
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
}

const isLogout = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            res.redirect('/home'); // Redirect to dashboard if already logged in
        } else {
            next(); // Proceed to the next middleware or route if user is logged out
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
}

module.exports = {
    isLogin,
    isLogout,
};
