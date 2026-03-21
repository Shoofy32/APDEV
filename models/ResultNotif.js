const mongoose = require('mongoose')

const challlengeNotificationResultSchema = new mongoose.Schema({

    wasRejected: Boolean,
    isTie: Boolean,
    winner_username: String,
    loser_username: String,
    winner_roll: Number,
    loser_roll: Number,
    challenger_bet_likes: Number,
    challenged_bet_likes: Number,
    challenged_id: String,
    notification_receiver: String,


});



const ResultNotif = mongoose.model("ResultNotif", challlengeNotificationResultSchema);
module.exports = ResultNotif