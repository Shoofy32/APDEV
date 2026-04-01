const mongoose = require('mongoose')

const challengeNotificationSchema = new mongoose.Schema({

    challenger_username: String,
    challenger_id: String,
    challenger_roll: Number,
    challenger_betlikes: Number,
    challenged_username: String

});

const ChallengeNotif = mongoose.model("ChallengeNotif", challengeNotificationSchema);
module.exports = ChallengeNotif