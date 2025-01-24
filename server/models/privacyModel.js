const mongoose = require('mongoose');

const privacySchema = new mongoose.Schema({
     userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        phonePrivacy: {
            type: String,
            enum: ['all', 'membersOnly', 'acceptedOnly'],
            default: 'all'
        },
        photoPrivacy: {
            type: String,
            enum: ['all', 'membersOnly', 'acceptedOnly'],
            default: 'all'
        },
        acceptedInterests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  timestamp: { type: Date, default: Date.now },
});

const privacy = mongoose.model('privacyOfUser', privacySchema);
module.exports = privacy;