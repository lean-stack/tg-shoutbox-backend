
let env = process.env.NODE_ENV || 'development';
let dbPostfix = env === 'production' ? '' : '-' + env;

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tg-shoutbox' + dbPostfix);

export default mongoose;
