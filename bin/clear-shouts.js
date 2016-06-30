
// set debug to see console outputs
process.env.DEBUG = "*";

require('dotenv').config();

const debug    = require('debug');
let console = debug('shoutbox:backend');

// Configure the db
require('../app/models/db');

var Shout = require('../app/models/shout');
Shout.remove({}, function (err) {
    console('Shouts cleared for ' + process.env.NODE_ENV);
})
