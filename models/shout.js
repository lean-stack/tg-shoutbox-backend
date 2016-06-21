
var mongoose = require('mongoose');

var shoutSchema = new mongoose.Schema({
    msg: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shout', shoutSchema);
