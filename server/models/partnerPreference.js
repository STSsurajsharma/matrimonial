const mongoose = require('mongoose');

const partnerPreferenceSchema = new mongoose.Schema({
    preferredGender: {
        type: String,
        required: true
    },
    ageRange: {
        minAge: { type: Number, required: true },
        maxAge: { type: Number, required: true }
    },
    heightRange: {
        minHeight: { type: String, required: true },
        maxHeight: { type: String, required: true }
    },
    maritalStatus: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    motherTongue: {
        type: String,
        required: true
    },
    incomeRange: {
        minIncome: { type: Number },
        maxIncome: { type: Number }
    },
    // education: {
    //     type: String,
    // },
    occupation: {
        type: String,
    },
    
    locationPreference: {
        country: {type: String},
        state: { type: String },
        city: { type: String }
    },
    forWhom: {
        type: String,
    },
    familyType:{type: String},
    
    additionalPreferences: {
        type: String // For any additional user-defined preferences
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const PartnerPreference = mongoose.model('PartnerPreference', partnerPreferenceSchema);
module.exports = PartnerPreference;
