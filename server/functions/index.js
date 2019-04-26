const functions = require('firebase-functions');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');

var cors = require('cors');

app.use(cors())

var config = {
    apiKey: "AIzaSyC6zT9cYycz-EU-DNAQcaoO05DlTxmgfZg",
    authDomain: "client-server-e0e66.firebaseapp.com",
    databaseURL: "https://client-server-e0e66.firebaseio.com",
    projectId: "client-server-e0e66",
    storageBucket: "client-server-e0e66.appspot.com",
    messagingSenderId: "800996448549"
  };
  firebase.initializeApp(config);

exports.api = functions.https.onRequest(app)


router.route('/bears')
    .post(function (req, res) { 
        bear_name = req.body.name;
        bear_id = req.body.id;
        firebase.database().ref('bears/' + bear_id).set({
            name: bear_name,
            id: bear_id
        });

        res.json({ message: 'Bear created!' });
    });

router.route('/bears')
    .get(function (req, res) {
        var bear_path = firebase.database().ref('bears/');
        bear_path.on('value', function (snapshot) {
            res.send(snapshot.val())
        });

    });

router.route('/bears/:bear_id')
    .get(function (req, res) {
        var id = req.params.bear_id;
        var bear_once_path = firebase.database().ref('/bears/' + id)
        bear_once_path.once('value', function (snapshot) {
            res.send(snapshot.val())
        });
    });

router.route('/bears/:bear_id')
    .put(function (req, res) {
        var id = req.params.bear_id;
        var bear_once_path = firebase.database().ref('/bears/' + id)
        firebase.database().ref(bear_once_path).update({
            name: req.body.name

        });
        res.json({ message: 'Bear Updated!' });
    });

router.route('/bears/:bear_id')
    .delete(function (req, res) {
        var id = req.params.bear_id;
        var bear_once_path = firebase.database().ref('/bears/' + id)
        firebase.database().ref(bear_once_path).remove()
        res.json({ message: 'Bear deleted!' });

        });


        app.use(bodyParser.json(), router);
        app.listen(8000);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
