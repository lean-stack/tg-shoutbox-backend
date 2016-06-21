
var express = require('express');
var router = express.Router();

var Shout = require('../models/shout');

/* GET list of shouts */
router.get('/', function(req, res, next) {
    Shout.find({ }, function(err, shouts) {
        res.send(shouts);
    });
});

/* POST new shout */
router.post('', function (req, res) {
    var shout = new Shout(req.body);
    shout.save(function (err,shout) {
        if (err) {
            res.status(406).send(err);
        }
        res.status(201).json(shout);
    })
});

module.exports = router;
