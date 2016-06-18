var express = require('express');
var router = express.Router();

/* GET list of shouts */
router.get('/', function(req, res, next) {
    res.send('Ok');
});

/* POST new shout */
router.post('', function (req, res) {
    res.status(201).send('Ok');
});

module.exports = router;
