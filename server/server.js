var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var bears = [];

router.route('/bears')
    .post(function (req, res) {
        var bear = {};
        bear.name = req.body.name;
        bears.push(bear);
        res.json({ message: 'Bear crated!' });

    });

router.route('/bears')
    .get(function (req, res) {
        res.send(bears)
    });

router.route('/bears/:bear_id')
    .get(function (req, res) {
        var id = req.params.bear_id;
        res.send(bears[id])
    });

router.route('/bears/:bear_id')
    .put(function (req, res) {
        var id = req.params.bear_id;
        bears[id].name = req.body.name;
        bears[id].id = req.body.id;
        res.send(bears[id]);
    });

app.use('/api', bodyParser.json(), router);
app.listen(8000);