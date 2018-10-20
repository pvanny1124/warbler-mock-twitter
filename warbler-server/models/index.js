const mongoose = require('mongoose');
mongoose.set("debug", true); //to see actual mongoose queries in console
mongoose.Promise = Promise; //use es2015 promises to not use callback pattern
const user = process.env.USER;
const password = process.env.PASSWORD;

const url = `mongodb://${user}:${password}@ds119350.mlab.com:19350/midas-prototype`;
mongoose.connect(url, {
    keepAlive: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');