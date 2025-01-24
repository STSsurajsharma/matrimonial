const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    forWhom: {
        type: String,
        // required: true
    },
    age: {
        type: Number,
        // required: true
    },
    // Personal information
    religion: {
        type: String,
        // required: true
    },
    religionName: {
        type: String,
        //required
    },
    height: {
        type: String,
        // required: true
    },
    dob: {
        type: String,
        // required: true
    },
    disability: {
        type: String,
        // required: true
    },

    // alternativeMno: {
    //     type: Number,
    // },
    maritalStatus: {
        type: String,
        // required: true
    },
    maritalStatusUpdated: { type: Boolean, default: false }, // Tracks if status was updated
    dobUpdated: { type: Boolean, default: false }, // Tracks if status was updated
    // canEdit: {
    //     type: Boolean,
    //     default: true, // Allow editing initially
    //   },
    motherTongue: {
        type: String,
        // required: true
    },
    aboutMe: {
        type: String,
    },

    // Family Details
    familyType: {
        type: String,
    },
    fatherOccupation: {
        type: String,
    },
    motherOccupation: {
        type: String,
    },
    brotherCount: {
        type: Number,
    },
    sisterCount: {
        type: Number,
    },
    familyLivesIn: {
        type: String,
    },
    contactAddress: {
        type: String,
    },
    aboutFamily: {
        type: String,
    },

    // Education Details
    heigherQualification: {
        type: String,
    },
    ugDegree: {
        type: String,
    },
    ugCollege: {
        type: String,
    },
    school: {
        type: String,
    },
    //Profesioinal Details
    employedIn: {
        type: String,
        // required: true
    },
    occupation: {
        type: String,
        // required: true
    },
    annualIncome: {
        type: String,
        // required: true
    },
    countryName: {
        type: String,
        // required: true
    },
    stateName: {
        type: String,
        // required: true
    },
    // Contact Details
    country: {
        type: String,
        // required: true
    },
    state: {
        type: String,
        // required: true
    },
    city: {
        type: String,
        // required: true
    },
    // Emails and Passwords
    email: {
        type: String,
        // required: true,
        // unique: true,
    },
    alternativeEmail: {
        type: String,

    },
    phone: {
        type: Number,
        // required: true,
        // unique: true,
    },
    alternativePhoneNumber: {
        type: Number,
    },
    password: {
        type: String,
        // required: true,
    },
    caste: {
        type: String,
        // required: true
    },
    subCaste: {
        type: String,
        // required: true
    },
    eatinhHabits:{
        type: String,
        // required: true;
    },
    drinkingHabits: {
        type: String,
        // required: true
    },
    smokingHabits: {
        type: String,
        // required: true
    },
    astrologicalDosh: {
        type: String,
        // required: true
    },
    astrologicalSign: {
        type: String,
        // required: true
    },
    gotra: {
        type: String,
        // required: true
    },
    star: {
        type: String,
        // required: true
    },
    timeOfBirth: {
        type: String,
        // required: true
    },
    horoscopedob: {
        type: String,
        // required: true
    },
    homeTown: {
        type: String,
        // required: true
    },
    shortList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you are referring to the same User model
        },
    ],
    isMembership: {
        type: Boolean,
        // default: false
    },
    profileImage: { type: String, default: '/images/default.jpg' },
    Preferences: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PartnerPreference'
    },
    isMnoVerified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    phonePrivacy: {
        type: String,
        enum: ['paidMembersOnly', 'none'],
        default: 'paidMembersOnly'
    },
    photoPrivacy: {
        type: String,
        enum: ['all', 'paidMembersOnly', 'acceptedOnly'],
        default: 'all'
    },
    sentRequests: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' },
          status: { type: String, enum: ['pending', 'rejected', 'accepted'], default: 'pending' },
        },
      ],
      receivedRequests: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          status: { type: String, enum: ['pending', 'rejected', 'accepted'], default: 'pending' },
        },
      ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Accepted friends
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: null },

}, { timestamps: true });


// Pre-save middleware to format `lastSeen`
userSchema.pre('save', function (next) {
    if (!this.isOnline) {
        const date = new Date();
        const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false };
        this.lastSeen = new Intl.DateTimeFormat('en-GB', options).format(date);
    }
    next();
});

const createdSchema = mongoose.model('User', userSchema);

module.exports = createdSchema;