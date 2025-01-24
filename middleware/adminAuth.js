const isLogin = async (req, res, next) => {
    try {
        if (req.session.adminId) {
            next(); // Proceed to the next middleware or route if user is logged in
        } else {
            res.redirect('/login'); // Redirect to login if not logged in
        }
    } catch (error) {
        console.log("Error:", error.message);
    }
}


module.exports = {
    isLogin,
}