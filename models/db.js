
var env = process.env.NODE_ENV || 'development';
var dbPostfix = env === 'production' ? '' : '-' + env;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tg-shoutbox' + dbPostfix);
