var mongoose = require('mongoose');
var comments = new mongoose.Schema({
    comment :String,
    movieId : Number,
    userId : mongoose.Schema.Types.ObjectId,
    userName : String , 
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('comment', comments);