const twilio = require('twilio');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const partnerPreference = require('../models/partnerPreference');
// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);
let otpStorage = {};  //Temporary otp storage and verification purpose

// Display the home page for all users
const indexPageLoad = (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log(error.message);
    }

}
// Send The Otp Request
const sendOtp = async (req, res) => {
    const { phone } = req.body;
    console.log(phone);

    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    otpStorage[phone] = { otp, expiresAt: Date.now() + 300000 }; // Expires in 5 minutes

    try {
        await client.messages.create({
            body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
            from: twilioPhoneNumber,
            to: phone
        });

        res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send OTP.' });
    }
};
// verifyOtp
const verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!otpStorage[phone]) {
        return res.status(400).json({ error: 'No OTP found for this phone number.' });
    }

    const storedOtp = otpStorage[phone];
    if (storedOtp.otp === parseInt(otp)) {
        if (Date.now() > storedOtp.expiresAt) {
            return res.status(400).json({ error: 'OTP has expired.' });
        }

        delete otpStorage[phone]; // Remove OTP after successful verification
        res.status(200).json({ message: 'OTP verified successfully!' });
    } else {
        res.status(400).json({ error: 'Invalid OTP.' });
    }
};

// userRegister
const userRegister = async (req, res) => {

    const calculateAge = (dob) => {
        const birthDate = new Date(dob); // Date of birth as a string (e.g., "1995-12-31")
        const currentDate = new Date();  // Current date

        let age = currentDate.getFullYear() - birthDate.getFullYear();  // Calculate age based on years
        const monthDifference = currentDate.getMonth() - birthDate.getMonth(); // Check if birthday has passed this year

        // Adjust age if the birthday hasn't occurred yet in the current year
        if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    try {
        const {
            name, gender, forWhom, religion, caste, eatingHabits, drinkingHabits, smokingHabits, astrologicalDosh, homeTown, timeOfBirth, star, gotra, astrologicalSign, height, dob, disability,
            maritalStatus, motherTongue, aboutMe, familyType, fatherOccupation,
            motherOccupation, brotherCount, sisterCount, familyLivesIn, contactAddress,
            aboutFamily, higherQualification, ugDegree, ugCollege, school,
            employedIn, occupation, annualIncome, country, state, city,
            email, phone, password, confirmPassword, horoscopedob, religionName,
        } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Calculate the user's age based on the dob
        const age = calculateAge(dob);

        // Create the new user object
        const newUser = new User({
            name, gender, forWhom, age,  // Add the calculated age here
            religion, religionName, height, dob, caste, eatingHabits, drinkingHabits, smokingHabits, astrologicalDosh, homeTown,
            timeOfBirth, star, gotra, horoscopedob, astrologicalSign, disability, maritalStatus, motherTongue, aboutMe,
            familyType, fatherOccupation, motherOccupation, brotherCount, sisterCount, familyLivesIn, contactAddress, aboutFamily,
            higherQualification, ugDegree, ugCollege, school, employedIn, occupation, annualIncome, country, state, city, email,
            phone, password: hashedPassword, isMembership: false, isMnoVerified: false, isEmailVerified: false,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // For the partner preference 
        const minAge = gender === 'Male' ? age - 8 : age; // Boys: age - 5, Girls: age
        const maxAge = gender === 'Male' ? age : age + 8; // Boys: age, Girls: age + 5
        const minHeight = (height - 10).toString();
        const maxHeight = (height + 5).toString();

        const partnerPreferenceSaved = new partnerPreference({
            userId: savedUser._id,
            preferredGender: gender === 'Male' ? 'Female' : 'Male',
            ageRange: { minAge, maxAge },
            heightRange: { minHeight, maxHeight },
            maritalStatus,
            religion,
            motherTongue,
            educationLevel: "Not Specified",
            occupation: "Not Specified",
            incomeRange: {
                minIncome: (0).toString() ,
                maxIncome: (10000000).toString(),
            },
            familyStatus: "Not Specified",
        });

        const savedPf = await partnerPreferenceSaved.save();
        console.log(savedPf);

        // const locationPreference = { country: pcountry, state: "", city: "" };






        res.status(201).json({ message: 'User registered successfully.', user: savedUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user.' });
    }

};

// loginLoad
const loginLoad = (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
};

// userLogin
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructuring for cleaner code

        // Find user by email
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.render('login', { error: 'Invalid Email or User Not Found.' });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.render('login', { error: 'Invalid Password. Please try again.' });
        }

        // Calculate the dynamic age based on the stored date of birth
        const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };

        const userAge = calculateAge(userData.dob);

        // Update the user's age in the database (optional)
        await User.findByIdAndUpdate(userData._id, { age: userAge });

        // Set the user ID and age in the session
        req.session.user_id = userData._id;
        req.session.age = userAge;

        console.log(`User ID: ${userData._id}, Age: ${userAge}`); // Logging for debugging

        // Redirect to the profile page or another page as required
        res.redirect('/profile');
    } catch (error) {
        console.error("Error:", error.message);
        res.render('index', { error: 'Something went wrong. Please try again.' });
    }
};

// Login from index
const userLoginFromHome = async (req, res) => {
    try {
        const email = req.body.email; // Changed from req.query to req.body
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {

                req.session.user_id = userData._id;
                res.redirect('/dashboard');

            } else {
                res.render('login', { error: 'passqow' });
            }
        } else {
            res.render('login', { error: 'Invalid Email or User Not Found.' });
        }

    } catch (error) {
        console.log("Error:", error.message);
        res.render('index', { error: 'Something went wrong. Please try again.' });
    }
};

// userHome
const userHome = async (req, res) => {
    try {
        if (req.session.user_id) {
            const userData = await User.find();
            const currentUser = await User.findById(req.session.user_id);
            // console.log('ss', currentUser);
            // console.log("User Data:", userData);
            res.render('dashboard', { users: userData, currentUser: currentUser, activePage: 'home' });
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error.message);
    }
};

// userProfile
const userProfile = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user_id);
        res.render('profile', { activePage: 'profile', user: currentUser, message: `Welcome ${currentUser.name}!` });
    } catch (error) {
        console.log(error.message);
    }
};


// shathiProfileLoad

const shathiProfileLoad = async (req, res) => {
    try {
        // have to view
        const userId = req.params.id;
        const userData = await User.findById(userId);
        // Viewer profile
        const currentUser = req.session.user_id;
        const cUser = await User.findById(currentUser);

        let canViewPhone = false;
        if (userData.phonePrivacy === 'none') {
            canViewPhone = false;
        } else if (userData.phonePrivacy === 'paidMembersOnly' && cUser.isMembership) {
            canViewPhone = true;
        }

        // For photo  acceptedOnly
        let canViewPhoto = false;
        if (userData.photoPrivacy === 'all') {
            canViewPhoto = true;
        } else if (userData.photoPrivacy === 'paidMembersOnly' && cUser.isMembership) {
            canViewPhoto = true;
        } else if (userData.photoPrivacy === 'acceptedOnly') {
            if (userData.friends.includes(cUser._id)) {
                canViewPhoto = true;
            }

        }
        res.render('shathiProfile', { activePage: 'profile', user: userData, canViewPhoto, canViewPhone });
    } catch (error) {
        console.log(error.message);
    }
};

// logout
const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log("Logout Error", err);
                return res.redirect('/dashboard');
            }
            res.redirect('/login');  // Redirect to Login Page after logout
        })
    } catch (error) {
        console.log("Error:", error.message);
    }
}



module.exports = {
    indexPageLoad,
    sendOtp,
    verifyOtp,
    userRegister,
    loginLoad,
    userLogin,
    userLoginFromHome,
    userHome,
    userProfile,
    shathiProfileLoad,
    logout
};