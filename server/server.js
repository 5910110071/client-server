var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var bears = [];

router.route('/bears')
    .post(function(req,res){
        var bear = {};
        bear.name = req.body.name;
        bears.push(bear);
        res.json({ message : 'Bear crated!' });

    });

    app.use('/api',bodyParser.json(),router);
    app.listen(8000);